<script>
    import {
    Button,
    CustomInput,
    FormGroup,
    Label,
    Table,
    Card,
    CardHeader,
    CardTitle,
    CardBody
  } from "sveltestrap";
  import { invoices } from '../stores.js';
  import { statuses } from '../stores.js';
  import { years } from '../stores.js';
  import { months } from '../stores.js';
  import { searchCriteria } from '../stores.js';
  import facade from '../facade.js';
  import { push } from 'svelte-spa-router';

  const create = () => push('/invoice');
  const editInvoice = (id) => push(`/invoice/${id}`);
  const refresh = () => facade.loadInvoices();
</script>

<Card>
  <CardHeader class='d-flex flex-row justify-content-between align-items-center'>
    <h3>INVOICES</h3> 
    <FormGroup>
      <CustomInput 
        bind:value={$searchCriteria.status}
        on:change={refresh} 
        type="select" 
        id="statusSelect" 
        name="statusSelect">
        <option value="">- Status -</option>
        {#each $statuses as status}
          <option value={status}>{status}</option>
        {/each}
      </CustomInput>
    </FormGroup>
    <FormGroup>
      <CustomInput 
        bind:value={$searchCriteria.year} 
        on:change={refresh} 
        type="select" 
        id="yearSelect" 
        name="yearSelect">
        <option value="">Year Created</option>
        {#each $years as year}
          <option value={year}>{year}</option>
        {/each}
      </CustomInput>
    </FormGroup>
    <FormGroup>
      <CustomInput 
        bind:value={$searchCriteria.month}
        on:change={refresh} 
        type="select" 
        id="monthSelect" 
        name="monthSelect">
        <option value="">Month Created</option>
        {#each $months as month}
          <option value={month.id}>{month.text}</option>
        {/each}
      </CustomInput>
    </FormGroup>
    <Button outline primary on:click={create}>Create Invoice</Button>
  </CardHeader>
  <CardBody>
    {#if $invoices.length}
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
            <tr on:click={() => editInvoice(invoice.invoiceId)}>
              <td>{invoice.invoiceNumber}</td>
              <td>{invoice.recipient.name}</td> 
              <td>{invoice.total}</td> 
              <td>{invoice.created}</td>
              <td>{invoice.due}</td>  
            </tr>
          {/each}
        </tbody>
      </Table>
    {:else}
      No Invoices To Display
    {/if}  
  </CardBody>
</Card>