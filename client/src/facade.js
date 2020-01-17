import { invoices, recipients } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { isInvoiceDirty } from './stores.js';
import { createInvoice, getInvoices, updateInvoice } from './api/invoice-api.js';
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

  async upsertInvoice (invoice) {
    console.log(invoice)
    try {
      loading.set(true);
      const userId = get(user).userId;
      if (invoice.invoiceId) {
        await updateInvoice(invoice, userId);
      } else {
        invoice.invoiceId = uuid();
        await createInvoice(invoice, userId);
        // TODO should this invoice actually be pushed into store?
        // maybe only if it meets current search criteria?
        invoices.set([...invoices.get(), invoice]);
      }
      isInvoiceDirty.set(false);
      // TOD show toast
    } catch (err) {
      console.log(err);
      // TODO show toast
    } finally {
      loading.set(false);
    } 
  }

  async upsertInvoicer (invoicer) {
    try {
      loading.set(true);
      if (invoicer.userId) {
        await updateUser(invoicer, get(user).userId);
      } else {
        await createUser(invoicer, invoicer.userId);
      }
    } catch (err) {
      console.log(err);
      // TODO show toast
    } finally {
      loading.set(false);
    }
  }
}

const instance = new AppFacade();
export default instance;