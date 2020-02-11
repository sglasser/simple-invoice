import { writable } from 'svelte/store';

export const invoices = writable([]);

export const recipients = writable([]);

export const loading = writable(false);

export const displayRecipientModal = writable(false);

export const displayInvoiceModal = writable(false);

export const displayLineItemModal = writable(false);

export const displayInvoiceDirtyModal = writable(false);

export const isInvoiceDirty = writable(false);

export const user = writable({
  isAuthenticated: false,
  userId: null,
  accessToken: null
});




