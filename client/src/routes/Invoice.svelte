<script>
  import { onMount } from 'svelte';
  import facade from '../facade.js';
  import RecipientModal from '../components/RecipientModal.svelte';
  import InvoiceModal from '../components/InvoiceModal.svelte';
  import { showRecipientModal } from '../stores.js';
  import { user } from '../stores.js';
  import { uuid } from 'uuidv4';
  import { getInvoiceFromStore } from '../util.js';
  import {
    Button,
    CustomInput,
    FormGroup,
    Label,
    Table,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Col,
    Container,
    Row
  } from "sveltestrap";
  // for route params
  export let params = {}
 
  let invoice = null;


  onMount(() => {
    if (params.invoiceId) {
      invoice = getInvoiceFromStore(params.invoiceId);
    }
  });

  const showCustomerModal = () => (showRecipientModal.set(true));
  
  const createInvoice = async () => {
    const now = new Date();
    const due = new Date('2020-02-01T06:00:00');
    const result = await facade.createInvoice({
      invoiceId: uuid(), 
      invoiceNumber: 1,
      recipient: {
        name: "Jims Service",
        address: '123 Main',
        city: 'Blaine',
        state: 'MN',
        postalCode: '55449',
        phone: '763-218-2571',
        email: 'steve@steveglasser.com'
      },
      lineItems: [
        {
          qty: 1,
          desc: 'Web dev',
          price: 100.00,
        }
      ],
      created: now.toLocaleDateString(),
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      due: due.toLocaleDateString(),
      dueYear: due.getFullYear(),
      dueMonth: due.getMonth() + 1,
      paid: false
    });
  }

  const createUser = async () => {
    const result = await facade.createUser({
      recipientId: '1234',
      name: 'Sierra Golf Software',
      address: '9169 Coral Sea St',
      city: 'Blaine',
      state: 'MN',
      postal: '55449',
      phone: '763-218-2571',
      email: 'steve@steveglasser.com',
    });
  }
</script>
{#if invoice}
  <Card>
    <CardBody>
      <Container>
        <Row>
          <Col class='bg-primary banner-height'>
            <span class='text-primary'>Banner</span>
          </Col>
        </Row>
        <Row class='d-flex justify-content-between'>
          <Col>
            <h3>Sierra Golf Software <span><a>Edit</a></span></h3>
            <span class='text-black-50'>
              9169 Coral Sea St<br>
              Blaine, MN 55449<br>
              763-218-2571<br>
              steve@sierragolfsoftware.com
            </span>
          </Col>
          <Col class='text-right'>
            <!--empty--> 
          </Col>
        </Row>
        <Row>
          <Col>
            <hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <span class='text-black-50'>
              BILL TO:
            </span>
            <br>
            <strong>{invoice.recipient.name}</strong><br>
            {invoice.recipient.address}<br>
            {invoice.recipient.city}, {invoice.recipient.state} {invoice.recipient.postalCode}
          </Col>
          <Col>
            <span class='text-black-50'>
              PLEASE MAKE PAYABLE TO:
            </span>
            <br>
            Sierra Golf Software LLC
          </Col>
          <Col class='text-right'>
            <span class='text-black-50'>
             INVOICE:
            </span>
            <br>
            <span class='text-primary font-weight-bold'>
              Invoice: 1030
            </span>
            <br>
            January 11, 2020
          </Col>
        </Row>
        <Row>
          <Col class='text-center bg-primary text-light'>
            <span class='font-weight-bold'>
              INVOICE
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>QUANTITY</th>
                  <th>DESCRIPTION</th>
                  <th>UNIT PRICE</th>
                  <th class='text-right'>PRICE</th>
                </tr>
              </thead>
              <tbody>
                {#each invoice.lineItems as lineItem, i}
                  <tr>
                    <td>{lineItem.qty}</td>
                    <td>{lineItem.desc}</td> 
                    <td>${lineItem.rate}</td> 
                    <td class='text-right'>${lineItem.total}</td>
                  </tr>
                {/each}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr>
          </Col>
        </Row>
        <Row class='d-flex justify-content-between'>
          <Col>
            <span class='text-black-50'>
              TOTAL
            </span>
          </Col>
          <Col class='text-right text-primary font-weight-bold pr-2'>
            ${invoice.total}
          </Col>
        </Row>
      </Container>
    </CardBody>
  </Card>
{/if}
<Button on:click={createInvoice}>Create Invoice</Button>
<Button on:click={showCustomerModal}>Add Recipient</Button>
<Button on:click={createUser}>Create User</Button>
<RecipientModal invoice={invoice}></RecipientModal>
<InvoiceModal invoice={invoice}></InvoiceModal>

<style>
  .banner-height {
    height: 5px;
    font-size: 1px;
    line-height: 1px;
  }
</style>