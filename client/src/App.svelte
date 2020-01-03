<script>
	import Router from  'svelte-spa-router';
	import routes from './routes.js';
	import Auth from './auth/auth.js';
	import Nav from './components/Nav.svelte';
	import Footer from './components/Footer.svelte';
	import { push } from 'svelte-spa-router';

	// handle auth if access_token from Auth0 in url hash and navigate to home 
	const locationHash = window.location.hash;
	if (/access_token|id_token|error/.test(locationHash)) {
		Auth.handleAuthentication(locationHash);
		push('/');
  }
</script>

<Nav></Nav>
<div class='app'>
	<Router {routes}/>
</div>
<Footer></Footer>

<style>
	.app {
		margin: 2em;
		height: 100%;
	}
</style>
