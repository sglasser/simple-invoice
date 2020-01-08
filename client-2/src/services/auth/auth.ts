import { WebAuth } from 'auth0-js';
import auth0 from 'auth0-js'
import { authConfig } from '../../config';
import { mutations } from '../store/store';
// import { push } from 'svelte-spa-router';

class Auth {

  private _auth0: WebAuth;
  private _accessToken: string | undefined = '';
  private _idToken: string | undefined = '';
  private _expiresAt: number | undefined = 0;

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

  handleAuthentication(authResult: any) {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        mutations.setAuth({
          isAuthenticated: true,
          userId: authResult.idToken,
          accessToken: authResult.accessToken
        });
        //push('/');
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  getAccessToken() {
    return this._accessToken;
  }

  getIdToken() {
    return this._idToken;
  }

  setSession(authResult: auth0.Auth0DecodedHash) {
    this._accessToken = authResult.accessToken;
    this._idToken = authResult.idToken;
    this._expiresAt = authResult.expiresIn ? (authResult.expiresIn * 1000) + new Date().getTime() : 0;
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
    this._accessToken = undefined;
    this._idToken = undefined;
    this._expiresAt = 0;
    this._auth0.logout({
      //return_to: window.location.origin
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
