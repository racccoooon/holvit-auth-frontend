import {defineStore} from "pinia";
import { useAsyncState } from '@vueuse/core'

export const useRealmStore = defineStore("realms", {
    state: () => ({
        loaded: false,
        realms: useAsyncState(api),
    })
});