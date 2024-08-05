<script setup>

import Device from "./Device.vue";
import Password from "./Password.vue";
import Totp from "./Totp.vue";
import {computed, ref} from "vue";
import ResetPassword from "./ResetPassword.vue";
import VerifyEmail from "./VerifyEmail.vue";
import TotpOnboarding from "./TotpOnboarding.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const stage = ref('verify_password')

const advance = (response) => {

  stage.value = response.next_step

  if (stage.value === 'submit') {
     final_submit()
  }
}

const final_submit = () => {
  const form = document.createElement('form');

  form.method = 'POST';
  //TODO: get from urls
  form.action = import.meta.env.VITE_HOLVIT_API_BASE_URL + '/api/auth/login';

  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'token';
  tokenInput.value = props.data.token;
  form.appendChild(tokenInput);

  document.body.appendChild(form);

  form.submit();
}

const urls = computed(() => ({
  register: props.data.register_url,
}))

</script>

<template>
  <Password v-if="stage === 'verify_password'" @success="advance" :token="data.token" :urls="urls"
            :show-remember-me="data.use_remember_me"/>
  <ResetPassword v-if="stage === 'reset_password'" @success="advance" :token="data.token" :urls="urls"/>
  <VerifyEmail v-if="stage === 'verify_email'" :token="data.token" :urls="urls"/>
  <TotpOnboarding v-if="stage === 'totp_onboarding'" @success="advance" :token="data.token" :urls="urls"/>
  <Totp v-if="stage === 'verify_totp'" @success="advance" :urls="urls"/>
  <Device v-if="stage === 'verify_device'" @success="advance" :token="data.token" :urls="urls"/>
</template>

<style scoped>

</style>