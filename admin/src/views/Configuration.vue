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
  <PageHeader title="Configuration" sub-title="Here you can configure your realm">
  </PageHeader>
</template>

<style scoped>

</style>