import { apiEndpoint } from '../../config.js';

export async function createInvoice(invoice, idToken) {
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
  const data = await result.json();
  return data;
}

export async function updateInvoice(invoice, idToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
    {
      method: 'PATCH',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateUser result', result)
}

export async function getInvoices(idToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
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