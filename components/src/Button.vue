<script setup>
import {computed, nextTick, ref} from "vue";

const props = defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'link'].includes(value),
  },
  text: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'secondary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value),
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['inline', 'default', 'large'].includes(value),
  },
  clickEffect: {
    type: Boolean,
    default: false,
  }
})

const isLink = computed(() => props.type === 'link')

const buttonClass = computed(() => ({
  'button': true,
  [`button-${props.color}`]: true,
  [`button-${props.size}`]: true,
  'shaking': shaking.value,
  'click-effect': clickEffect.value,
}));

const shaking = ref(false);
const clickEffect = ref(false);

const buttonEl = ref(null);

const shake = () => {
  shaking.value = true;
}

const focus = () => {
  nextTick(() => buttonEl.value.focus());
}

defineExpose({shake, focus});


/**
 * @param {MouseEvent} e
 */
const clickHandler = (e) => {
  if (props.clickEffect) {
    e.target.style = `--effect-pos-x: ${e.offsetX}px; --effect-pos-y: ${e.offsetY}px`;
    clickEffect.value = true;
  }
}

const animationEndHandler = e => {
  if (e.animationName === 'button-click-effect') {
    clickEffect.value = false;
  }
  if (e.animationName === 'button-shaking') {
    shaking.value = false;
  }
}

</script>

<template>
  <button
      v-if="!isLink"
      :type="type"
      :class="buttonClass"
      v-bind="$attrs"
      :aria-label="text"
      v-text="text"
      :disabled="disabled"
      @click="clickHandler"
      @animationend="animationEndHandler"
      @animationcancel="animationEndHandler"
      ref="buttonEl"
  />
  <a v-else :class="buttonClass" class="text-center" v-bind="$attrs" v-text="text"/>
</template>

<style scoped>
.button {
  @apply transition-colors;
  position: relative;
  overflow: hidden;
  --effect-color: white;
}

.button.click-effect::after {
  content: '';
  background: radial-gradient(circle, var(--effect-color) 0%, var(--effect-color) 50%, rgba(0, 0, 0, 0) 100%);
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 20px;
  animation: 0.5s 1 normal button-click-effect;
  top: var(--effect-pos-y);
  left: var(--effect-pos-x);
}

.button.shaking {
  animation: button-shaking 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.button-primary {
  @apply text-white border-fuchsia-900 bg-fuchsia-900;
  --effect-color: theme('colors.fuchsia.900');
}

.button-primary:not(:disabled) {
  @apply hover:text-fuchsia-900 focus:text-fuchsia-900 hover:bg-white focus:bg-white;
}

.button-primary:disabled {
  border-color: color-mix(in srgb, theme('colors.fuchsia.900') 70%, white);
  background-color: color-mix(in srgb, theme('colors.fuchsia.900') 70%, white);
}

.button-secondary {
  @apply text-fuchsia-900 border-fuchsia-900;
}

.button-secondary:not(:disabled) {
  @apply hover:bg-fuchsia-900 hover:text-white focus:bg-fuchsia-900 focus:text-white;
}

.button-secondary:disabled {
  border-color: color-mix(in srgb, theme('colors.fuchsia.900') 70%, white);
  color: color-mix(in srgb, theme('colors.fuchsia.900') 70%, white);
}

.button-danger {
  @apply text-red-900 border-red-900;
}

.button-danger:not(:disabled) {
  @apply hover:bg-red-900 hover:text-white focus:bg-red-900 focus:text-white;
}

.button-danger:disabled {
  border-color: color-mix(in srgb, theme('colors.red.900') 70%, white);
  color: color-mix(in srgb, theme('colors.red.900') 70%, white);
}

.button-default {
  @apply uppercase rounded-lg p-3 border-2 font-bold;
}

.button-large {
  @apply uppercase rounded-xl p-4 border-2 font-bold text-xl;
}

.button-inline {
  @apply rounded-md px-2 py-1 border;
}
</style>

<style>

@keyframes button-click-effect {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(20);
  }
}

@keyframes button-shaking {
  10%,
  90% {
    transform: translateX(-1px);
  }

  20%,
  80% {
    transform: translateX(2px);
  }

  30%,
  50%,
  70% {
    transform: translateX(-4px);
  }

  40%,
  60% {
    transform: translateX(4px);
  }
}
</style>