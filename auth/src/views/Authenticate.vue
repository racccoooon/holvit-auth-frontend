<script setup>

import Device from "./Device.vue";
import Password from "./Password.vue";
import Totp from "./Totp.vue";
import {computed, ref} from "vue";
import ResetPassword from "./ResetPassword.vue";
import VerifyEmail from "./VerifyEmail.vue";
import TotpOnboarding from "./TotpOnboarding.vue";
import {Spinner} from 'holvit-components'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})

const stage = ref('verify_password')

const advance = (response) => {

  stage.value = response.nextStep

  if (stage.value === 'submit') {
     finalSubmit()
  }
}

const finalSubmit = () => {
  const form = document.createElement('form');

  form.method = 'POST';
  //TODO: get from urls
  form.action = props.data.loginCompleteUrl;
  form.style = 'display: none';

  const tokenInput = document.createElement('input');
  tokenInput.type = 'hidden';
  tokenInput.name = 'token';
  tokenInput.value = props.data.token;
  form.appendChild(tokenInput);

  document.body.appendChild(form);

  form.submit();
}

const urls = computed(() => ({
  register: props.data.registerUrl,
}))

</script>

<template>
  <Password v-if="stage === 'verify_password'" @success="advance" :token="data.token" :urls="urls"
            :show-remember-me="data.useRememberMe"/>
  <ResetPassword v-if="stage === 'reset_password'" @success="advance" :token="data.token" :urls="urls"/>
  <VerifyEmail v-if="stage === 'verify_email'" :token="data.token" :urls="urls"/>
  <TotpOnboarding v-if="stage === 'totp_onboarding'" @success="advance" :token="data.token" :urls="urls"/>
  <Totp v-if="stage === 'verify_totp'" @success="advance" :urls="urls"/>
  <Device v-if="stage === 'verify_device'" @success="advance" :token="data.token" :urls="urls"/>
  <div class="grid place-items-center" v-if="stage === 'submit'">
  <Spinner type="dots" size="lg" />
  </div>
</template>

<style scoped>

</style>