

import { render, fireEvent, cleanup } from '@testing-library/svelte'
 
import App from './App.svelte';
 
describe('App', () => {
 
  // Unmounts any components mounted in the previous test.
  afterEach(cleanup);
 
  test('should render', () => {
    const {getByText} = render(App, {name: 'World'});
    expect(getByText('Greetings World!')).toBeInTheDocument(); // found Delete button
  });
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});