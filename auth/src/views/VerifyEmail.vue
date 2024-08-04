<script setup>
import {Heading, Alert} from "holvit-components";

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

</script>

<template>
  <div class="flex flex-col gap-6">
    <Heading class="font-bold text-center">Login</Heading>
    <Alert color="primary">
      Email verification required.
    </Alert>
    <p>
      To enhance the security of your account, we need to verify your email address. Please check your inbox for a
      verification email from us. If you haven't received the email, it might be in your spam or junk folder.
    </p>
    <a href="/todo" class="text-sm text-fuchsia-800 underline">
      Didn't receive the email? Resend verification email
    </a>
  </div>
</template>

<style scoped>

</style>