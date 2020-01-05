<script>
  import facade from '../facade.js';
  import { Button } from 'sveltestrap';

  async function createInvoice() {
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
      created: new Date().toLocaleDateString(),
      due: '2/1/2020',
      total: 100.00
    });

  }
</script>
<Button on:click={createInvoice}>Create Invoice</Button>