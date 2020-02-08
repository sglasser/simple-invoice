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

	let toast;
	let isAuthenticating = false;

	onMount(async () => {
		const locationHash = window.location.hash;
		if (/access_token|id_token|error/.test(locationHash)) {
			isAuthenticating = true;
			await Auth.handleAuthentication(locationHash);
			isAuthenticating = false;
		}
	});

	const login = () => Auth.login();
</script>

{#if $loading}
  <Overlay></Overlay>
{/if}
<Toast></Toast>
<Nav></Nav>
{#if $user.isAuthenticated && !isAuthenticating}
  <div class='app container mx-auto'>
    <Router {routes}/>
  </div>
{:else if !$user.isAuthenticated && !isAuthenticating}
	<h1 class='text-center mt-5'>Invoicing Made Simple</h1>
	<div class='container mx-auto w-100 mt-5 text-center'>
		<button class='btn btn-primary btn-lg' on:click={login}>Sign In</button>
	</div>
{:else} 
	<div class='container mx-auto w-100 mt-5 text-center'>
		Loading Account...
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
