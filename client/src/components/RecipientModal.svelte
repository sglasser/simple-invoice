<script>
  import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from "sveltestrap";
  import { displayRecipientModal } from '../stores.js';
  import { user } from '../stores.js';
  import UIFacade from '../ui-facade.js';

  let recipient = {}

  const save = () => UIFacade.createRecipient(recipient) ? toggle() : false;
  const toggle = () => (displayRecipientModal.set(false));
</script>

<form on:submit|preventDefault='{save}'>
  <Modal isOpen={$displayRecipientModal} {toggle}>
    <ModalHeader {toggle}>Recipient Info</ModalHeader>
    <ModalBody>
      <div class='form-group'>
        <input
          bind:value={recipient.company}
          placeholder="Recipient Name (required)" 
          class='form-control-sm form-control'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={recipient.address}
          placeholder="Recipient Address (required)" 
          class='form-control-sm form-control'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={recipient.city}
          placeholder="Recipient City (required)" 
          class='form-control-sm form-control'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={recipient.stateprov}
          placeholder="Recipient State/Province (required)" 
          class='form-control-sm form-control'
          type='text'
          required
        />
      </div>
      <div class='form-group'>
        <input
          bind:value={recipient.postal}
          placeholder="Recipient Postal (required)" 
          class='form-control-sm form-control'
          type='text'
          required
        />
      </div>
    </ModalBody>
    <ModalFooter>
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