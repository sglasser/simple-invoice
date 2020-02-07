import auth0 from 'auth0-js';
import { authConfig } from '../../config.js';
import { user } from '../stores.js';
import { getUser } from '../api/user-api.js';
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

  handleAuthentication (authResult) {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        const result = this.getUserInfo(authResult.idToken);
        const userInfo = result.length ? result :  {new: true}
        console.log('userInfo', userInfo)
        user.set({
          isAuthenticated: true,
          userId: authResult.idToken,
          accessToken: authResult.accessToken,
          ...userInfo
        });
        push('/');
      } else if (err) {
        console.log(err);
        stickyToast('danger', 'Error', 'Error occured while authenticating your account. Please try again later.');
      }
    });
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
