<script>
	import Router from  'svelte-spa-router';
	import routes from './routes.js';
	import Auth from './auth/auth.js';
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
	import Overlay from './components/Overlay.svelte';
	import Toast from './components/Toast.svelte';
	import { auth } from './stores.js';
	import { loading } from './stores.js';
	import { onMount } from 'svelte';

	auth.set({
		isAuthenticated: true,
		userId: 987654321,
		accessToken: 111111
	});
		
	// handle auth if access_token from Auth0 in url hash and navigate to home 
	const locationHash = window.location.hash;
	if (/access_token|id_token|error/.test(locationHash)) {
		Auth.handleAuthentication(locationHash);
	}
	
	function login () {
		Auth.login();
	}
</script>

{#if $loading}
	<!-- <Overlay></Overlay> -->
{/if}
{#if $auth.isAuthenticated}
	<Toast></Toast>
	<Nav></Nav>
	<div class='app'>
		<Router {routes}/>
	</div>
	<Footer></Footer>
{:else}
	Please log in <button on:click={login}>Login In</button>
{/if}

<style>
	.app {
		margin: 2em;
		height: 100%;
	}
</style>
