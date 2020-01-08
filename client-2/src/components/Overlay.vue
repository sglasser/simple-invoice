<template>
  <div class="d-flex justify-content-center align-items-center overlay" v-if='loading'>
    <div>
        Loading....
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { getters } from '../services/store/store';

  @Component
  export default class Overlay extends Vue {
    get loading() {
      return getters.loading();
    }
  }
 
</script>

<style scoped>
  .overlay {
    position: fixed; /* Sit on top of the page content */
    display: block; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }
</style>
