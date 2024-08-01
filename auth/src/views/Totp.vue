<script setup>

import {TextInput, Heading, Button} from "holvit-components";
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import {reactive, computed, watch, ref} from "vue";

const state = reactive({
  code: "",
  submitting: false,
  wrongCode: false,
});

const rules = computed(() => ({
  code: {
    required
  },
}));

const form = ref(null);
const submitButton = ref(null);
const codeField = ref(null);

const v$ = useVuelidate(rules, state)


const checkCode = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (code === '123456') {
        resolve();
      } else {
        reject();
      }
    }, 500);
  });
};

const submit = async () => {
  submitButton.value.focus();
  state.submitting = true;
  try {
    await checkCode(state.code);
    alert('logged in!');
  } catch (e) {
    submitButton.value.shake();
    state.wrongCode = true;
    state.code = "";
    codeField.value.focus();
  }
  state.submitting = false;
}

watch(() => state.code, (code) => {
  if (code.length === 6) {
    form.value.requestSubmit();
  }
});

</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit" ref="form">
    <Heading class="font-bold text-center">Admin login</Heading>
    <p class="text-orange-700" :class="{'invisible': !state.wrongCode}">
      Wrong code! you gotta be quick before it expires!
    </p>
    <TextInput
        v-model="state.code"
        caption="Authentication code"
        placeholder="XXXXXX"
        :max-length="6"
        :autofocus="true"
        :required="true"
        inputmode="numeric"
        :disabled="state.submitting"
        :error-text="v$.code.$errors[0]?.$message"
        ref="codeField"
    />
    <Button
        type="submit"
        text="Login"
        color="primary"
        size="large"
        :click-effect="true"
        :disabled="state.submitting"
        ref="submitButton"
    />
    <a href="/totp-backup" class="text-sm text-fuchsia-800 underline">I hope you still have your backup code!</a>
  </form>
</template>

<style scoped>

</style>