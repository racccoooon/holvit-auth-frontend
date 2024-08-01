<script setup>

// import TextInput from "../components/TextInput.vue";
import {TextInput, Heading, Button, Checkbox} from "holvit-components";
import {reactive, ref} from "vue";

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
        resolve();
      } else {
        reject();
      }
    }, 500);
  });
};


const submit = async () => {
  state.submitting = true;
  try {
    await checkCredentials(state.username.trim(), state.password);
    emit('success');
  } catch (e) {
    state.wrongLogin = true;
    state.password = "";
    submitButton.value.shake();
    passwordInput.value.focus();
  }
  state.submitting = false;
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit">
    <Heading class="font-bold text-center">Admin login</Heading>
    <p class="text-orange-700" :class="{'invisible': !state.wrongLogin}">
      Wrong username or password!!!!!1!
    </p>
    <TextInput
        v-model="state.username"
        caption="Username"
        placeholder="Enter your user name"
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
      v-model="state.remember"
      caption="Rember me pls"
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
      <a href="/password-forgor" class="text-sm text-fuchsia-800 underline">Did you forgor your password?</a>
      <a href="/password-forgor" class="text-sm text-fuchsia-800 underline">make an account? ><</a>
    </div>
  </form>
</template>

<style scoped>

</style>