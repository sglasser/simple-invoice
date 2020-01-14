<script>
  import { onMount } from 'svelte';
  import { invoices } from '../stores.js';
  import facade from '../facade.js';
  import Invoices from '../components/Invoices.svelte';

  onMount(() => {
    if(!$invoices.length) {
      facade.getInvoices();
    }
  });
</script>

<Invoices></Invoices>


