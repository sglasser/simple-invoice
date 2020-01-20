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
    import { displayRecipientModal } from '../stores.js';
    import { user } from '../stores.js';
    import facade from '../facade.js';

    let recipient = {}

    const save = () => facade.createRecipient(recipient) ? toggle() : false;
    const toggle = () => (displayRecipientModal.set(false));
  </script>
  
  <Modal isOpen={$displayRecipientModal} {toggle}>
    <ModalHeader {toggle}>Recipient Info</ModalHeader>
    <ModalBody>
      <FormGroup>
        <Input
          bind:value={recipient.company}
          placeholder="Recipient Name" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.address}
          placeholder="Recipient Address" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.city}
          placeholder="Recipient City" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.stateprov}
          placeholder="Recipient State/Province" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.postal}
          placeholder="Recipient Postal" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.phone}
          placeholder="Recipient Phone" 
          class='form-control-sm'
        />
      </FormGroup>
      <FormGroup>
        <Input
          bind:value={recipient.email}
          placeholder="Recipient Email" 
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