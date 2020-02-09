<script>
  import { onMount } from 'svelte';
  import UIFacade from '../ui-facade.js';
  import RecipientModal from '../components/RecipientModal.svelte';
  import InvoicerModal from '../components/InvoicerModal.svelte';
  import LineItemModal from '../components/LineItemModal.svelte';
  import InvoiceDirtyModal from '../components/InvoiceDirtyModal.svelte';
  import { displayRecipientModal } from '../stores.js';
  import { displayInvoiceModal } from '../stores.js';
  import { displayLineItemModal } from '../stores.js';
  import { displayInvoiceDirtyModal } from '../stores.js';
  import { user } from '../stores.js';
  import { recipients } from '../stores.js';
  import { isInvoiceDirty } from '../stores.js';
  import { uuid } from 'uuidv4';
  import { getInvoiceFromStore, getEmptyInvoice, getEmptyLineItem } from '../util/util.js';
  import { push } from 'svelte-spa-router';
  import { createPdf } from '../util/pdf.js';
  import moment from 'moment';

  // for route params
  export let params = {}
 
  let currentInvoice = null;
  let currentLineItem = null;

  onMount(async () => {
    currentInvoice = params.invoiceId ? getInvoiceFromStore(params.invoiceId) : getEmptyInvoice();
    if (!$recipients.length) UIFacade.getRecipients(); 
    if (!currentInvoice.invoiceNumber) currentInvoice.invoiceNumber = await UIFacade.getMaxInvoiceNumber();
    // if this is a new invoice, set it dirty right away
    if (!params.invoiceId) setInvoiceDirty();
  });

  // computed properties
  $: if (currentInvoice) currentInvoice.total = currentInvoice ? 
    currentInvoice.lineItems.reduce((accumulator, lineItem) => accumulator + (lineItem.qty * lineItem.price), 0).toFixed(2) :
    '';
  $: recipientAddress = currentInvoice && currentInvoice.recipient.address ? 
    `${currentInvoice.recipient.address}<br>${currentInvoice.recipient.city}, ${currentInvoice.recipient.stateprov} ${currentInvoice.recipient.postal}` :
    ``;
  $: invoicerAddress = $user.company ?        
    `${$user.company}<br>${$user.address}<br>${$user.city}, ${$user.stateprov} ${$user.postal}<br>` : 
    `Click icon to add your company info`;
  $: companyLogoURI = $user.logoUrl ? $user.logoUrl : 'logoPlaceholder.jpg';
  $: invoicerClone = {...$user};

  // functions
  const setInvoiceDirty = () => isInvoiceDirty.set(true);
  const setInvoiceNotDirty = () => isInvoiceDirty.set(false);
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
    currentInvoice.lineItems = currentInvoice.lineItems.filter(lineItem => lineItem.lineItemId !== lineItemToDelete.lineItemId);
    setInvoiceDirty();
  }
  const updateInvoicer = (event) => UIFacade.updateInvoicer(event.detail);
  const save = () => {
    // if due date has been changed
    const dueDate = moment(currentInvoice.due);
    currentInvoice.dueYear = dueDate.format('YYYY');
    currentInvoice.dueMonth = dueDate.format('MM');
    UIFacade.upsertInvoice(currentInvoice);
    setInvoiceNotDirty();
  }
  const markPaid = () => {
    currentInvoice.paid = true;
    UIFacade.upsertInvoice(currentInvoice);
  }
  const print = () => createPdf(currentInvoice);
  const handleLogo = (event) => { if (event.target.files) UIFacade.uploadLogo(event.target.files[0]); }
  const navigateWithDirtyCheck = () => $isInvoiceDirty ? displayInvoiceDirtyModal.set(true) : push('#/invoices');
  const cancelNavigation = (event) => { if (!event.detail) push('#/invoices') };
</script>

