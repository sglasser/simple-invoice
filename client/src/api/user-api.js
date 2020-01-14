import { apiEndpoint } from '../../config.js';

export async function getUser(idToken) {
  const result = await fetch(
    `${apiEndpoint}/users/${idToken}`,
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

export async function updateUser(user, idToken) {
  const result = await fetch(
    `${apiEndpoint}/users/${idToken}`,
    {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateUser result', result)

}

export async function createUser(user, idToken) {
  const result = await fetch(
    `${apiEndpoint}/users`,
    {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}