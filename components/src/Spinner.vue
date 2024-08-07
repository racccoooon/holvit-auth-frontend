<script>
const sizes = {
  'sm': '1rem',
  'md': '2rem',
  'lg': '3rem',
  'xl': '4rem',
  '2xl': '5rem',
  '3xl': '6rem',
}
</script>


<script setup>
import {computed} from "vue";


const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'circle',
    validator: value => ['circle', 'dots'].includes(value),
  },
  size: {
    type: String,
    required: false,
    default: 'md',
    validator: value => Object.values(sizes).includes(value),
  }
})

const svgSize = computed(() => sizes[props.size])

</script>

<template>
  <svg :width="svgSize" :height="svgSize" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
       v-if="type === 'circle'" v-bind="$attrs">
    <g class="spinner-ring">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
    </g>
  </svg>

  <svg :width="svgSize" :height="svgSize" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" v-if="type === 'dots'" v-bind="$attrs">
    <circle class="spinner-dots" cx="4" cy="12" r="3" fill="currentColor"/>
    <circle class="spinner-dots spinner-dots-delay-1" cx="4" cy="12" r="3" fill="currentColor"/>
    <circle class="spinner-dots spinner-dots-delay-2" cx="4" cy="12" r="3" fill="currentColor"/>
    <circle class="spinner-dots spinner-dots-delay-3" cx="4" cy="12" r="3" fill="currentColor"/>
  </svg>


</template>

<style scoped>
.spinner-ring {
  transform-origin: center;
  animation: spinner-ring-anim-rotate 2s linear infinite
}

.spinner-ring circle {
  stroke-linecap: round;
  animation: spinner-ring-anim-resize 1.5s ease-in-out infinite
}

@keyframes spinner-ring-anim-rotate {
  100% {
    transform: rotate(360deg)
  }
}

@keyframes spinner-ring-anim-resize {
  0% {
    stroke-dasharray: 0 150;
    stroke-dashoffset: 0
  }
  47.5% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -16
  }
  95%, 100% {
    stroke-dasharray: 42 150;
    stroke-dashoffset: -59
  }
}

.spinner-dots {
  animation: spinner-dots-anim 2s cubic-bezier(0.36, .6, .31, 1) infinite
}

.spinner-dots-delay-1 {
  animation-delay: -.5s
}

.spinner-dots-delay-2 {
  animation-delay: -1s
}

.spinner-dots-delay-3 {
  animation-delay: -1.5s
}

@keyframes spinner-dots-anim {
  0% {
    r: 0
  }
  25% {
    r: 3px;
    cx: 4px
  }
  50% {
    r: 3px;
    cx: 12px
  }
  75% {
    r: 3px;
    cx: 20px
  }
  100% {
    r: 0;
    cx: 20px
  }
}
</style>