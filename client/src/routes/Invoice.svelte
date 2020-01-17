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
  $: if (currentInvoice) currentInvoice.total = currentInvoice ? 
    currentInvoice.lineItems.reduce((accumulator, lineItem) => accumulator + (lineItem.qty * lineItem.price), 0).toFixed(2) :
    '';
  $: recipientAddress = currentInvoice && currentInvoice.recipient.address ? 
    `${currentInvoice.recipient.address}<br>${currentInvoice.recipient.city}, ${currentInvoice.recipient.state} ${currentInvoice.recipient.postal}` :
    ``;

  // functions
  const setInvoiceDirty = () => isInvoiceDirty.set(true);
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
  const deleteLineItem = (event) => {
    const lineItemToDelete = event.detail;
    currentInvoice.lineItems = currentInvoice.lineItems.filter(lineItem => lineItem.lineItemId != lineItemToDelete.lineItemId);
    setInvoiceDirty();
  }
  const updateInvoicer = (event) => {
    facade.upsertInvoicer(event.detail);
  }
  const save = () => facade.upsertInvoice(currentInvoice);
</script>

{#if currentInvoice}
  <div class='card'>
    <div class='card-body card-top'>
      <div class='banner container'>
        <Row class='d-flex justify-content-between'>
          <Col>
            <Row>
              <Col xs='auto'>
                <h3>
                  {$user.company} 
                </h3>
              </Col>
              <Col>
                <span on:click={showInvoicerModal}>
                  Edit
                </span> 
              </Col>
            </Row>
            <span class='text-black-50'>
              {$user.address}<br>
              {$user.city}, {$user.state} {$user.postal}<br>
              {$user.phone}<br>
              {$user.email}
            </span>
          </Col>
          <Col class='pull-right'>
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
              </Col>
              <Col>
                <span on:click={showRecipientModal}>Add</span>
              </Col>
            </Row>
            <span class='text-black-50'>
              {@html recipientAddress}
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
            <span class='text-black-50'>
              PLEASE MAKE PAYABLE TO:
            </span>
            <br>
              {$user.company}
          </Col>
          <Col class='text-right'>
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
            ${currentInvoice.total}
          </Col>
        </Row>
            <div class='row'>

      <Button primary outline on:click={save}>Save Invoice</Button>
    </div>
      </div>
    </div>

  </div>
{/if}
<RecipientModal invoice={currentInvoice}></RecipientModal>
<InvoicerModal
  on:updateInvoicer={updateInvoicer}>
</InvoicerModal>
<LineItemModal 
  on:updateLineItem={updateLineItem} 
  on:deleteLineItem={deleteLineItem} 
  lineItem={currentLineItem}>
</LineItemModal>

<style>
  .banner {
    border-top: 20px solid #007bff;
    padding-top: 20px;
  }

  h3 .edit-link { 
    display: inline-block; 
  }

  .card-top {
    padding-top: 0px;
  }
</style>

