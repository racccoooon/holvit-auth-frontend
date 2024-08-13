<script setup>

import {computed} from "vue";
import Icon from "../Icon.vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  route: {
  },
  link: {
    type: String,
  },
  target: {
    type: String,
    default: '_self'
  }
});

const linkClass = `block px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all focus-outline`;


</script>

<template>
  <li>
    <router-link :to="route" :class="linkClass"
                 active-class="text-fuchsia-950 font-bold bg-slate-100 hover:bg-slate-100" v-if="route">
      {{ name }}
    </router-link>
    <a :href="link" v-else :class="`${linkClass} flex items-center`" :target="target">
      {{name}}
      <Icon name="open-external" size="inline" class="ml-auto" v-if="target === '_blank'" />
    </a>
  </li>
</template>

<style scoped>

</style>