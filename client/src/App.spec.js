import MockNav from '../tests/MockNav.svelte';
import MockFooter from '../tests/MockFooter.svelte';
import MockOverlay from '../tests/MockOverlay.svelte';
import MockToast from '../tests/MockToast.svelte';
import MockRouter from '../tests/MockRouter.svelte';

jest.mock('svelte-spa-router', () => ({
  default: MockRouter
}));
jest.mock('./components/Nav.svelte', () => ({
  default: MockNav
}));
jest.mock('./components/Overlay.svelte', () => ({
  default: MockOverlay
}));
jest.mock('./components/Toast.svelte', () => ({
  default: MockToast
}));
jest.mock('./components/Footer.svelte', () => ({
  default: MockFooter
}));
jest.mock('./auth/auth.js', () => {
  return {
    handleAuthentication: jest.fn()
  }
})

import { render, fireEvent, cleanup } from '@testing-library/svelte';
import App from './App.svelte';
import Router from  'svelte-spa-router';
import routes from './routes.js';
import Auth from './auth/auth.js';
import Footer from './components/Footer.svelte';
import Overlay from './components/Overlay.svelte';
import Toast from './components/Toast.svelte';
import { auth } from './stores.js';
import { loading } from './stores.js';
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