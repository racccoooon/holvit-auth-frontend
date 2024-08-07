<script setup>

import {computed} from "vue";

const props = defineProps({
  color: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'danger'].includes(value),
  }
})

const alertClass = computed(() => ({
  'alert': true,
  [`alert-${props.color}`]: true,
}))
</script>

<template>
  <p :class="alertClass" v-bind="$attrs">
    <slot/>
  </p>
</template>

<style scoped>
.alert {
  @apply rounded-lg px-3 py-2;
}

.alert-primary {
  @apply text-fuchsia-900 bg-fuchsia-100;
}

.alert-danger {
  @apply text-red-900 bg-red-100;
}
</style>