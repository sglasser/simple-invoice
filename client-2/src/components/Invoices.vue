<template>
    <div>Hello</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Invoices extends Vue {
  @Prop() private msg!: string;
}
</script>