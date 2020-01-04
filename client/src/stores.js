import { writable } from 'svelte/store';

export const invoices = writable(null);

export const auth = writable({
  isAuthenticated: false,
  userId: null,
  accessToken: null
});

export const loading = writable(false);