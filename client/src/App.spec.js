import { render, fireEvent, cleanup } from '@testing-library/svelte';
import App from './App.svelte';
//import MockRouter from '../tests/RouterMock.svelte';
import Auth from './auth/auth.js';

// jest.mock('../node_modules/svelte-spa-router/Router.svelte', () => ({
//   default: MockRouter
// }));
 
describe('App', () => {

  // Unmounts any components mounted in the previous test.

  // test('should render', () => {
  //   const {getByText} = render(App);
  //   // expect(getByText('Overdue Invoices')).toBeInTheDocument(); // found Delete button
  // });
  test('should call auth', () => {
  
    global.window.location.hash = 'access_key=1234'
    const auth = jest.spyOn(Auth, 'handleAuthentication');
    const { container } = render(App);
    expect(auth).toBeCalled();
  })
 
  // test('should render', () => {
  //   const {getByText} = render(App, {name: 'World'});
  //   expect(getByText('Greetings World!')).toBeInTheDocument(); // found Delete button
  // });
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});