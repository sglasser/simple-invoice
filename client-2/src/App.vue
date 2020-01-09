<template>
  <div id="app">
    <div v-if="auth">
      <Overlay></Overlay>
      <Nav></Nav>
      <router-view class='container'></router-view>
    </div>
    <div v-else>
      <b-button variant="outline-primary" @click="login">Login</b-button>
    </div>
  </div>
</template>
<script lang='ts'>
  import { Component, Vue } from "vue-property-decorator";
  import Overlay from "@/components/Overlay.vue";
  import Nav from "@/components/Nav.vue";
  import Auth from "./services/auth/auth";
  import { getters } from "./services/store/store";

  @Component({
    components: {
      Overlay,
      Nav
    },
    computed: {
      ...getters
    }
  })
  export default class App extends Vue {
    mounted () {
      const locationHash = window.location.hash;
	    if (/access_token|id_token|error/.test(locationHash)) {
		    Auth.handleAuthentication(locationHash);
	    } 
    }

    login () {
      Auth.login();
    }
  }
</script>

<style>
	#app {
		height: 100%;
	}
  .container {
    margin: 1rem;
  }
</style>