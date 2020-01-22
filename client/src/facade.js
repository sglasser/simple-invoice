import { invoices, recipients } from './stores.js';
import { user } from './stores.js';
import { get } from 'svelte/store';
import { loading } from './stores.js';
import { isInvoiceDirty } from './stores.js';
import { createInvoice, getInvoices, updateInvoice, getMaxInvoiceNumber } from './api/invoice-api.js';
import { createUser, updateUser } from './api/user-api.js';
import { getRecipients, createRecipient } from './api/recipient-api.js';
import { createInvoicePdf } from './api/invoice-pdf-api';
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
      recipient.userId = get(user).userId;
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
    try {
      loading.set(true);
      if (invoicer.userId) {
        await updateUser(invoicer, get(user).userId);
      } else {
        await createUser(invoicer, invoicer.userId);
      }
      toast('success', this.TOAST_DISPLAY_LENGTH, 'Your company info was successfully saved.')
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while saving your company info. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async createInvoicePdf (invoice) {
    // https://medium.com/@storrisi/how-to-show-a-pdf-stream-on-a-react-client-without-any-library-36220fee60cb
    // https://github.com/eligrey/FileSaver.js
    try {
      loading.set(true);
      const blob = await createInvoicePdf(invoice, get(user).userId);
      // const file = new Blob(
      //   data,
      //   {type: 'application/pdf'}
      // );
      const fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl);
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occurred while generating pdf.');
    } finally {
      loading.set(false);
    }
  }
  
}

const instance = new AppFacade();
export default instance;