{#if currentInvoice}
  <div class='container'>
    <div class='row'>
      <div class="col">
        <div class="btn btn-outline-secondary btn-spacing" on:click={navigateWithDirtyCheck}>
         <i class="fas fa-arrow-left"></i> Invoices
        </div>
      </div>
    </div>
    <div class='card' class:centered-img="{currentInvoice.paid}">
      <div class='card-body'>
        <div class='container d-flex flex-column'>
          <div class='d-flex justify-content-between align-items-top'>
            <div class='d-flex align-items-center justify-content-between'>
              <div style='position: relative;'>
                <img src={companyLogoURI} width='125px' alt='company logo'>
                <div class='clip-upload' style='position: absolute; right: -25px; top: -10px;'>
                  <label for="file-input">
                    <i class="fas fa-file-upload"></i>
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
              </div>
              <div class='ml-4'>
                <h3>
                  {$user.company || ''} 
                </h3>
              </div>            
            </div>
            <div class='text-right' style='position:relative;'>
              <div on:click={showInvoicerModal} style='position: absolute; right: -25px; top: -10px;'>
                <i class="fas fa-user-edit"></i>
              </div>
              {@html invoicerAddress}
            </div>
          </div>
          <div class='mt-4'>
            <h3>Invoice</h3>
          </div>
          <div>
            <hr>
          </div>
          <div class='d-flex justify-content-between'>
            <div>
              Invoice Number: <strong>{currentInvoice.invoiceNumber}</strong><br>
              Invoice Date: <input type='date' bind:value={currentInvoice.created} on:change={setInvoiceDirty} class='form-control-sm'><br>
              Balance Due: ${currentInvoice.total}<br>
              Due Date: <input type='date' bind:value={currentInvoice.due} on:change={setInvoiceDirty} class='form-control-sm'>
            </div>
            <div style='position: relative;'>
              <div on:click={showRecipientModal} style='position: absolute; right: -25px; top: -10px;'>
                <i class="fas fa-user-plus"></i>
              </div>
              <select 
                bind:value={currentInvoice.recipient} 
                on:change={setInvoiceDirty} 
                class='form-control-sm'>
                <option value=''>Select Recipient</option>
                {#each $recipients as recipient}
                  <option 
                    value={recipient}
                    selected={currentInvoice.recipient.recipientId === recipient.recipientId}>
                    {recipient.company}
                  </option>
                {/each}
              </select>
              <br>
              {@html recipientAddress}
            </div>
          </div>
          <div>
            <hr>
          </div>
          <div class='mt-4'>
            <table class='table'>
              <thead>
                <tr class='border-top-hide'>
                  <th>Item</th>
                  <th class='text-right'>Unit Price</th>
                  <th class='text-right'>Quantity</th>
                  <th class='text-right'>Line Total</th>
                </tr>
              </thead>
              <tbody>
                {#each currentInvoice.lineItems as lineItem, i (lineItem.lineItemId)}
                  <tr on:click={event => showLineItemModal(lineItem)} >
                    <td>{lineItem.desc}</td> 
                    <td class='text-right'>${lineItem.price}</td> 
                    <td class='text-right'>{lineItem.qty}</td>
                    <td class='text-right'>${lineItem.total}</td>
                  </tr>
                {/each}
                <tr class='border-bottom-hide'>
                  <td></td>
                  <td></td>
                  <td class='text-right'>Total</td>
                  <td class='text-right'>{currentInvoice.total}</td>
                </tr>
                <tr>
                  <td colspan='4'>
                    <div class='btn btn-secondary btn-sm btn-outline' on:click={event => showLineItemModal(null)}>Add Item</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class='d-flex justify-content-start mt-2'>
      <div class='btn btn-outline-secondary' on:click={print}>
        Print PDF
      </div>
      <div class="btn btn-outline-secondary ml-2" on:click={markPaid}>
        Mark Paid
      </div>
      <div class="btn btn-primary ml-2" on:click={save}>
        Save Invoice
      </div>
    </div>
  </div>
{/if}
<RecipientModal invoice={currentInvoice}></RecipientModal>
<InvoicerModal invoicer={invoicerClone} on:updateInvoicer={updateInvoicer}></InvoicerModal>
<LineItemModal 
  on:updateLineItem={updateLineItem} 
  on:deleteLineItem={deleteLineItem} 
  lineItem={currentLineItem}>
</LineItemModal>
<InvoiceDirtyModal on:cancelNavigation={cancelNavigation}></InvoiceDirtyModal>

<style>

  .btn-spacing {
    margin-bottom: 1rem;
  }

  .centered-img {
    background-image: url('/paid.png');
    background-repeat: no-repeat;
    background-position: center;
  }

  .border-top-hide {
    border-top: hidden;
  }

  .border-bottom-hide {
    border-bottom: hidden;
  }

  .hide {
    display: none;
  }
</style>

