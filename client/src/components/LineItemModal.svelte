    <script>
    import {
      Button, 
      Modal,
      ModalBody,
      ModalFooter,
      ModalHeader,
      Input,
      FormGroup
    } from "sveltestrap";
    import { displayLineItemModal } from '../stores.js';
    import facade from '../facade.js';

    export let lineItem = {}

    const save = () => toggle();
    const toggle = () => (displayLineItemModal.set(false));
  </script>
  
  <Modal isOpen={$displayLineItemModal} {toggle}>
    <ModalHeader {toggle}>Line Item</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Input
          bind:value={lineItem.qty}
          placeholder="Quantity" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={lineItem.desc}
          placeholder="Description" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={lineItem.price}
          placeholder="Price" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={lineItem.total}
          placeholder="Total" 
          class='form-control-sm'
        />
      </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" on:click={save}>
        Save
      </Button>
      <Button color="secondary" on:click={toggle}>
        Cancel
      </Button>
    </ModalFooter>
  </Modal>