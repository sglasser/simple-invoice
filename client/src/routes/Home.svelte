<script>
  import { invoices } from '../stores.js';
  import facade from '../facade.js';
  import Dashboard from '../components/Dashboard.svelte';
  import Invoices from '../components/Invoices.svelte';

  if(!$invoices.length) {
    console.log('load invoices')
    facade.loadInvoices();
  }
</script>

<Dashboard></Dashboard>
<Invoices></Invoices>


