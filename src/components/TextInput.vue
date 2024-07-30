<template>
  <div class="flex flex-col" v-bind="$attrs">
    <label v-text="caption" :for="inputId" class="pb-2 font-bold" :class="{disabled: disabled, required: required}"/>
    <input
        :id="inputId"
        class="w-full text-lg py-2 px-3 border border-gray-400 rounded-md"
        ref="inputRef"
        v-model="model"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :type="effectiveType"/>
    <span
        class="text-gray-500 text-sm pt-1"
        v-text="helperText"
        v-if="hasHelperText"/>
    <span
        class="text-red-600 text-sm"
        v-text="errorText"
        v-if="hasErrorText"/>
  </div>
</template>

<script setup>
import {onMounted, computed, nextTick, ref} from "vue";
import {useId} from "../util/useId.js";

const inputRef = ref(null)

const inputId = useId();

const props = defineProps({
  caption: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
    validate: (value) => ['text', 'password'].includes(value),
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
  },
  helperText: {
    type: String,
  },
  errorText: {
    type: String,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  maxLength: {
    type: Number,
    default: null,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  }
})

const model = defineModel({
  type: String,
  default: null,
})

const hasHelperText = computed(() => {
  return !!props.helperText
})
const hasErrorText = computed(() => {
  return !!props.errorText
})
const effectiveType = computed(() => {
  if (props.type == "password" && props.showPassword) {
    return "text"
  }
  return props.type
})

function focus() {
  inputRef.value.focus()
}

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => {
      focus()
    })
  }
})
</script>

<style scoped>
</style>