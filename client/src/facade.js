import { invoices } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { createInvoice, getInvoices } from './api/invoice-api.js';
import { createUser, updateUser } from './api/user-api.js';
import { push } from 'svelte-spa-router';

class AppFacade {
  constructor () {
  }

  async getInvoices () {
    try {
      loading.set(true);
      const result = await getInvoices(get(user).userId);
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
      const result = await createInvoice(invoice, get(user).userId);
      // check result if valid
      invoices.update(values => [...values, result]);
      push('/')
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }

  async createUser (newUser) {
    try {
      loading.set(true);
      const result = await createUser(newUser, get(user).userId);
      console.log(result); 
    } catch (err) {
      console.log(err)
    } finally {
      loading.set(false);
    }
  }

  async updateUser (updatedUser) {
    try {
      loading.set(true);
      const result = await updateUser(updatedUser, get(user).userId);
      console.log(result);
      user.set(updatedUser);
      return true;
      // TODO show success toast
    } catch(err) {
      console.log(err);
      // TODO show error toast
      return false;
    } finally {
      loading.set(false);
    }
  }
}

const instance = new AppFacade();
export default instance;