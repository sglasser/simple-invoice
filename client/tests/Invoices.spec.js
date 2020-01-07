import { render, fireEvent } from '@testing-library/svelte'
 
import Invoices from './components/Invoices.svelte';
 
describe('Invoices', () => {
 
  // Unmounts any components mounted in the previous test.
 
  test('should render', () => {
    const { container } = render(Invoices);
    // expect(container).;
  });

  test('should call api', () => {
    const { container } = render(Invoices);
    const createBtn = getByText('Create Invoice');
  })
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});