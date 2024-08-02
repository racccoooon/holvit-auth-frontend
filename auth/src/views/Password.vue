<script setup>

// import TextInput from "../components/TextInput.vue";
import {TextInput, Heading, Button, Checkbox, Alert} from "holvit-components";
import {reactive, ref} from "vue";

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
  showRememberMe: {
    type: Boolean,
    required: true,
  },
  urls: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['success']);

const state = reactive({
  username: "",
  password: "",
  submitting: false,
  wrongLogin: false,
});

const submitButton = ref(null);
const passwordInput = ref(null);

const checkCredentials = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        resolve({
          success: true,
          require_totp: true,
          token: "abc",
          new_device: true,
        });
      } else {
        reject();
      }
    }, 500);
  });
};


const submit = async () => {
  state.submitting = true;
  
  try {
    const response = await checkCredentials(state.username.trim(), state.password);
    emit('success', response);
  } catch (e) {
    state.wrongLogin = true;
    state.password = "";

    submitButton.value.shake();
    passwordInput.value.focus();
  } finally {
    state.submitting = false;
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit">
    <Heading class="font-bold text-center">Login</Heading>
    <Alert color="danger" :hidden="!state.wrongLogin">
      Password or username is wrong
    </Alert>
    <TextInput
        v-model="state.username"
        caption="Email or username"
        :max-length="20"
        :autofocus="true"
        :required="true"
        :disabled="state.submitting"
    />
    <TextInput
        v-model="state.password"
        caption="Password"
        type="password"
        :disabled="state.submitting"
        :required="true"
        ref="passwordInput"
    />
    <Checkbox
        v-if="showRememberMe"
        v-model="state.remember"
        caption="Remember me"
        :disabled="state.submitting"
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
    <div class="flex flex-row flex-wrap gap-4 justify-between">
      <a href="/password-forgor" class="text-sm text-fuchsia-800 underline">Forgot password?</a>
      <a href="" class="text-sm text-fuchsia-800 underline">Don't have an account?</a>
    </div>
  </form>
</template>

<style scoped>

</style>