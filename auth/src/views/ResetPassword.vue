<script setup>
import {TextInput, Heading, Button, Alert} from "holvit-components";
import {computed, reactive, ref} from "vue";
import authApi from "../holvitApi/authApi.js";
import {useVuelidate} from "@vuelidate/core";
import {sameAs} from "@vuelidate/validators";

const props = defineProps({
  token: {
    type: String,
    required: true,
  },
  urls: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['success']);

const state = reactive({
  newPassword: "",
  confirmNewPassword: "",
  submitting: false,
  wrongLogin: false,
});

const rules = computed(() => ({
  newPassword: {
    sameAs: sameAs(computed(() => state.confirmNewPassword)),
  },
}));

const submitButton = ref(null);
const newPasswordInput = ref(null);

const v$ = useVuelidate(rules, state)

const submit = async () => {
  state.submitting = true;

  try {
    if (!await v$.value.$validate()) {
      submitButton.value.shake();
      newPasswordInput.value.focus()
      return
    }
    
    const response = await authApi.resetPassword(state.newPassword, props.token);
    emit('success', response.data);
  } catch (e) {
    console.log(e) //TODO: error handling

    state.newPassword = "";
    state.confirmNewPassword = "";

    submitButton.value.shake();
    newPasswordInput.value.focus();
  } finally {
    state.submitting = false;
  }
}
</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="submit">
    <Heading class="font-bold text-center">Login</Heading>
    <Alert color="primary">
      Your current password is temporary. Please update it to a new password.
    </Alert>
    <TextInput
        :autofocus="true"
        v-model="state.newPassword"
        caption="New password"
        type="password"
        :disabled="state.submitting"
        :required="true"
        :error-text="v$.newPassword.$errors[0]?.$message"
        ref="newPasswordInput"
    />
    <TextInput
        v-model="state.confirmNewPassword"
        caption="Confirm new password"
        type="password"
        :disabled="state.submitting"
        :required="true"
    />
    <Button
        type="submit"
        text="Change password"
        color="primary"
        size="lg"
        :click-effect="true"
        :disabled="state.submitting"
        ref="submitButton"
    />
  </form>
</template>

<style scoped>

</style>