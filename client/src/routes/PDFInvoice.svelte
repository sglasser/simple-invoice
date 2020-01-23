<script>
  import { onMount } from 'svelte';
  import PDFDocument from '../pdfkit.standalone.js';
  import blobStream from '../blob-stream.js';
  import { stickyToast } from '../components/Toast.svelte'; 
  import FileSaver from 'file-saver';
  import { getInvoiceFromStore } from '../util.js';

  // for route params
  export let params = {};

  let selectedInvoice;

  onMount(() => {
    selectedInvoice = getInvoiceFromStore(params.invoiceId);
    selectedInvoice ? createPdf(selectedInvoice) : stickyToast('error', 'Error', 'An error occured creating pdf for invoice');
  });

  const createPdf = (selectedInvoice) => {
    let doc = new PDFDocument({margin: 50});
    doc
      .fillColor("#444444")
      .fontSize(20)
      .text("ACME Inc.", 110, 57)
      .fontSize(10)
      .text("123 Main Street", 200, 65, { align: "right" })
      .text("New York, NY, 10025", 200, 80, { align: "right" })
      .moveDown();

    const stream = doc.pipe(blobStream());

    doc.end();
    stream.on('finish', function () {
      FileSaver.saveAs(stream.toBlob('application/pdf'), 'invoice.pdf');
    });

    console.log('created pdf');
  }

  // http://pdfkit.org/
  // https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
</script>