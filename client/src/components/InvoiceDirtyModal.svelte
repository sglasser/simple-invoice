  <script>
    import {
      Button, 
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
    } from "sveltestrap";
    import { displayInvoiceDirtyModal } from '../stores.js';
    import { createEventDispatcher } from "svelte";
    import { user } from '../stores.js';

    const dispatch = createEventDispatcher();

    const cancelNavigation = (cancelNavigation) =>  {
      dispatch("cancelNavigation", cancelNavigation);
      toggle();
    }
    const toggle = () => (displayInvoiceDirtyModal.set(false));
  </script>
  
  <Modal isOpen={$displayInvoiceDirtyModal} {toggle}>
    <ModalHeader {toggle}>Changes Made to Invoice</ModalHeader>
    <ModalBody>
        Changes have been made to this invoice. Do you want to navigate away without saving changes?
    </ModalBody>
    <ModalFooter>
      <div class='btn btn-danger' on:click={() => cancelNavigation(false)}>
        Yes
      </div>
      <div class='btn btn-primary' on:click={() => cancelNavigation(true)}>
        No
      </div>
    </ModalFooter>
  </Modal>