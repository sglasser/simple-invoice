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
  import { getInvoiceFromStore, getEmptyInvoice, getEmptyLineItem } from '../util/util.js';
  import { push } from 'svelte-spa-router';
  import { createPdf } from '../util/pdf.js';
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
  import moment from 'moment';

  // for route params
  export let params = {}
 
  let currentInvoice = null;
  let currentLineItem = null;

  onMount(async () => {
    currentInvoice = params.invoiceId ? getInvoiceFromStore(params.invoiceId) : getEmptyInvoice();
    if (!$recipients.length) facade.getRecipients(); 
    if (!currentInvoice.invoiceNumber) currentInvoice.invoiceNumber = await facade.getMaxInvoiceNumber();
  });

  // computed properties
  $: if (currentInvoice) currentInvoice.total = currentInvoice ? 
    currentInvoice.lineItems.reduce((accumulator, lineItem) => accumulator + (lineItem.qty * lineItem.price), 0).toFixed(2) :
    '';
  $: recipientAddress = currentInvoice && currentInvoice.recipient.address ? 
    `${currentInvoice.recipient.address}<br>${currentInvoice.recipient.city}, ${currentInvoice.recipient.stateprov} ${currentInvoice.recipient.postal}` :
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
  const save = () => {
    // if due date has been changed
    const dueDate = moment(currentInvoice.due);
    currentInvoice.dueYear = dueDate.format('YYYY');
    currentInvoice.dueMonth = dueDate.format('MM');
    facade.upsertInvoice(currentInvoice);
  }
  const markPaid = () => {
    currentInvoice.paid = true;
    facade.upsertInvoice(currentInvoice);
  }
  const print = () => createPdf(currentInvoice);
  const handleLogo = (event) => {
    const files = event.target.files;
    facade.uploadLogo(files[0]);
  }
</script>

{#if currentInvoice}
  <div class='container'>
    <div class='row'>
      <div class="col">
        <a href='#/invoices' class="btn btn-outline-secondary btn-spacing">
         <i class="fas fa-arrow-left"></i> Invoices
        </a>
      </div>
    </div>
    <div class='card' class:centered-img="{currentInvoice.paid}">
      <div class='card-body card-top'>
        <div class='banner container'>
          <Row class='d-flex justify-content-between'>
            <Col>
              <Row>
                <Col xs='auto'>
                  <h3>
                    {$user.company} 
                  </h3>
                      <div class='clip-upload'>
                       <label for="file-input">
                        <i class="fa fa-paperclip fa-lg" aria-hidden="true"></i>
                      </label>
                        <input
                          type="file"
                          accept="image/*"
                          placeholder="Upload logo"
                          name='file-input'
                          id='file-input'
                          class='hide'
                          on:change={handleLogo}
                        />
                      </div>
               
                </Col>
                <Col>
                  <span on:click={showInvoicerModal}>
                    Edit
                  </span> 
                </Col>
              </Row>
              <span class='text-black-50'>
                {$user.address}<br>
                {$user.city}, {$user.stateprov} {$user.postal}<br>
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
                INVOICE DUE:
              </span>
              <br>
                <input type='date' bind:value={currentInvoice.due} class='form-control'>
            </Col>
            <Col class='text-right'>
              <span class='text-primary font-weight-bold'>
                Invoice: {currentInvoice.invoiceNumber}
              </span>
              <br>
              {currentInvoice.created}
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
                    <tr on:click={event => showLineItemModal(lineItem)} >
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
        </div>
      </div>
    </div>
    <div class='row'>
      <div class="col">
        <div class="btn btn-primary" on:click={save}>
          Save Invoice
        </div>
      </div>
      <div class="col">
        <div class="btn btn-secondary" on:click={markPaid}>
          Mark Paid
        </div>
      </div>
      <div class="col">
        <div class='btn btn-info btn-outline' on:click={print}>
          Print PDF
        </div>
      </div>
    </div>
  </div>
{/if}
<RecipientModal invoice={currentInvoice}></RecipientModal>
<InvoicerModal on:updateInvoicer={updateInvoicer}></InvoicerModal>
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

  .btn-spacing {
    margin-bottom: 1rem;
  }

  .centered-img {
    background-image: url('/paid.png');
    background-repeat: no-repeat;
    background-position: center;
  }

  .hide {
    display: none;
  }
</style>

