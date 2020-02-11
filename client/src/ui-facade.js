import { 
  invoices,
  recipients 
} from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { isInvoiceDirty } from './stores.js';
import { 
  createInvoice,
  getInvoices,
  updateInvoice,
  getMaxInvoiceNumber 
} from './api/invoice-api.js';
import { 
  updateUser,
  getUploadUrl,
  uploadFile 
} from './api/user-api.js';
import { 
  getRecipients,
  createRecipient 
} from './api/recipient-api.js';
import {
  toast,
  stickyToast,
  clearToasts 
} from './components/Toast.svelte';
import { uuid } from 'uuidv4';

class AppFacade {
  constructor () {
    this.TOAST_DISPLAY_LENGTH = 4000;
    this.testInvoices = [
      {id: 1},
      {id: 2}
    ]
  }

  async getInvoices () {
    try {
      clearToasts();
      loading.set(true);
      const result = await getInvoices(get(user).authToken);
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
      clearToasts();
      loading.set(true);
      const result = await getMaxInvoiceNumber(get(user).authToken);
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
      clearToasts();
      loading.set(true);
      const result = await getRecipients(get(user).authToken);
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
      clearToasts();
      recipient.recipientId = uuid();
      let recipientClone = {
        ...recipient,
        userId: get(user).userId
      };
      loading.set(true);
      const result = await createRecipient(recipientClone, get(user).authToken);
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
      clearToasts();
      if (!this.isInvoiceValid(invoice)) {
        stickyToast('danger', 'Error', 'Invoice must have a recipient, one line item, created and due date.');
        return;
      }
      loading.set(true);
      if (invoice.invoiceId) {
        await updateInvoice(invoice, get(user).authToken);
      } else {
        invoice.invoiceId = uuid();
        invoice.userId = get(user).userId;
        await createInvoice(invoice, get(user).authToken);
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

  async updateInvoicer (invoicer) {
    try {
      clearToasts();
      loading.set(true);
      // copy invoicer and remove properties for db
      let invoicerClone = {...invoicer};
      delete invoicerClone.isAuthenticated;
      delete invoicerClone.authToken;
      await updateUser(invoicerClone, get(user).authToken);
      user.set(invoicer);
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Success', 'Your company info was successfully saved.');
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while saving your company info. Please try again later.');
    } finally {
      loading.set(false); 
    }
  }

  async uploadLogo (file) {
    try {
      clearToasts();
      loading.set(true);
      const result = await getUploadUrl(get(user).authToken);
      await uploadFile(result.uploadUrl, file);
      user.update(values => ({...values, logoUrl: result.downloadUrl}));
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Success', 'Your company logo was successfully saved.');
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while uploading your logo. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  isInvoiceValid (invoice) {
    return invoice.recipient && invoice.lineItems.length && invoice.created && invoice.due;
  }
}

const instance = new AppFacade();
export default instance;