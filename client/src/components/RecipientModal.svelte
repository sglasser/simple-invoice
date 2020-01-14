  <script>
    import {
      Button, 
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader
    } from "sveltestrap";
    import { displayRecipientModal } from '../stores.js';

    export let invoice;

    const toggle = () => (displayRecipientModal.set(false));
  </script>
  
  <Modal isOpen={$displayRecipientModal} {toggle}>
    <ModalHeader {toggle}>Add Recipient</ModalHeader>
    <ModalBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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