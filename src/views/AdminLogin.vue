<script setup>

import TextInput from "../components/TextInput.vue";
import Heading from "../components/Heading.vue";
import {required} from '@vuelidate/validators'
import {useVuelidate} from '@vuelidate/core'
import {reactive, computed} from "vue";
import Button from "../components/Button.vue";
import CenteredContent from "../components/CenteredContent.vue";

const state = reactive({
  username: "",
  password: "",
})

const rules = computed(() => ({
  username: {
    required
  },
  password: {
    required
  }
}))

const v$ = useVuelidate(rules, state)

const submit = () => {
  v$.value.$validate()
  if (v$.value.$error) return
  console.log("submit!")
}
</script>

<template>
  <form class="flex flex-col gap-6"
        @submit.prevent="submit">
    <Heading class="mb-4 font-bold text-center">Admin login</Heading>
    <TextInput
        v-model="state.username"
        caption="Username"
        placeholder="Enter your user name"
        :max-length="20"
        autofocus
        required
        :error-text="v$.username.$errors[0]?.$message"/>
    <TextInput
        v-model="state.password"
        caption="Password"
        helper-text="Password must include an emoji :)"
        type="password"
        required
        :error-text="v$.password.$errors[0]?.$message"/>
    <Button type="submit" text="Login" color="primary" size="large" click-effect/>
  </form>
</template>

<style scoped>

</style>