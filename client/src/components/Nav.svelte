<script>
  import { user } from '../stores.js';
  import Auth from '../auth/auth.js';

  const logout = () => Auth.logout();
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
    <img src='/logo.png' width='130px' alt='Simple Invoice logo'/>
  </a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    </ul>
    <form class="form-inline my-2 my-lg-0">
      {#if $user.isAuthenticated}
        <button class="btn btn-outline-success my-2 my-sm-0" on:click={logout}>Sign Out</button>
      {/if}
    </form>
  </div>
</nav>