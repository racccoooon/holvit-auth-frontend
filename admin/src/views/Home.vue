<script setup>
import {Button, PageHeader, Box, Heading, Modal} from 'holvit-components'
import {useRealmStore} from "../stores/realms.js";
import {useRouter} from "vue-router";
import {ref} from "vue";

const realmStore = useRealmStore();

const router = useRouter();

const openRealm = id => {
  router.push({path: `/${id}/` })
}

const modal = ref(null);

const action = () => {
  modal.value.open();
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

    <Modal ref="modal"/>
  </div>
</template>

<style scoped>
</style>