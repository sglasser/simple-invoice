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
    import { displayInvoiceDirtyModal } from '../stores.js';
    import { createEventDispatcher } from "svelte";
    import { user } from '../stores.js';
    import facade from '../facade.js';

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
      <Button color='danger' on:click={() => cancelNavigation(false)}>
        Yes
      </Button>
      <Button color="primary" on:click={() => cancelNavigation(true)}>
        No
      </Button>
    </ModalFooter>
  </Modal>