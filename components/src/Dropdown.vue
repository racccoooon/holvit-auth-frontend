<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  }
});

const model = defineModel({
  default: null,
});
</script>

<template>
  <select class="appearance-none px-4 py-2 bg-slate-100 rounded-lg 
  hover:bg-slate-200 cursor-pointer transition-all hover:shadow" v-model="model"
  v-bind="$attrs"
  >
    <option v-for="item in items" :value="item.value" :key="item.value">{{ item.text }}</option>
  </select>
</template>

<style scoped>

option::before {
  content: "Realm" / "";
}

</style>