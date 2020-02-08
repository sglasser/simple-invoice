import { apiEndpoint } from '../../config.js';

export async function getRecipients(authToken) {
  const result = await fetch(
    `${apiEndpoint}/recipient`,
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

export async function updateRecipient(recipient, authToken) {
  const result = await fetch(
    `${apiEndpoint}/recipient`,
    {
      method: 'PATCH',
      body: JSON.stringify(recipient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateRecipient result', result)

}

export async function createRecipient(recipient, authToken) {
  console.log(recipient)
  const result = await fetch(
    `${apiEndpoint}/recipient`,
    {
      method: 'POST',
      body: JSON.stringify(recipient),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}