<script>
	import Router from  'svelte-spa-router';
	import routes from './routes.js';
	import Auth from './auth/auth.js';
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
	import Overlay from './components/Overlay.svelte';
	import Toast from './components/Toast.svelte';
	import { user } from './stores.js';
	import { loading } from './stores.js';
	import { onMount } from 'svelte';

	// TODO remove, temp for dev work
	// https://flaviocopes.com/svelte-export-from-component/
	user.set({
		isAuthenticated: true,
		userId: '1234',
		accessToken: 111111,
		recipientId: '1234',
		company: 'Sierra Golf Software',
		address: '9169 Coral Sea St',
		city: 'Blaine',
		state: 'MN',
		postal: '55449',
		phone: '763-218-2571',
		email: 'steve@steveglasser.com',
		recipients: [
			
		]
	});
	let toast;
	// handle auth if access_token from Auth0 in url hash and navigate to home 
	const locationHash = window.location.hash;
	if (/access_token|id_token|error/.test(locationHash)) {
		Auth.handleAuthentication(locationHash);
	}

	onMount(() => {
		toast.show('success', 3000, 'Saved', 'Your request was saved')
	})
	
	function login () {
		Auth.login();
	}
</script>


	{#if $loading}
		<Overlay></Overlay>
	{/if}
	{#if $user.isAuthenticated}
		<Toast></Toast>
		<Nav></Nav>
		<div class='app'>
			<Router {routes}/>
		</div>
		<!-- <Footer></Footer> -->
	{:else}
		Please log in <button on:click={login}>Login In</button>
	{/if}

<style>
	.app {
		margin: 2em;
		height: 100%;
	}
</style>
