import { Invoice } from '../../models/Invoice';
import { apiEndpoint } from '../../config.js';

export async function createInvoice(idToken: string, invoice: Invoice) {
  const result = await fetch(
    `${apiEndpoint}/invoices`,
    {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}

export async function getInvoices(idToken: string) {
  const result = await fetch(
    `${apiEndpoint}/invoices`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}