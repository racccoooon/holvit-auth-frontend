<template>
  <div class="auth-box">
    <Authenticate v-if="mode === 'authenticate'" :data="authenticate"/>
    <Authorize v-if="mode === 'authorize'" :data="authorize"/>
  </div>
  <div class="fixed top-2 left-2 px-4 py-2 rounded bg-gray-50">
    <select v-model="mode">
      <option value="authenticate">Authenticate</option>
      <option value="authorize">Authorize</option>
    </select>
  </div>
</template>

<script setup>
import Authenticate from "./views/Authenticate.vue";
import Authorize from "./views/Authorize.vue";
import {ref} from "vue";

const mode = ref('authenticate');

const {/*mode,*/ authenticate, authorize} = window.auth_info;
</script>