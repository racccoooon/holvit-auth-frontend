<script setup>

import {useId} from "./util";

const props = defineProps({
  items: {
    type: Array,
    default: [],
  }
});


const model = defineModel({
  type: Array,
  default: [],
});

const idPrefix = useId();

</script>

<template>
  <div class="checklist">
    <div v-for="(item, index) in items" class="p-4 border-gray-200 border-b last:border-b-0 grid">
      <input
          type="checkbox"
          :id="`${idPrefix}-${index}`"
          :disabled="item.disabled"
          v-model="model[index]"
          class="row-start-1 row-span-2 col-start-1 w-max place-self-center cursor-pointer"
      />
      <label class="text-lg text-fuchsia-800 row-start-1 col-start-2 cursor-pointer" :for="`${idPrefix}-${index}`">{{
          item.name
        }}</label>
      <label class="row-start-2 col-start-2 cursor-pointer" :for="`${idPrefix}-${index}`">{{
          item.description
        }}</label>
    </div>
  </div>
</template>

<style scoped>
.checklist > div {
  grid-template-columns: max-content auto;
}

.checklist input[type=checkbox] {
  width: 4rem;
  height: 4rem;
  border-radius: 8rem;
  @apply border-fuchsia-900 mr-8 rounded-lg mr-6;
}

.checklist input[type=checkbox]:checked {
  @apply bg-fuchsia-900;
}

.checklist input[type=checkbox]:disabled {
  @apply border-gray-200;
}
.checklist input[type=checkbox]:disabled:checked {
  @apply bg-gray-300;
}

.checklist input[type=checkbox]:checked::after {
  @apply border-white;
}

.checklist input[type=checkbox]::after {
  width: 1.4rem;
  height: 2.5rem;
  transform: rotate(45deg);
  top: 0.3rem;
  left: 1.2rem;
  @apply border-r-8 border-b-8 border-white;
}
</style>