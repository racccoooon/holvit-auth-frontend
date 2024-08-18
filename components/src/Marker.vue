<script setup>
import {computed} from "vue";
import {markText} from "./util";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  searches: {
    type: Array,
  },
})

const markedText = computed(() => {
  return markText(props.text, props.searches)
})
</script>

<template>
  <span v-html="markedText"/>
</template>

<style scoped>

</style>