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
  import { createEventDispatcher } from "svelte";
  import { displayLineItemModal } from "../stores.js";
  import facade from "../facade.js";

  export let lineItem = {};

  const dispatch = createEventDispatcher();

  $: total = lineItem ? (lineItem.qty * lineItem.price).toFixed(2) : 0;

  const save = () => {
    lineItem.total = total;
    dispatch("updateLineItem", lineItem);
    toggle();
  };

  const del = () => {
    dispatch("deleteLineItem", lineItem);
    toggle();
  }

  const updateTotal = () => (lineItem.total = (lineItem.qty * lineItem.price).toFixed(2));
  
  const toggle = () => displayLineItemModal.set(false);
</script>

<Modal isOpen={$displayLineItemModal} {toggle}>
  <ModalHeader {toggle}>Line Item</ModalHeader>
  <ModalBody>
    <FormGroup>
      <Input
        bind:value={lineItem.qty}
        placeholder="Quantity"
        class="form-control-sm" />
    </FormGroup>
    <FormGroup>
      <Input
        bind:value={lineItem.desc}
        placeholder="Description"
        class="form-control-sm" />
    </FormGroup>
    <FormGroup>
      <Input
        bind:value={lineItem.price}
        placeholder="Price"
        class="form-control-sm" />
    </FormGroup>
    <FormGroup>
      <Input
        readonly
        bind:value={total}
        placeholder="Total"
        class="form-control-sm" />
    </FormGroup>
  </ModalBody>
  <ModalFooter>
    {#if lineItem.lineItemId}
      <Button color='danger' outline class='justify-start' on:click={del} style='margin-right:auto;'>Delete</Button>
    {/if}
    <Button color="primary" outline on:click={save}>Save</Button>
    <Button color="secondary" outline on:click={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>


