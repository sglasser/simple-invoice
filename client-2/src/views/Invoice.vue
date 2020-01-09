<template>
  <div>
    <b-button variant="outline-primary" @click="createInvoice">Create Invoice</b-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { createInvoice } from "../services/api/invoice-api";

@Component({})
export default class Invoice extends Vue {
  async createInvoice() {
    // const result = createInvoice()
  }
}
</script>