<script>
  import Auth from '../auth/auth.js';
  import {authConfig} from '../../config.js';

  const login = (event) => {
    Auth.login();
  }
</script>

Here is the dashboard

<button on:click={login}>Login In</button>

