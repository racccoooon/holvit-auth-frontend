<script setup>
import {NavMenu, NavItem, NavSection, Spinner, Dropdown, Button} from 'holvit-components'
import {useUserStore} from "./stores/user.js";
import {computed, onMounted, ref} from "vue";
import {useRealmStore} from "./stores/realms.js";
import {useRoute, useRouter} from "vue-router";
import eventhub from "raccoon-eventhub";
import {NavigationEvent} from "./events/NavigationEvent.js";

const navMenu = ref(null)

const userStore = useUserStore();

const isLoggedIn = computed(() => userStore.user !== null);

const realmStore = useRealmStore();

const realmDropdownValues = computed(() => realmStore.realms.map(r => ({text: r.name, value: r.id})))

const route = useRoute();
const router = useRouter();

const realmId = computed(() => route.params.realmId);

const changeRealm = e => {
  router.push({name: 'realm', params: {realmId: e.target.value}});
}

eventhub.subscribe(NavigationEvent, evt => {
  navMenu.value.closeBurger()
})

</script>

<template>
  <div class="h-full lg:flex flex-1 overflow-hidden" v-if="isLoggedIn">
    <NavMenu ref="navMenu" app-name="Holvit Admin">
      <NavSection v-if="!realmId">
        <NavItem :name="realm.name" :route="{name: 'realm', params: {realmId: realm.id}}"
                 v-for="realm in realmStore.realms" :key="realm.id"/>
      </NavSection>
      <NavSection v-if="realmId">
        <Dropdown :items="realmDropdownValues" :model-value="realmId" @change="changeRealm" class="w-full"/>
      </NavSection>
      <NavSection v-if="realmId">
        <NavItem name="Configuration" :route="{name: 'configuration', params: {realmId: realmId}}"/>
        <NavItem name="Users" :route="{name: 'users', params: {realmId: realmId}}"/>
        <NavItem name="Clients" :route="{name: 'clients', params: {realmId: realmId}}"/>
        <NavItem name="Scopes and Claims" :route="{name: 'scopes-claims', params: {realmId: realmId}}"/>
      </NavSection>
      <NavSection>
        <NavItem name="User Settings" link="http://localhost:8080/user-settings-app/" target="_blank"/>
      </NavSection>

      <template #footer>
        <div class="px-8 py-4">
          <Button text="Logout" color="danger" size="sm" class="w-full"/>
        </div>
        <div class="px-8 py-4 flex justify-between text-sm">
          <div class="text-slate-500">holvit v1.33.7</div>
          <div>
            <a href="https://github.com/racccoooon/holvit-backend" target="_blank" class="text-blue-400">github</a>
          </div>
        </div>
      </template>
    </NavMenu>
    <div class="mt-14 lg:mt-0 overflow-auto p-8 w-full" id="content">
      <router-view/>
    </div>
  </div>
  <div v-else class="h-full grid place-items-center">
    <Spinner size="3xl"/>
  </div>
</template>

<style scoped>

</style>
