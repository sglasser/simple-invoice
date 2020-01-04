import Home from './routes/Home.svelte';
import Config from './routes/Config.svelte';
import Invoice from './routes/Invoice.svelte';

const routes = {
  '/': Home,
  '/config': Config,
  '/invoice/:invoiceId': Invoice,
  '/invoice': Invoice,
  '*': Home
};

export default routes;