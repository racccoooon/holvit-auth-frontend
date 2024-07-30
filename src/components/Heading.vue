<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "h1",
    validator: v => ['h4', 'h3', 'h2', 'h1'].includes(v),
  },
})
</script>

<template>
  <h1 class="text-4xl" v-if="size === 'h1'" v-bind="$attrs">
    <slot/>
  </h1>
  <h2 class="text-3xl" v-if="size === 'h2'" v-bind="$attrs">
    <slot/>
  </h2>
  <h3 class="text-2xl" v-if="size === 'h3'" v-bind="$attrs">
    <slot/>
  </h3>
  <h4 class="text-xl" v-if="size === 'h4'" v-bind="$attrs">
    <slot/>
  </h4>
</template>

<style scoped>

</style>