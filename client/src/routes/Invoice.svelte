<script>
  import { onMount } from 'svelte';
  import facade from '../facade.js';
  import { Button } from 'sveltestrap';
  import RecipientModal from '../components/RecipientModal.svelte';
  import { showRecipientModal } from '../stores.js';
  import { uuid } from 'uuidv4';
  import { getInvoiceFromStore } from '../util.js';
  // for route params
  export let params = {}

  let invoice;

  onMount(() => {
    if (params.invoiceId) {
      console.log(getInvoiceFromStore(params.invoiceId));
    }
  });

  const showCustomerModal = () => (showRecipientModal.set(true));
  
  const createInvoice = async () => {
    const now = new Date();
    const due = new Date('2020-02-01T06:00:00');
    console.log(due);
    const result = await facade.createInvoice({
      invoiceId: uuid(), 
      invoiceNumber: 1,
      recipient: {
        name: "Bobs Service",
        address: '123 Main',
        city: 'Blaine',
        state: 'MN',
        postalCode: '55449',
        phone: '763-218-2571'
      },
      lineItems: [
        {
          qty: 1,
          desc: 'Web dev',
          rate: 100.00,
          total: 100.00
        }
      ],
      created: now.toLocaleDateString(),
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      due: due.toLocaleDateString(),
      dueYear: due.getFullYear(),
      dueMonth: due.getMonth() + 1,
      total: 100.00,
      paid: false
    });
  }
</script>

<Button on:click={createInvoice}>Create Invoice</Button>
<Button on:click={showCustomerModal}>Add Recipient</Button>
<RecipientModal></RecipientModal>

