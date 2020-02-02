import Invoices from './routes/Invoices.svelte';
import Invoice from './routes/Invoice.svelte';

const routes = {
  '/': Invoices,
  '/invoice/:invoiceId': Invoice,
  '/invoice': Invoice,
  '*': Invoices
};

export default routes;