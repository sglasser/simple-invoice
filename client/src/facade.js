import { invoices, recipients } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { isInvoiceDirty } from './stores.js';
import { createInvoice, getInvoices } from './api/invoice-api.js';
import { createUser, updateUser } from './api/user-api.js';
import { getRecipients, createRecipient } from './api/recipient-api.js';
import { push } from 'svelte-spa-router';
import { uuid } from 'uuidv4';

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

  async getRecipients () {
    try {
      loading.set(true);
      const result = await getRecipients(get(user).userId);
      console.log('recipients', result);
      recipients.set(result);
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }

  async createRecipient (recipient) {
    try {
      recipient.userId = get(user).userId;
      recipient.recipientId = uuid();
      loading.set(true);
      const result = await createRecipient(recipient, get(user).userId);
      recipients.update(values => [...values, recipient]);
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }



  upsertInvoice (invoice) {
    // invoice.invoiceId ? this.updateInvoice(invoice) : this.createInvoice(invoice);
  }

  
  async createInvoice (invoice) {
    try {
      loading.set(true);
      const result = await createInvoice(invoice, get(user).userId);
      // check result if valid
      invoices.update(values => [...values, invoice]);
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

  upsertLineItem (lineItem, invoice) {
    console.log(invoice);
    if (!lineItem.lineItemId) {
      lineItem.lineItemId = uuid();
      invoice.lineItems.push(lineItem);
    }
    isInvoiceDirty.set(true);
  }
}

const instance = new AppFacade();
export default instance;