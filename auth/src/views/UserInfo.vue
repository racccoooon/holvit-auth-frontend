<script setup>


const props = defineProps({
  user: {
    type: Object,
    required: true,
  }
});

</script>

<template>
  <div class="auth-box flex flex-col gap-6">
    <p class="text-lg">You are currently signed in as {{ user.name }}!</p>
    <a href="/logout" class="text-sm text-fuchsia-800 underline">Is not you?</a>
  </div>
</template>

<style scoped>

</style>