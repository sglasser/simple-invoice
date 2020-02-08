import auth0 from 'auth0-js';
import { authConfig } from '../../config.js';
import { user, loading } from '../stores.js';
import { getUser, createUser } from '../api/user-api.js';
import { push } from 'svelte-spa-router';
import { toast, stickyToast } from '../components/Toast.svelte';

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

  async handleAuthentication (authResult) {
    try {
      loading.set(true);
      this._auth0.parseHash(async (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          let userInfo = await this.getUserInfo(authResult.idToken);
          if (!userInfo) userInfo = await this.createUser(authResult.idToken);
          user.set({
            ...userInfo,
            authToken: authResult.idToken,
            isAuthenticated: true,
          });
          push('/');
        } else {
          throw new Error(err);
        }
      });
    } catch (err) {
      console.log(err);
      stickyToast('danger', 'Error', 'Error occured while authenticating your account. Please try again later.');
    } finally {
      loading.set(false);
    }
  }

  async createUser(authToken) {
    return await createUser(authToken);
  }

  async getUserInfo(userId) {
    try {
      const user = await getUser(userId);
      return user;
    } catch (err) {
      console.log(err);
      return {};
    }
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
}

const instance = new Auth();
export default instance;
