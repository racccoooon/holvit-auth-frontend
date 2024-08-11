<script setup>
import {NavMenu} from 'holvit-components'

</script>

<template>
  <div class="h-full lg:flex flex-1 overflow-hidden">
    <NavMenu app-name="Holvit Admin">

    </NavMenu>

    <div class="mt-14 lg:mt-0 overflow-auto p-8 w-full" id="content">
      <router-view v-slot="{ Component }"></router-view>
    </div>
  </div>
</template>

<style scoped>

</style>
