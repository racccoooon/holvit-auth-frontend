<template>
  <Grant :scopes="data.scopes" :client-name="data.client_name" :user="data.user" :token="data.token" :urls="urls"/>
</template>

<script setup>
import Grant from "./Grant.vue";
import {computed} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
});

const urls = computed(() => ({
  grant: props.data.grant_url,
  refuse: props.data.refuse_url,
  logout: props.data.logout_url,
}))

</script>

<style scoped>

</style>