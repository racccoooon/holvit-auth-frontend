import {defineStore} from "pinia";
import { useAsyncState } from '@vueuse/core'
import {findRealms} from "../api/realms.js";

export const useRealmStore = defineStore("realms", {
    state: () => ({
        _realms: useAsyncState(findRealms(), null),
    }),
    getters: {
        realms() {
            return this._realms.state;
        }
    }
});