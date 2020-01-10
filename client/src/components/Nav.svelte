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
  import { auth } from '../stores.js';
  import Auth from '../auth/auth.js';

  $: loginBtnText = $auth.isAuthenticated ? 'Sign Out' : 'Sign In';
  $: loginBtnAction = $auth.isAuthenticated ? login : logout;
  let isOpen = false;

  const login = () => Auth.login();
  const logout = () => Auth.logout();
  const handleUpdate = (event) => event.detail.isOpen;
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">
    <img src='/logo.png' width='130px' alt='Simple Invoice logo'/>
  </NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
      <NavItem>
        <NavLink href="#components/">Settings</NavLink>
      </NavItem>
      <NavItem>
        <Button outline primary on:click={loginBtnAction}>{loginBtnText}</Button>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>