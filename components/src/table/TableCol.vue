<script setup>
import {onMounted, getCurrentInstance, render, inject} from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  header: {
    type: String,
    required: true,
  },
  canMark: {
    type: Boolean,
    required: false,
    default: true,
  },
  canSort: {
    type: Boolean,
    required: false,
    default: true,
  }
})

const registerColumn = inject('registerColumn');

onMounted(() => {
  if (registerColumn) {
    registerColumn({ ...props });
  } else {
    console.error("Failed to inject registerColumn, dont use TableCol outside Table");
  }
})

</script>

<template>
</template>