<script setup>
import {PageHeader} from "holvit-components";

const props = defineProps({
  realmId: {
    type: String,
    required: true,
  }
});

</script>

<template>
  <PageHeader title="Clients" sub-title="Here you can manage all your clients">
  </PageHeader>
</template>

<style scoped>

</style>