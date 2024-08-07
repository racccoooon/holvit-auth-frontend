<template>
  <Grant :scopes="data.scopes" :client-name="data.clientName" :user="data.user" :token="data.token" :urls="urls"/>
</template>

<script setup>
import Grant from "./Grant.vue";
import {computed} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const urls = computed(() => ({
  grant: props.data.grantUrl,
  refuse: props.data.refuseUrl,
  logout: props.data.logoutUrl,
}))

</script>

<style scoped>

</style>