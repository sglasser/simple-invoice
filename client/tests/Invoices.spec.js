import { render, fireEvent } from '@testing-library/svelte'
 
import Invoices from '../src/routes/Invoices.svelte';
import UIFacade from '../src/ui-facade.js';
import { push } from 'svelte-spa-router';

jest.mock('../src/ui-facade.js');
jest.mock('svelte-spa-router');
 
describe('Invoices', () => {
 
  test('should render', () => {
    const { container } = render(Invoices);
    expect(container).toBeTruthy();
    // expect(container).;
  });

  test('should load invoices', () => {
    const loadSpy = jest.spyOn(UIFacade, 'getInvoices')
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });

  test('should call api', () => {
    const { getByText } = render(Invoices);
    const createBtn = getByText('Create Invoice');
    expect(createBtn).toHaveTextContent('Create Invoice')
  });

  test('should navigate to invoice', async () => {
    const invoiceSpy = jest.spyOn(push);
    const createBtn = getByText('Create Invoice');
    await fireEvent.click(createBtn);
    expect(invoiceSpy).toHaveBeenCalledTimes(1);
  })
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});