import { apiEndpoint } from '../../config.js';

export async function createInvoice(invoice, authToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
    {
      method: 'POST',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}

export async function updateInvoice(invoice, authToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
    {
      method: 'PATCH',
      body: JSON.stringify(invoice),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateInvoice result', result)
}

export async function getInvoices(authToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}

export async function getMaxInvoiceNumber(authToken) {
  const result = await fetch(
    `${apiEndpoint}/max-invoice-number`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  console.log('getMaxInvoiceNumber', data)
  return data;

}