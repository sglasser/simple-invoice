import { apiEndpoint } from '../../config.js';

export async function createInvoice(idToken, invoice) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
    {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.json;
  return data;
}

export async function getInvoices(idToken) {
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
  const data = await result.json;
  return data;
}