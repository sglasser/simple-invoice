  <script>
    import {
      Button, 
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      Input,
      FormGroup,
      Form
    } from "sveltestrap";
    import { displayInvoiceModal } from '../stores.js';
    import { createEventDispatcher } from "svelte";
    import { user } from '../stores.js';

    const dispatch = createEventDispatcher();

    const save = () =>  {
      dispatch("updateInvoicer", $user);
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
              bind:value={$user.company}
              placeholder="Company Name" 
              class='form-control form-control-sm'
              name='company'
              required
            />
          </div>
          <div class='form-group'>
            <input
              bind:value={$user.address}
              placeholder="Company Address" 
              class='form-control form-control-sm'
              name='address'
              type='text'
              required
            />
          </div>
          <div class='form-group'>
            <input
              bind:value={$user.city}
              placeholder="Company City" 
              class='form-control form-control-sm'
              name='city'
              type='text'
              required
            />
          </div>
          <div class='form-group'>
            <input
              bind:value={$user.stateprov}
              placeholder="Company State/Province" 
              class='form-control form-control-sm'
              name='state'
              type='text'
              required
            />
          </div>
          <div class='form-group'>
            <input
              bind:value={$user.postal}
              placeholder="Company Postal" 
              class='form-control form-control-sm'
              name='postal'
              type='text'
              required
            />
          </div>
      </ModalBody>
      <ModalFooter>
        <button type='submit' class='btn btn-primary'>
          Save
        </button>
        <button 
          class='btn btn-secondary' 
          on:click={toggle}>
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  </form>