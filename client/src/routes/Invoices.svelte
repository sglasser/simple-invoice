<script>
  import { onMount } from 'svelte';
  import { invoices } from '../stores.js';
  import { statuses } from '../stores.js';
  import { years } from '../stores.js';
  import { months } from '../stores.js';
  import { searchCriteria } from '../stores.js';
  import UIFacade from '../ui-facade.js';
  import { push } from 'svelte-spa-router';
  import moment from 'moment';

  onMount(() => { if(!$invoices.length)UIFacade.getInvoices() });

  const create = () => push('/invoice');
  const editInvoice = (id) => push(`/invoice/${id}`);
  const refresh = () => UIFacade.loadInvoices();
  const isOverDue = (invoice) => moment().isAfter(moment(invoice.due));
  const formatDate = (date) => moment(date).format('MM/DD/YYYY'); 
</script>

<div class='d-flex flex-row justify-content-between align-items-center'>
  <h3>INVOICES</h3> 
  <div class='btn btn-primary btn-outline' on:click={create}>Create Invoice</div>
</div>

{#if $invoices.length}
  <div class='table-responsive'>
    <table class='table'>
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
          <tr 
            on:click={() => editInvoice(invoice.invoiceId)}
            class:text-success='{invoice.paid}'
            class:text-danger={isOverDue(invoice)}
          >
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.recipient.company}</td> 
            <td>{invoice.total}</td> 
            <td>{formatDate(invoice.created)}</td>
            <td>{formatDate(invoice.due)}</td>  
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{:else}
  No Invoices To Display
{/if}  


