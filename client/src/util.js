import moment from 'moment';
import { get } from 'svelte/store'
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
  return get(invoices).filter(invoice => invoice.invoiceId === invoiceId);
}