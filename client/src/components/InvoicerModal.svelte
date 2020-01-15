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
    import { user } from '../stores.js';
    import facade from '../facade.js';

    const save = () => facade.updateUser($user) ? toggle() : false;
    const toggle = () => (displayInvoiceModal.set(false));
  </script>
  
  <Modal isOpen={$displayInvoiceModal} {toggle}>
    <ModalHeader {toggle}>My Company Info</ModalHeader>
    <ModalBody>
      <Form>
        <FormGroup>
          <Input
            bind:value={$user.company}
            placeholder="Company Name" 
            class='form-control-sm'
          />
        </FormGroup>
        <FormGroup>
          <Input
            bind:value={$user.address}
            placeholder="Company Address" 
            class='form-control-sm'
          />
        </FormGroup>
        <FormGroup>
          <Input
            bind:value={$user.city}
            placeholder="Company City" 
            class='form-control-sm'
          />
        </FormGroup>
        <FormGroup>
          <Input
            bind:value={$user.state}
            placeholder="Company State/Province" 
            class='form-control-sm'
          />
        </FormGroup>
        <FormGroup>
          <Input
            bind:value={$user.postal}
            placeholder="Company Postal" 
            class='form-control-sm'
          />
        </FormGroup>
      </Form>
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