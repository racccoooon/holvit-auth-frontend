<template>
  <Grant :scopes="data.scopes" :client-name="data.clientName" :user="data.user"/>
</template>

<script setup>
import Grant from "./Grant.vue";

defineProps({
  data: {
    type: Object,
    required: true,
  }
});

</script>

<style scoped>

</style>