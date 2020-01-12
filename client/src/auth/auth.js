import auth0 from 'auth0-js';
import { authConfig } from '../../config.js';
import { user } from '../stores.js';
import { getUser } from '../api/user-api.js';
import { push } from 'svelte-spa-router';

class Auth {

  constructor () {
    this._auth0 = new auth0.WebAuth({
      domain: authConfig.domain,
      clientID: authConfig.clientId,
      redirectUri: authConfig.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login() {
    this._auth0.authorize();
  }

  handleAuthentication (authResult) {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const userInfo = this.getUserInfo(authResult.idToken);
        user.set({
          isAuthenticated: true,
          userId: authResult.idToken,
          accessToken: authResult.accessToken
        });
        push('/');
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  async getUserInfo(userId) {
    try {
      const user = await getUser(userId);
      console.log('user', user);
    } catch (err) {
      console.log(err);
      return {};
    }
  }

  getAccessToken() {
    return this._accessToken;
  }

  getIdToken() {
    return this._idToken;
  }

  setSession(authResult) {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
  }

  renewSession() {
    this._auth0.checkSession({}, (err, authResult) => {
       if (authResult && authResult.accessToken && authResult.idToken) {
         this.setSession(authResult);
       } else if (err) {
         this.logout();
         console.log(err);
         alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
       }
    });
  }

  logout() {
    // Remove tokens and expiry time
    this._accessToken = null;
    this._idToken = null;
    this._expiresAt = 0;
    this._auth0.logout({
      return_to: window.location.origin
    });
  }

  isAuthenticated() {
    console.log(process.env.NODE_ENV)
    return process.env.NODE_ENV === 'development'?
      true :
      this._idToken //&& (new Date().getTime() < this._expiresAt);
  }
}

const instance = new Auth();
export default instance;
