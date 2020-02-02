import PDFDocument from './pdfkit.standalone.js';
import blobStream from './blob-stream.js';
import FileSaver from 'file-saver';
import { user } from '../stores.js';
import { get } from 'svelte/store';
import { total } from './util.js';
import { formatCurrency } from './util.js';

export const createPdf = async (invoice) => {
  let doc = new PDFDocument({margin: 50});
  await generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc, invoice);

  const stream = doc.pipe(blobStream());
  doc.end();
  stream.on('finish', function () {
    FileSaver.saveAs(stream.toBlob('application/pdf'), 'invoice.pdf');
  });
}

const generateCustomerInformation = (doc, invoice) => {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  generateHeader(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text(`Invoice Number:`, 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoiceNumber, 150, customerInformationTop)
    .font("Helvetica")
    .text(`Invoice Date:`, 50, customerInformationTop + 15)
    .text(invoice.created, 150, customerInformationTop + 15)
    .text(`Balance Due:`, 50, customerInformationTop + 30)
    .text(formatCurrency(total(invoice.lineItems)), 150, customerInformationTop + 30)

    .font('Helvetica-Bold')
    .text(invoice.recipient.company, 325, customerInformationTop)
    .font('Helvetica')
    .text(invoice.recipient.address, 325, customerInformationTop + 15)
    .text(`${invoice.recipient.city}, ${invoice.recipient.stateprov} ${invoice.recipient.postal}`, 325, customerInformationTop + 30)
    .moveDown();

  generateHr(doc, 252)
}

const generateHeader = async (doc) => {
  const invoicer = get(user);

  if (invoicer.logoUrl) {
    try {
      const dataUri = await getDataUri(invoicer.logoUrl + '?time=' + new Date());
      doc.image(dataUri, 50, 45, { width: 50 });
    } catch (err) {
      // still create the invoice 
      console.log(err);
    }
  }
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text(invoicer.company, 110, 57)
    .fontSize(10)
    .text(invoicer.company, 200, 50, {align: "right"})
    .text(invoicer.address, 200, 65, { align: "right" })
    .text(`${invoicer.city}, ${invoicer.stateprov} ${invoicer.postal}`, 200, 80, { align: "right" })
    .moveDown();
}

const generateInvoiceTable = (doc, invoice) => {
  let i;
  const invoiceTableTop = 330;

  doc.font('Helvetica-Bold');
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Unit Price',
    'Quantity',
    'Line Total'
  )

  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.lineItems.length; i++) {
    const item = invoice.lineItems[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.desc,
      item.price,
      item.qty,
      formatCurrency(item.total)
    );
    generateHr(doc, position + 20);
  }

const totalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    totalPosition,
    "",
    "",
    "Total",
    formatCurrency(total(invoice.lineItems)),
  )
}

const generateTableRow = (doc, y, desc, price, qty, total) => {
  doc
    .fontSize(10)
    .text(desc, 50, y)
    .text("", 150, y)
    .text(price, 280, y, {width: 90, align: "right"})
    .text(qty, 370, y, { width: 90, align: "right" })
    .text(total, 0, y, {align: "right" })
    // .text(c5, 0, y, { align: "right" });
}

const generateFooter = (doc, invoice) => {
  doc
    .fontSize(10)
    .text(
      `Payment is due ${invoice.due}. Thank you for your business.`,
      50,
      700,
      { align: "center", width: 500 }
  );
}

const generateHr = (doc, y) => {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

const getDataUri = (url) => {

  return new Promise ((resolve, reject) => {
    var image = new Image();

    image.crossOrigin = 'Anonymous'
    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
      canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size
  
      canvas.getContext('2d').drawImage(this, 0, 0);
  
      // // Get raw image data
      // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
  
      // ... or get as Data URI
      resolve(canvas.toDataURL('image/png'));
    };
  
    image.src = url;

  });


}