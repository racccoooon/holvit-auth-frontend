<template>
  <div class="" v-bind="$attrs">
    <label class="pb-2 font-bold flex flex-row items-center" :class="{disabled: disabled, required: required}">
      <input
          type="checkbox"
          ref="inputRef"
          v-model="model"
          :disabled="disabled"
          :required="required"
      />
      {{caption}}
    </label>

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

const inputRef = ref(null);

const props = defineProps({
  caption: {
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
  autofocus: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  inputmode: {
    type: String,
    default: null,
  }
});

const model = defineModel({
  type: Boolean,
  default: false,
});

const hasHelperText = computed(() => {
  return !!props.helperText
});

const hasErrorText = computed(() => {
  return !!props.errorText
});

const focus = () => {
  nextTick(() => inputRef.value.focus());
}

defineExpose({focus});

onMounted(() => {
  if (props.autofocus) {
    focus();
  }
})
</script>

<style scoped>
</style>