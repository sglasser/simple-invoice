import { invoices, recipients } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { isInvoiceDirty } from './stores.js';
import { createInvoice, getInvoices, updateInvoice, getMaxInvoiceNumber } from './api/invoice-api.js';
import { createUser, updateUser, getUploadUrl, uploadFile } from './api/user-api.js';
import { getRecipients, createRecipient } from './api/recipient-api.js';
import { toast, stickyToast } from './components/Toast.svelte';
import { uuid } from 'uuidv4';

class AppFacade {
  constructor () {
    this.TOAST_DISPLAY_LENGTH = 4000;
  }

  async getInvoices () {
    try {
      loading.set(true);
      const result = await getInvoices(get(user).userId);
      invoices.set(result);
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured retrieving invoices. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async getMaxInvoiceNumber () {
    try {
      loading.set(true);
      const result = await getMaxInvoiceNumber(get(user).userId);
      return parseInt(result) + 1;
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while retrieving invoice data. Please try again later');
    } finally {
      loading.set(false);
    }
  }

  async getRecipients () {
    try {
      loading.set(true);
      const result = await getRecipients(get(user).userId);
      recipients.set(result);
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while retrieving invoice recipients. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async createRecipient (recipient) {
    try {
      recipient.recipientId = uuid();
      loading.set(true);
      const result = await createRecipient(recipient, get(user).userId);
      recipients.update(values => [...values, recipient]);
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Success', 'Recipient was successfully saved.');
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while saving recipient. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async upsertInvoice (invoice) {
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
        invoices.update(values => [...values, invoice]);
      }
      isInvoiceDirty.set(false);
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Success', 'Invoice was successfully saved');
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while saving invoice. Invoice was not saved.');
    } finally {
      loading.set(false);
    } 
  }

  async upsertInvoicer (invoicer) {
    console.log(invoicer)
    try {
      loading.set(true);
      if (invoicer.new) {
        await createUser(invoicer, invoicer.userId);
      } else {
        await updateUser(invoicer, get(user).userId);
      }
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Success', 'Your company info was successfully saved.')
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while saving your company info. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async uploadLogo (file) {
    try {
      console.log('upload', file);
      loading.set(true);
      const upload = await getUploadUrl(get(user).userId);
      console.log('upload url', upload.uploadUrl);
      const result = await uploadFile(upload.uploadUrl, file);
      console.log(result);
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while uploading your logo. Please try again later.');
    } finally {
      loading.set(false);
    }
  }
  
}

const instance = new AppFacade();
export default instance;