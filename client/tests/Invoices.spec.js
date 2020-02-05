import { render, fireEvent } from '@testing-library/svelte'
 
import Invoices from '../src/routes/Invoices.svelte';
import UIFacade from '../src/ui-facade.js';

jest.mock('../src/ui-facade.js');
 
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

  test('should have Create Invoice button', () => {
    const { getByText } = render(Invoices);
    const createBtn = getByText('Create Invoice');
    expect(createBtn).toHaveTextContent('Create Invoice')
  });

  test('should navigate to invoice', async () => {
    const createBtn = getByText('Create Invoice');
    await fireEvent.click(createBtn);
  })
});