<script>
  import { onMount } from 'svelte';
  import PDFDocument from '../pdfkit.standalone.js';
  import blobStream from '../blob-stream.js';
  import { stickyToast } from '../components/Toast.svelte'; 
  import FileSaver from 'file-saver';
  import { getInvoiceFromStore } from '../util.js';
  import { user } from '../stores.js';
  import { get } from 'svelte/store';
  import { total } from '../util.js';

  // for route params
  export let params = {};

  let selectedInvoice;
  const invoicer = get(user);

  onMount(() => {
    selectedInvoice = getInvoiceFromStore(params.invoiceId);
    selectedInvoice ? createPdf(selectedInvoice) : stickyToast('error', 'Error', 'An error occured creating pdf for invoice');
  });

  const createPdf = (invoice) => {
    let doc = new PDFDocument({margin: 50});
    generateHeader(doc);
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
      .text(`Invoice Number: ${invoice.invoiceNumber}`, 50, 200)
      .text(`Invoice Date: ${invoice.created}`, 50, 215)
      .text(`Balance Due: ${total(invoice.lineItems)}`, 50, 130)

      .text(invoice.recipient.company, 300, 200)
      .text(invoice.recipient.address, 300, 215)
      .text(`${invoice.recipient.city}, ${invoice.recipient.stateprov} ${invoice.recipient.postal}`, 300, 130)
      .moveDown();
  }

  const generateHeader = (doc) => {
    doc
      //.image("logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text(invoicer.company, 110, 57)
      .fontSize(10)
      .text(invoicer.address, 200, 65, { align: "right" })
      .text(`${invoicer.city}, ${invoicer.stateprov} ${invoicer.postal}`, 200, 80, { align: "right" })
      .moveDown();
  }

  const generateInvoiceTable = (doc, invoice) => {
    let i,
      invoiceTableTop = 330;

    for (i = 0; i < invoice.lineItems.length; i++) {
      const item = invoice.lineItems[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        doc,
        position,
        item.desc,
        item.price,
        item.qty,
        item.total
      );
    }
  }

  function generateTableRow(doc, y, desc, price, qty, total) {
    doc
      .fontSize(10)
      .text(desc, 50, y)
      .text(price, 150, y)
      .text(qty, 280, y, { width: 90, align: "right" })
      .text(total, 370, y, { width: 90, align: "right" })
      // .text(c5, 0, y, { align: "right" });
  }

  const generateFooter = (doc, invoice) => {
    doc
      .fontSize(10)
      .text(
        `Payment is due ${invoice.due}. Thank you for your business.`,
        50,
        780,
        { align: "center", width: 500 }
    );
  }

  // http://pdfkit.org/
  // https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
</script>