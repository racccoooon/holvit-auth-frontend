<script setup>
import {computed, ref, useSlots} from "vue";
import Dropdown from "../Dropdown.vue";

const props = defineProps({
  appName: {
    type: String,
    required: true,
  }
})

const burgerOpen = ref(false);

const toggleBurger = () => burgerOpen.value = !burgerOpen.value

const menuClass = computed(() => ({'hidden': !burgerOpen.value}))
const containerClass = computed(() => ({'h-full': burgerOpen.value}))

const containerEl = ref(null);

const openBurger = () => {
  burgerOpen.value = true
}

const closeBurger = () => {
  burgerOpen.value = false
}

const menuClick = e => {
  if (e.target === containerEl.value) {
    closeBurger();
  }
}

defineExpose({
  toggleBurger,
  openBurger,
  closeBurger,
})

</script>

<template>
  <div class="fixed lg:static z-20 w-full lg:w-[280px] flex-shrink-0 flex flex-col border-r
  border-slate-200 bg-slate-100/10 backdrop-blur transition-all" :class="containerClass" @click="menuClick" ref="containerEl">
    <div class="flex p-4 gap-4 bg-slate-50 font-bold border-b border-slate-200">
      <div class="lg:hidden cursor-pointer" @click="toggleBurger">
        BURGER
      </div>
      <div>
        <router-link to="/" v-text="appName"></router-link>
      </div>
    </div>
    <div class="flex lg:flex flex-col w-full h-full bg-gradient-to-b bg-slate-50 overflow-y-auto border-r border-slate-200 lg:border-r-0 max-w-[320px]" :class="menuClass">
      <slot/>
      <div class="mt-auto">
        <slot name="footer"/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>