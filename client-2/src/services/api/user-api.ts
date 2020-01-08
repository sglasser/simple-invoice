import { User } from './../../models/user';
import { apiEndpoint } from '../../config.js';

export async function getUser(idToken: string) {
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
  
  export async function updateUser(user: User, idToken: string) {
  
  
  
  
  }
  
  export async function createUer(user: User, idToken: string) {
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