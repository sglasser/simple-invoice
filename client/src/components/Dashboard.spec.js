
import { render } from '@testing-library/svelte'
 
import Dashboard from './Dashboard.svelte';
 
describe('App', () => {
 
  // Unmounts any components mounted in the previous test.
  afterEach(cleanup);
 
  test('should render', () => {
    const { container } = render(Dashboard);
    expect(container).toContainHTML("Overdue Invoices");
  });
 
  // There is no easy way to test that events are fired
  // when the checkbox state is changed
  // or when the "Delete" button is pressed.
  // These are covered by tests in TodoList.spec.js.
});