<template>
  <div class="auth-box">
    <Authenticate v-if="selector_mode === 'authenticate'" :data="authenticate"/>
    <Authorize v-if="selector_mode === 'authorize'" :data="authorize"/>
  </div>
  <div class="fixed top-2 left-2 px-4 py-2 rounded bg-gray-50" v-if="show_selector">
    <select v-model="selector_mode">
      <option value="authenticate">Authenticate</option>
      <option value="authorize">Authorize</option>
    </select>
  </div>
</template>

<script setup>
import Authenticate from "./views/Authenticate.vue";
import Authorize from "./views/Authorize.vue";
import {ref} from "vue";


const {mode, authenticate, authorize} = window.auth_info;

const show_selector = typeof mode === 'undefined' && import.meta.env.VITE_SHOW_MODE_SELECTOR === 'true';

const selector_mode = ref(show_selector ? 'authorize' : mode);
</script>