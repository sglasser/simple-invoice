<script>
  import { user } from '../stores.js';
  import {
    Button, Modal, ModalBody, ModalFooter, ModalHeader
  } from "sveltestrap";

  let open = false;
  const toggle = () => (open = !open);

  let invoice = {
    
  }

  function createInvoice() {


  }

</script>

<div>
  <Button color="danger" on:click={toggle}>
    Open Modal
  </Button>

</div>