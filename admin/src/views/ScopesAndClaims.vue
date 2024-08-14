<script setup>
import {PageHeader} from "holvit-components";

const props = defineProps({
  realmName: {
    type: String,
    required: true,
  }
});

</script>

<template>
  <PageHeader title="Scopes and Claims" sub-title="Here you can manage scopes and claims">
  </PageHeader>
</template>

<style scoped>

</style>