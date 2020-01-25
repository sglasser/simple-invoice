import { apiEndpoint } from '../../config.js';

export async function getUser(idToken) {
  const result = await fetch(
    `${apiEndpoint}/user`,
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
    `${apiEndpoint}/user`,
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
    `${apiEndpoint}/user`,
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

export async function getUploadUrl(idToken) {
  const result = await fetch(
    `${apiEndpoint}/user/logo`,
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

export async function uploadFile(uploadUrl, file) {
  const result = await fetch(
    uploadUrl,
    {
      method: 'PUT',
      body: file
    }
  );
  const status = await result.status;
  console.log('upload status', status);
  return status;
}