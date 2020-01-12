  <script>
    import {
      Button, 
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
    } from "sveltestrap";
    import { showInvoiceModal } from '../stores.js';

    export let invoice;
    
    const toggle = () => (showInvoiceModal.set(false));
  </script>
  
  <Modal isOpen={$showInvoiceModal} {toggle}>
    <ModalHeader {toggle}>Add Recipient</ModalHeader>
    <ModalBody>
  
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={toggle}>
        Save
      </Button>
      <Button color="secondary" on:click={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>