<script setup>

import {reactive, ref, computed} from "vue";
import {useScroll} from '@vueuse/core';
import {Heading, Button, BigCheckList} from "holvit-components";


const props = defineProps({
  scopes: {
    type: Array,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  urls: {
    type: Object,
    required: true,
  },
});

const state = reactive({
  selectedScopes: props.scopes.map(_ => true)
});

const scopeItems = computed(() => props.scopes.map(s => ({
  value: s.name,
  name: s.display_name,
  description: s.description,
  disabled: s.required
})));


const form = ref(null);

const scrollContainer = ref(null);
const scrollPos = useScroll(scrollContainer);

const showScrollButton = computed(() => !scrollPos.arrivedState.bottom);

const scrollDown = () => {
  scrollContainer.value.scrollTo({top: scrollContainer.value.scrollHeight});
}

</script>

<template>
  <form class="max-h-full flex flex-col gap-6" ref="form" :action="urls.grant" method="post">
    <input type="hidden" name="token" :value="token" />
    <p class="text-lg">You are currently signed in as {{ user.name }}!</p>
    <a :href="urls.logout" class="text-sm text-fuchsia-800 underline">Is not you?</a>
    <hr class="-mx-12" />
    <p class="text-lg">{{ clientName }} wants all these scopes:</p>
    <div class="scope-list rounded-2xl bg-gray-100 border-gray-200 border overflow-auto scroll-smooth relative"
         ref="scrollContainer">
      <BigCheckList :items="scopeItems" name="grant" v-model="state.selectedScopes"/>
      <Transition>
        <div class="sticky bottom-0 height-0 overflow-visible" v-if="showScrollButton">
          <button @click.prevent="scrollDown"
                  class="absolute -top-2 w-max left-1/2 -translate-x-1/2 -translate-y-full bg-fuchsia-700 text-white rounded-lg px-3 py-1 text-sm drop-shadow cursor-pointer">
            scroll down
          </button>
        </div>
      </Transition>
    </div>
    <p>Can has?</p>
    <div class="grid grid-cols-2 gap-4">
      <Button
          type="submit"
          text="Gib"
          color="primary"
          size="lg"
          :click-effect="true"
      />
      <Button
          type="link"
          :href="urls.refuse"
          text="No thank"
          color="danger"
          size="lg"
          :click-effect="true"
      />
    </div>
  </form>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>