import { invoices } from './stores.js';
import { loading } from './stores.js';
import { createInvoice, getInvoices } from './api/invoice-api.js';
import { push } from 'svelte-spa-router';
import Auth from './auth/auth.js';

class AppFacade {

  constructor () {
    invoices.subscribe(value => {
      console.log('invoices', value);
    })

  }

  async loadInvoices () {
    try {
      loading.set(true);
      const result = await getInvoices(Auth.getIdToken());
      invoices.set(result);
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }

  }
  
  async createInvoice (invoice) {
    try {
      loading.set(true);
      const result = await createInvoice(Auth.getIdToken(), invoice);
      // check result if valid
      invoices.update(values => [...values, result]);
      push('/')
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }
}

const instance = new AppFacade();
export default instance;