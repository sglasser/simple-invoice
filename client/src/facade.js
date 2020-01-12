import { invoices } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { createInvoice, getInvoices } from './api/invoice-api.js';
import { createUser } from './api/user-api.js';
import { push } from 'svelte-spa-router';
import Auth from './auth/auth.js';

class AppFacade {

  constructor () {
    invoices.subscribe(value => {
      console.log('invoices', value);
    });
    this.userId = get(user).userId;
  }

  async loadInvoices () {
    try {
      loading.set(true);
      const result = await getInvoices(this.userId);
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
      const result = await createInvoice(this.userId, invoice);
      // check result if valid
      invoices.update(values => [...values, result]);
      push('/')
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }

  async createUser (user) {
    try {
      loading.set(true);
      const result = await createUser(user, this.userId);
      console.log(result);
      
    } catch (err) {
      console.log(err)
    } finally {
      loading.set(false);
    }
  }
}

const instance = new AppFacade();
export default instance;