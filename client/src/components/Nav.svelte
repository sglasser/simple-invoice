<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button
  } from 'sveltestrap';
  import { push } from 'svelte-spa-router';

  let isOpen = false;

  function navigateToInvoice() {
    push('/invoice');
  }
  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">
    <img src='/logo.png' width='130px'/>
  </NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="#components/">Settings</NavLink>
      </NavItem>
      <NavItem>
          <Button outline primary on:click={navigateToInvoice}>Create Invoice</Button>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>