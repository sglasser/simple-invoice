import { apiEndpoint } from '../../config.js';

export async function getRecipients(idToken) {
  const result = await fetch(
    `${apiEndpoint}/recipient`,
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

export async function updateRecipient(recipient, idToken) {
  const result = await fetch(
    `${apiEndpoint}/recipient`,
    {
      method: 'PATCH',
      body: JSON.stringify(recipient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateRecipient result', result)

}

export async function createRecipient(recipient, idToken) {
  const result = await fetch(
    `${apiEndpoint}/recipient`,
    {
      method: 'POST',
      body: JSON.stringify(recipient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}