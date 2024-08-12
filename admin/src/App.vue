<script setup>
import {NavMenu, Spinner} from 'holvit-components'
import {useUserStore} from "./stores/user.js";
import {computed} from "vue";

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.user !== null);

</script>

<template>
  <div class="h-full lg:flex flex-1 overflow-hidden" v-if="isLoggedIn">
    <NavMenu app-name="Holvit Admin">

    </NavMenu>

    <div class="mt-14 lg:mt-0 overflow-auto p-8 w-full" id="content">
      <router-view v-slot="{ Component }"></router-view>
    </div>
  </div>
  <div v-else class="h-full grid place-items-center">
    <Spinner size="3xl" />
  </div>
</template>

<style scoped>

</style>
