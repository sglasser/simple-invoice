import MockNav from './MockNav.svelte';
import MockFooter from './MockFooter.svelte';
import MockOverlay from './MockOverlay.svelte';
import MockToast from './MockToast.svelte';
import MockRouter from './MockRouter.svelte';

jest.mock('svelte-spa-router', () => ({
  default: MockRouter
}));
jest.mock('../src/components/Nav.svelte', () => ({
  default: MockNav
}));
jest.mock('../src/components/Overlay.svelte', () => ({
  default: MockOverlay
}));
jest.mock('../src/components/Toast.svelte', () => ({
  default: MockToast
}));
jest.mock('../src/components/Footer.svelte', () => ({
  default: MockFooter
}));
jest.mock('../src/auth/auth.js', () => {
  return {
    handleAuthentication: jest.fn()
  }
})

import { render, fireEvent, cleanup } from '@testing-library/svelte';
import App from '../src/App.svelte';
import Router from  'svelte-spa-router';
import routes from '../src/routes.js';
import Auth from '../src/auth/auth.js';
import Footer from '../src/components/Footer.svelte';
import Overlay from '../src/components/Overlay.svelte';
import Toast from '../src/components/Toast.svelte';
import { auth } from '../src/stores.js';
import { loading } from '../src/stores.js';
import { onMount } from 'svelte';


 
describe('App', () => {

  test('should render', () => {
    const {getByText} = render(App);
    expect(getByText).toBeTruthy();
  });
  // test('should call auth', () => {
  
  //   global.window.location.hash = 'access_key=1234'
  //   const auth = jest.spyOn(Auth, 'handleAuthentication');
  //   const { container } = render(App);
  //   expect(auth).toBeCalled();
  // })
 
  // test('should render', () => {
  //   const {getByText} = render(App, {name: 'World'});
  //   expect(getByText('Greetings World!')).toBeInTheDocument(); // found Delete button
  // });
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});