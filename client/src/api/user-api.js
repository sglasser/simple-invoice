export async function getUser(idToken) {
  const result = await fetch(
    `${apiEndpoint}/user/${idToken}`,
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




}

export async function createUer(user, idToken) {
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