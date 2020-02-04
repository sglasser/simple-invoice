
import { render } from '@testing-library/svelte'
 
import Invoice from '../src/routes/Invoice.svelte';
import UIFacade from '../src/ui-facade.js';

jest.mock('../src/ui-facade.js');
 
describe('App', () => {
 
  // Unmounts any components mounted in the previous test.
 
  test('should render', () => {
    const { container } = render(Invoice);
    expect(container).toBeTruthy();
  });
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});