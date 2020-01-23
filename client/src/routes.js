import Home from './routes/Home.svelte';
import Config from './routes/Config.svelte';
import Invoice from './routes/Invoice.svelte';
import PDFInvoice from './routes/PDFInvoice.svelte';

const routes = {
  '/': Home,
  '/config': Config,
  '/invoice/:invoiceId': Invoice,
  '/invoice': Invoice,
  '/pdf/:invoiceId': PDFInvoice,
  '*': Home
};

export default routes;