<script>
  import facade from '../facade.js';
  import { Button } from 'sveltestrap';
  import RecipientModal from '../components/RecipientModal.svelte';
  import { showRecipientModal } from '../stores.js';

  const showCustomerModal = () => (showRecipientModal.set(true));
  
  const createInvoice = async () => {
    const now = new Date();
    const due = new Date('2020-02-01T06:00:00');
    console.log(due);
    const result = await facade.createInvoice({
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

