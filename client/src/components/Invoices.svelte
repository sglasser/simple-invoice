<script>
    import {
    Button,
    CustomInput,
    FormGroup,
    Label,
    Table,
    Card,
    CardHeader,
    CardTitle,
    CardBody
  } from "sveltestrap";
  import { invoices } from '../stores.js';
  import { push } from 'svelte-spa-router';

  const navigateToInvoice = () => (push('/invoice'));
</script>

<Card>
  <CardHeader class='d-flex flex-row justify-content-between align-items-center'>
    <h3>INVOICES</h3> 
    <FormGroup>
      <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
        <option value="">Status</option>
        <option>All</option>
        <option>Paid</option>
        <option>Unpaid</option>
      </CustomInput>
    </FormGroup>
    <FormGroup>
      <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
        <option value="">Year Created</option>
        <option>2020</option>
        <option>2019</option>
        <option>2018</option>
      </CustomInput>
    </FormGroup>
    <FormGroup>
      <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
        <option value="">Month Created</option>
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </CustomInput>
    </FormGroup>
    <Button outline primary on:click={navigateToInvoice}>Create Invoice</Button>
  </CardHeader>
  <CardBody>
    <Table>
      <thead>
        <tr>
          <th>Invoice Num</th>
          <th>Recipient</th>
          <th>Amount</th>
          <th>Created</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {#each $invoices as invoice, i}
          <tr>
            <td>{invoice.invoiceNumber}</td>
            <td>{invoice.recipient.name}</td> 
            <td>{invoice.total}</td> 
            <td>{invoice.created}</td>
            <td>{invoice.due}</td>  
          </tr>
        {/each}
      </tbody>
    </Table>
  </CardBody>
</Card>