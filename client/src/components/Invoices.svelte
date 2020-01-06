<script>
  import { invoices } from '../stores.js';
  import { Table, Card, CardHeader, CardTitle, CardBody, Button } from 'sveltestrap';
  import { push } from 'svelte-spa-router';

  const navigateToInvoice = () => (push('/invoice'));
</script>

<Card>
  <CardHeader>
    <CardTitle>INVOICES</CardTitle> <Button outline primary on:click={navigateToInvoice}>Create Invoice</Button>
  </CardHeader>
  <CardBody>
    <Table>
      <thead>
        <tr>
          <th>Invoice Num</th>
          <th>Recipient</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {#each $invoices as invoice, i}
          <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.recipient.name}</td> 
            <td>{invoice.total}</td> 
            <td>{invoice.created}</td>
            <td>{invoice.due}</td>  
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
</Card>