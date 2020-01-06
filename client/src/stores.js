import { writable } from 'svelte/store';

export const invoices = writable([]);

export const user = writable({});

export const auth = writable({
  isAuthenticated: false,
  userId: null,
  accessToken: null
});

export const loading = writable(false);

export const showRecipientModal = writable(false);

