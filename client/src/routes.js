import Home from './routes/Home.svelte';
import Invoice from './routes/Invoice.svelte';

const routes = {
  '/': Home,
  '/invoice/:invoiceId': Invoice,
  '/invoice': Invoice,
  '*': Home
};

export default routes;