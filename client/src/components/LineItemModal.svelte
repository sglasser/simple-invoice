<script>
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from "sveltestrap";
  import { createEventDispatcher } from "svelte";
  import { displayLineItemModal } from "../stores.js";

  export let lineItem = {};
  const dispatch = createEventDispatcher();

  $: total = lineItem ? (lineItem.qty * lineItem.price).toFixed(2) : 0;

  const save = () => {
    lineItem.total = total;
    dispatch("updateLineItem", lineItem);
    toggle();
  };
  const del = () => {
    dispatch("deleteLineItem", lineItem);
    toggle();
  }
  const updateTotal = () => (lineItem.total = (lineItem.qty * lineItem.price).toFixed(2));
  const toggle = () => displayLineItemModal.set(false);
</script>
<form on:submit|preventDefault={save}>
  <Modal isOpen={$displayLineItemModal} {toggle}>
    <ModalHeader {toggle}>Line Item</ModalHeader>
    <ModalBody>
      <div class='form-group'>
        <input
          bind:value={lineItem.qty}
          placeholder="Quantity (required)"
          class="form-control form-control-sm" 
          type='number'
          required/>
      </div>
      <div class='form-group'>
        <input
          bind:value={lineItem.desc}
          placeholder="Description (required)"
          class="form-control form-control-sm" 
          type='text'
          required/>
      </div>
      <div class='form-group'>
        <input
          bind:value={lineItem.price}
          placeholder="Price (required)"
          class="form-control form-control-sm"
          type='number'
          required />
      </div>
      <div class='form-group'>
        <input
          readonly
          bind:value={total}
          placeholder="Total"
          class="form-control form-control-sm" 
          type='number'
          required/>
      </div>
    </ModalBody>
    <ModalFooter>
      {#if lineItem.lineItemId}
        <button 
          class='btn btn-danger btn-outline ustify-start' 
          on:click|preventDefault={del} 
          style='margin-right:auto;'>
          Delete
        </button>
      {/if}
      <button 
        class='btn btn-primary' 
        type='submit'>
          Save
        </button>
      <button 
        class='btn btn-secondary' 
        on:click|preventDefault={toggle}>
          Cancel
        </button>
    </ModalFooter>
  </Modal>
</form>


