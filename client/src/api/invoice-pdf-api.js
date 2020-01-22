import { apiEndpoint } from '../../config.js';

export async function createInvoicePdf(invoice, idToken) {
  const result = await fetch(
    `${apiEndpoint}/invoice/pdf`,
    {
      method: 'POST',
      body: JSON.stringify(invoice),
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.blob();
  return data;
}