<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
    validator: value => ['ellipsis-vertical'].includes(value)
  },
  size: {
    type: String,
    required: false,
    default: 'md',
    validator: value => ['inline', 'md', 'lg'].includes(value)
  }
});


</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" v-if="name === 'ellipsis-vertical'" :class="size">
    <!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
    <path fill="currentColor"
        d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/>
  </svg>
</template>

<style scoped>
svg {
  box-sizing: content-box;
}


svg.inline {
  width: 1em;
  height: 1em;
}


svg.md {
  width: 1rem;
  height: 1rem;
}

svg.lg {
  width: 1.5rem;
  height: 1.5rem;
}


</style>