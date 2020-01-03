import Home from './routes/Home.svelte';
import Config from './routes/Config.svelte';
import Invoice from './routes/Invoice.svelte'
import { wrap } from 'svelte-spa-router';


const routes = {
  '/': wrap(
    Home,
    (detail) => {
      console.log(detail.location);
      console.log('home route guard');
      return true;
    }
  ),
  '/config': Config,
  '/invoice/:invoiceId': wrap(
    Invoice,
    (detail) => {
      console.log(detail.querystring);
    }
  ),
  '/invoice': Invoice,
  '*': Home
};

export default routes;