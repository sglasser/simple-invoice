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
  });

  test('should load invoices', () => {
    const loadSpy = jest.spyOn(UIFacade, 'getInvoices')
    expect(loadSpy).toHaveBeenCalledTimes(1);
  });

  test('should have button to create new invoice', () => {
    const { getByText } = render(Invoices);
    const createBtn = getByText('Create Invoice');
    expect(createBtn).toHaveTextContent('Create Invoice')
  });
});