<script>
	import Router from  'svelte-spa-router';
	import routes from './routes.js';
	import Auth from './auth/auth.js';
	import Nav from './components/Nav.svelte';
	import Overlay from './components/Overlay.svelte';
	import Toast from './components/Toast.svelte';
	import { user } from './stores.js';
	import { loading } from './stores.js';
	import { onMount } from 'svelte';

	// TODO remove, temp for dev work
	// user.set({
	// 	isAuthenticated: true,
	// 	userId: '1234',
	// 	accessToken: 111111,
	// 	recipientId: '1234',
	// 	company: 'Sierra Golf Software',
	// 	address: '9169 Coral Sea St',
	// 	city: 'Blaine',
	// 	stateprov: 'MN',
	// 	postal: '55449',
	// 	phone: '763-218-2571',
	// 	email: 'steve@steveglasser.com',
	// 	logoUrl: 'https://simple-invoice-user-logo-dev.s3.us-east-2.amazonaws.com/1234'
	// });
	let toast;
	// handle auth if access_token from Auth0 in url hash and navigate to home 
	const locationHash = window.location.hash;
	if (/access_token|id_token|error/.test(locationHash)) Auth.handleAuthentication(locationHash);
	
	const login = () => Auth.login();
</script>

{#if $loading}
  <Overlay></Overlay>
{/if}
{#if $user.isAuthenticated}
  <Toast></Toast>
  <Nav></Nav>
  <div class='app container mx-auto'>
    <Router {routes}/>
  </div>
{:else}
	<Nav></Nav>
	<h1 class='text-center mt-5'>Invoicing Made Simple</h1>
	<div class='container mx-auto w-100 mt-5 text-center'>
		<button class='btn btn-primary btn-lg' on:click={login}>Sign In</button>
	</div>
{/if}

<style>
	.app {
		margin: 2em;
	}
  :global(.required-field::after) {
    content: "*";
    color: red;
  }
</style>
