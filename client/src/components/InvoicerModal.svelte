<script>
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from "sveltestrap";
  import { displayInvoiceModal } from '../stores.js';
  import { 
    createEventDispatcher,
    onMount
  } from "svelte";
  import { user } from '../stores.js';

  const dispatch = createEventDispatcher();
  export let invoicer;

  const save = () =>  {
    dispatch("updateInvoicer", invoicer);
    toggle();
  }
  const toggle = () => (displayInvoiceModal.set(false));
</script>
<form on:submit|preventDefault={save}>
  <Modal isOpen={$displayInvoiceModal} {toggle}>
    <ModalHeader {toggle}>My Company Info</ModalHeader>
    <ModalBody>
      <div class='form-group'>
        <input
          bind:value={invoicer.company}
          placeholder="Company Name (required)" 
          class='form-control form-control-sm'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={invoicer.address}
          placeholder="Company Address (required)" 
          class='form-control form-control-sm'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={invoicer.city}
          placeholder="Company City (required)" 
          class='form-control form-control-sm'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={invoicer.stateprov}
          placeholder="Company State/Province (required)" 
          class='form-control form-control-sm'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={invoicer.postal}
          placeholder="Company Postal (required)" 
          class='form-control form-control-sm'
          name='postal'
          required
        />
      </div>
    </ModalBody>
    <ModalFooter>
      <button 
        class='btn btn-secondary' 
        on:click|preventDefault={toggle}>
        Cancel
      </button>
      <button 
        type='submit' 
        class='btn btn-primary'>
        Save
      </button>
    </ModalFooter>
  </Modal>
</form>