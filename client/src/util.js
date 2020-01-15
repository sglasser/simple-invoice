import moment from 'moment';
import { uuid } from 'uuidv4';
import { get } from 'svelte/store';
import { invoices } from './stores.js';

export function getYears() {
  let years = [];
  const currentYear = moment().get('year');
  years.push(currentYear)
  for (let i = 1; i < 5; i++) {
    years.push(currentYear - i);
  }
  return years;
}

export function getInvoiceFromStore(invoiceId) {
  return get(invoices).find(invoice => invoice.invoiceId === invoiceId);
}

export function getEmptyInvoice() {
  const now = moment();
  return {     
    invoiceId: uuid(), 
    invoiceNumber: 1,
    recipient: {
      recipientId: '',
      company: '',
      address: '',
      city: '',
      state: '',
      postal: '',
      phone: '',
      email: ''
    },
    lineItems: [
    ],
    created: now,
    year: now.year(),
    month: now.month(),
    due: now.add(30, 'days'),
    dueYear: now.add(30, 'days').year(),
    dueMonth: now.add(30, 'days').month(),
    paid: false
  };
}

export function getEmptyLineItem() {
  return {
    qty: 0,
    desc: '',
    price: 0.00,
    total: 0.00
  };
};
