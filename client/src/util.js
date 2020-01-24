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
};

export function getInvoiceFromStore(invoiceId) {
  return get(invoices).find(invoice => invoice.invoiceId === invoiceId);
};

export function getEmptyInvoice() {
  const now = moment();
  return {     
    invoiceId: null, 
    invoiceNumber: '',
    recipient: {
      recipientId: '',
      company: '',
      address: '',
      city: '',
      stateprov: '',
      postal: '',
      phone: '',
      email: ''
    },
    lineItems: [
    ],
    created: now.format('YYYY-MM-DD'),
    year: now.format('YYYY'),
    month: now.format('MM'),
    due: now.add(30, 'days').format('MM/DD/YYYY'),
    dueYear: now.add(30, 'days').format('YYYY'),
    dueMonth: now.add(30, 'days').format('MM'),
    paid: false,
  };
};

export function getEmptyLineItem() {
  return {
    lineItemId: null,
    qty: '',
    desc: '',
    price: '',
    total: ''
  };
};

export function total(lineItems) {
  return lineItems.reduce((accumulator, lineItem) => accumulator + (lineItem.qty * lineItem.price), 0).toFixed(2)
};

export function formatCurrency (amount) {
  return `$${amount}`;
}
