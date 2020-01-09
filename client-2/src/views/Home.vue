<template>
  <div>
    <Dashboard></Dashboard>
    
  </div>

</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Dashboard from "@/components/Dashboard.vue"; // @ is an alias to /src
import Invoices from "@/components/Invoices.vue";

@Component({
  components: {
    Dashboard
  }
})
export default class Home extends Vue {}
</script>
