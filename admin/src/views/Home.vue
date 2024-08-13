<script setup>
import {Button, PageHeader, Box, Heading} from 'holvit-components'
import {useRealmStore} from "../stores/realms.js";
import {useRouter} from "vue-router";

const realmStore = useRealmStore();

const router = useRouter();

const openRealm = id => {
  router.push({path: `/${id}/` })
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <PageHeader title="Hello World!" sub-title="Here you can manage all your worlds and hello them">
      <Button text="Action" color="primary" size="sm" @click="action"/>
    </PageHeader>
    <div class="grid grid-cols-2 gap-4">
      <Box v-for="realm in realmStore.realms" class="p-4 cursor-pointer hover:shadow" @click="() => openRealm(realm.id)">
        <Heading type="h2">{{realm.name}}</Heading>
        <p>
          {{realm.numUsers}} Users<br/>
          {{realm.numClients}} Clients
        </p>
      </Box>
    </div>

  </div>
</template>

<style scoped>
</style>