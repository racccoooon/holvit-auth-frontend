<script setup>

import UsernamePassword from "./UsernamePassword.vue";
import Totp from "./Totp.vue";
import {computed, ref} from "vue";

const flow = ['username-password', 'totp']

const flow_pos = ref(0);

const stage = computed(() => flow[flow_pos.value]);

const advance = () => {
  if (flow_pos.value < flow.length - 1) {
    flow_pos.value++;
  } else {
    final_submit();
  }
}

const final_submit = () => {
  alert('submitting');
}

</script>

<template>
  <UsernamePassword v-if="stage === 'username-password'" @success="advance"/>
  <Totp v-if="stage === 'totp'" @success="advance"/>
</template>

<style scoped>

</style>