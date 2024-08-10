<script setup>
import {Button, Heading} from "./index";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: false,
    default: "",
  },
})
</script>

<template>
    <div class="flex justify-between items-center">
      <div>
        <Heading>{{title}}</Heading>
        <p v-if="subTitle !== ''" class="text-sm text-slate-700" v-text="subTitle"/>
      </div>
      <div class="">
        <slot/>
      </div>
    </div>
</template>

<style scoped>

</style>