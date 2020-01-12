import moment from 'moment';
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

export function createNewEmptyInvoice() {
  return {     
    invoiceId: uuid(), 
    invoiceNumber: 1,
    recipient: {
      name: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      phone: '',
      email: ''
    },
    lineItems: [
      {
        qty: 1,
        desc: '',
        price: 0.00,
        total: 0.00
      }
    ],
    created: now.toLocaleDateString(),
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    due: due.toLocaleDateString(),
    dueYear: due.getFullYear(),
    dueMonth: due.getMonth() + 1,
    total: 0.00,
    paid: false
  };
}