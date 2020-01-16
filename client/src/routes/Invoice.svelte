<script>
  import { onMount } from 'svelte';
  import facade from '../facade.js';
  import RecipientModal from '../components/RecipientModal.svelte';
  import InvoicerModal from '../components/InvoicerModal.svelte';
  import LineItemModal from '../components/LineItemModal.svelte';
  import { displayRecipientModal } from '../stores.js';
  import { displayInvoiceModal } from '../stores.js';
  import { displayLineItemModal } from '../stores.js';
  import { user } from '../stores.js';
  import { recipients } from '../stores.js';
  import { isInvoiceDirty } from '../stores.js';
  import { uuid } from 'uuidv4';
  import { getInvoiceFromStore, getEmptyInvoice, getEmptyLineItem } from '../util.js';
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
    Row,
    Input
  } from "sveltestrap";

  // for route params
  export let params = {}
 
  let currentInvoice = null;
  let currentLineItem = null;

  onMount(() => {
    currentInvoice = params.invoiceId ? getInvoiceFromStore(params.invoiceId) : getEmptyInvoice();
    if (!$recipients.length) facade.getRecipients(); 
  });

  // computed properties
  $: invoiceTotal = currentInvoice ? 
    currentInvoice.lineItems.reduce((accumulator, lineItem) => accumulator + (lineItem.qty * lineItem.price), 0).toFixed(2) :
    '';
  $: recipientAddress = currentInvoice && currentInvoice.recipient.address ? 
    `${currentInvoice.recipient.address}<br>${currentInvoice.recipient.city}, ${currentInvoice.recipient.state} ${currentInvoice.recipient.postal}` :
    ``;

  // functions
  const showRecipientModal = () => displayRecipientModal.set(true);
  const showInvoicerModal = () => displayInvoiceModal.set(true);
  const showLineItemModal = (lineItem) => {
    currentLineItem = lineItem ? lineItem : getEmptyLineItem();
    displayLineItemModal.set(true);
  }
  const updateLineItem = (event) => {
    const updatedLineItem = event.detail;
    if (!updatedLineItem.lineItemId) updatedLineItem.lineItemId = uuid();
    const i = currentInvoice.lineItems.findIndex(item => item.lineItemId === updatedLineItem.lineItemId);
    const lineItems = [...currentInvoice.lineItems]
    i !== -1 ? lineItems[i] = updatedLineItem :
      lineItems.push(updatedLineItem);
    currentInvoice.lineItems = lineItems;
    setInvoiceDirty();
  }
  const setInvoiceDirty = () => isInvoiceDirty.set(true)
  
  const createInvoice = async () => {
    const now = new Date();
    const due = new Date('2020-02-01T06:00:00');
    const result = await facade.createInvoice({
      invoiceId: uuid(), 
      invoiceNumber: 1,
      recipient: {
        company: "Jims Service",
        address: '123 Main',
        city: 'Blaine',
        state: 'MN',
        postalCode: '55449',
        phone: '763-218-2571',
        email: 'steve@steveglasser.com'
      },
      lineItems: [
        {
          lineItemId: '2233',
          qty: 1,
          desc: 'Web dev',
          price: 100.00,
          total: 100.00
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
      company: 'Sierra Golf Software',
      address: '9169 Coral Sea St',
      city: 'Blaine',
      state: 'MN',
      postal: '55449',
      phone: '763-218-2571',
      email: 'steve@steveglasser.com',
    });
  }
</script>
{#if currentInvoice}
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
            <Row>
              <Col xs='auto'>
                <h3>
                  {$user.company} 
                </h3>
              </Col>
              <Col>
                <Button secondary outline size='sm' on:click={showInvoicerModal}>
                  Edit
                </Button> 
              </Col>
            </Row>
            <span class='text-black-50'>
              {$user.address}<br>
              {$user.city}, {$user.state} {$user.postal}<br>
              {$user.phone}<br>
              {$user.email}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col xs='auto'>
               <span class='text-black-50'>
                  BILL TO:
                </span>
                <Button secondary outline size='sm' on:click={showRecipientModal}>
                  Add
                </Button> 
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <select bind:value={currentInvoice.recipient} on:change={setInvoiceDirty} class='form-control form-control-sm'>
                    <option value=''>Select Recipient</option>
                    {#each $recipients as recipient}
                      <option value={recipient}>
                        <strong>{recipient.company}</strong>
                      </option>
                    {/each}
                  </select>
                </FormGroup>
                  {@html recipientAddress}
              </Col>
            </Row>
          </Col>
          <Col>
            <span class='text-black-50'>
              PLEASE MAKE PAYABLE TO:
            </span>
            <br>
              {$user.company}
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
                  <th class='text-right'>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {#each currentInvoice.lineItems as lineItem, i}
                  <tr on:click={event => showLineItemModal(lineItem)}>
                    <td>{lineItem.qty}</td>
                    <td>{lineItem.desc}</td> 
                    <td>${lineItem.price}</td> 
                    <td class='text-right'>${lineItem.total}</td>
                  </tr>
                {/each}
                <tr>
                  <td colspan='4'>
                    <Button secondary outline size='sm' on:click={event => showLineItemModal(null)}>Add Item</Button>
                  </td>
                </tr>
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
            ${invoiceTotal}
          </Col>
        </Row>
      </Container>
    </CardBody>
  </Card>
{/if}
<Button on:click={createInvoice}>Create Invoice</Button>
<Button on:click={showRecipientModal}>Add Recipient</Button>
<Button on:click={createUser}>Create User</Button>
<RecipientModal invoice={currentInvoice}></RecipientModal>
<InvoicerModal></InvoicerModal>
<LineItemModal on:lineItemUpdate={updateLineItem} lineItem={currentLineItem}></LineItemModal>

<style>
  .banner-height {
    height: 5px;
    font-size: 1px;
    line-height: 1px;
  }

  h3 .edit-link { 
    display: inline-block; 
  }
</style>