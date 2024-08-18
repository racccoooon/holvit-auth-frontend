<script setup>
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: true,
  },
})
</script>

<template>
  <div class="w-full h-1" :class="{'is-loading': isLoading}">
  </div>
</template>

<style scoped>
.is-loading {
  @apply relative overflow-hidden bg-slate-200;
}

.is-loading::before {
  content: '';
  @apply absolute top-0 left-0 h-full w-full bg-gradient-to-r from-fuchsia-300 via-purple-800 to-fuchsia-300;
  background-size: 200% 100%;
  animation: loading-bar 1.5s linear infinite;
}

@keyframes loading-bar {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
</style>