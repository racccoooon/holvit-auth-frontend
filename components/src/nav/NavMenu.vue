<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  appName: {
    type: String,
    required: true,
  }
})

const burgerOpen = ref(false);

const toggleBurger = () => burgerOpen.value = !burgerOpen.value

const menuClass = computed(() => ({'hidden': !burgerOpen.value}))

</script>

<template>
  <div class="w-full lg:w-[280px] flex-shrink-0 flex flex-col border-r border-slate-200">
    <div class="flex p-4 gap-4 bg-slate-50 font-bold border-b border-slate-200">
      <div class="lg:hidden cursor-pointer" @click="toggleBurger">
        BURGER
      </div>
      <div class="" v-text="appName"></div>
      <div class="ml-auto">LOGOUT</div>
    </div>
    <div class="flex lg:flex flex-col fixed lg:static w-full h-full bg-gradient-to-b bg-slate-50" :class="menuClass">
      <div class="p-4">
        <div class="px-4 py-2 bg-slate-100 rounded-lg flex justify-between hover:bg-slate-200 cursor-pointer transition-all hover:shadow">
          REALM: MASTER <span>v</span></div>
      </div>
      <hr class=""/>
      <menu class="flex flex-col p-4 gap-2">
        <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Clients</li>
        <li class="px-4 py-2 cursor-pointer rounded-lg text-fuchsia-950 font-bold bg-slate-100">Users</li>
        <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Scopes</li>
        <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Claims</li>
        <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Configuration</li>
      </menu>
      <div class="mt-auto px-8 py-4 flex justify-between text-sm">
        <div class="text-slate-500">holvit v.1.33.7</div>
        <div>
          <a href="https://github.com/racccoooon/holvit-backend" target="_blank" class="text-blue-400">github</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>