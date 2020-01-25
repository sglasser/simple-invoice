import { writable, readable } from 'svelte/store';
import moment from 'moment';
import { getYears } from './util/util.js';

export const invoices = writable([]);

export const user = writable({
  isAuthenticated: false,
  userId: null,
  accessToken: null
});

export const recipients = writable([]);

export const auth = writable({
  isAuthenticated: false,
  userId: null,
  accessToken: null
});

export const loading = writable(false);

export const displayRecipientModal = writable(false);

export const displayInvoiceModal = writable(false);

export const displayLineItemModal = writable(false);

export const isInvoiceDirty = writable(false);

export const searchCriteria = writable({
  status: 'ALL',
  year: moment().get('year'),
  month: moment().get('month')
});

export const statuses = readable([
  'ALL',
  'PAID',
  'UNPAID'
]);

export const years = readable(getYears());

export const months = readable([
  {id: 0, text: 'January'},
  {id: 1, text: 'February'},
  {id: 2, text: 'March'},
  {id: 3, text: 'April'},
  {id: 4, text: 'May'},
  {id: 5, text: 'June'},
  {id: 6, text: 'July'},
  {id: 7, text: 'August'},
  {id: 8, text: 'September'},
  {id: 9, text: 'October'},
  {id: 10, text: 'November'},
  {id: 11, text: 'December'}
]);



