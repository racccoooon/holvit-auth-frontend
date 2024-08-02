<script setup>

import Device from "./Device.vue";
import Password from "./Password.vue";
import Totp from "./Totp.vue";
import {computed, ref} from "vue";
import {get, set} from "@vueuse/core";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const stage = ref('password')
const loginResponse = ref(null)

const advance = (response) => {

  switch (stage.value) {
    case 'password':
      set(loginResponse, response)
        
      if (get(loginResponse).require_totp) {
        stage.value = 'totp'
      } else {
        stage.value = 'submit'
      }

      break

    case 'totp':
      if (loginResponse.value.new_device) {
        stage.value = 'device'
      } else {
        stage.value = 'submit'
      }
      
      break

    case 'device':
      stage.value = 'submit'
      break

    case 'submit':
      final_submit()
      break
  }
}

const final_submit = () => {
  alert('submitting')
}

const urls = computed(() => ({
  register: props.data.register_url,
}))

</script>

<template>
  <Password v-if="stage === 'password'" @success="advance" :token="data.token" :urls="urls" :show-remember-me="data.use_remember_me"/>
  <Totp v-if="stage === 'totp'" @success="advance" :urls="urls"/>
  <Device v-if="stage === 'device'" @success="advance" :token="data.token" :urls="urls"/>
</template>

<style scoped>

</style>