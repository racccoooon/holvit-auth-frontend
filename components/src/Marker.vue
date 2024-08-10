<script setup>
import {computed} from "vue";
import {markText} from "./util";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  searchText: {
    type: String,
  },
})

const markedText = computed(() => {
  return markText(props.text, props.searchText)
})
</script>

<template>
  <span v-html="markedText"/>
</template>

<style scoped>

</style>