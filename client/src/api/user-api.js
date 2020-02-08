import { apiEndpoint } from '../../config.js';

export async function getUser(authToken) {
  const result = await fetch(
    `${apiEndpoint}/user`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  return data[0] || null;
}

export async function updateUser(user, authToken) {
  const result = await fetch(
    `${apiEndpoint}/user`,
    {
      method: 'PATCH',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  // TODO response status and throw error if not 204
  console.log('updateUser result', result)

}

export async function createUser(authToken) {
  const result = await fetch(
    `${apiEndpoint}/user`,
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    }
  );
  const data = await result.json();
  return data;
}

export async function getUploadUrl(authToken) {
  const result = await fetch(
    `${apiEndpoint}/user/logo`,
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