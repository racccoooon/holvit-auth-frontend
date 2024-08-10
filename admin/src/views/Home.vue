<script setup>
import {computed, ref} from "vue";
import {Heading, Button, Icon, Table, TableCol} from 'holvit-components'

const burgerOpen = ref(false);

const toggleBurger = () => burgerOpen.value = !burgerOpen.value

const menuClass = computed(() => ({'hidden': !burgerOpen.value}))

const ellipsis_clicked = () => alert('clicked')

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const fetchTableData = async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
  await timeout(1000)
  return {
    rows: [
      {
        id: '27014c4e-c341-446c-a84a-b0890ef33e00',
        username: 'gwenya',
        email: 'me@gwendolyn.dev',
        displayName: 'Gwendolyn'
      },
      {
        id: '7e761883-3b5e-4829-97c8-2b4551720b31',
        username: 'darkarotte',
        email: 'karolin.kostial@gmail.com',
        displayName: 'Kawooooooo'
      },
      {
        id: '90edc47e-d8b0-4c58-8783-34cf7ae4ec51',
        username: 'my_maker',
        email: 'hi@maiker.de',
        displayName: 'Mia'
      },
      {
        id: 'b73ba2c5-705a-4795-b629-dd9304e21225',
        username: 'mindy',
        email: 'mindy@shark.empire',
        displayName: 'Mindy (shark)'
      },
      {
        id: '28dde8e1-31ef-4497-989d-d43111f16769',
        username: 'haidi',
        email: 'haidi@shark.empire',
        displayName: 'Haidi (shark)'
      },
      {
        id: 'd8548f52-2959-48d3-a9a9-1d39592f765c',
        username: 'sharklotte',
        email: 'sharklotte@shark.empire',
        displayName: 'Sharklotte (shark)'
      }
    ],
    totalCount: 27,

  }
}


</script>

<template>
  <div class="h-full lg:flex flex-1 overflow-hidden">
    <div class="w-full lg:w-[280px] flex-shrink-0 flex flex-col border-r border-slate-200">
      <div class="flex p-4 gap-4 bg-slate-50 font-bold border-b border-slate-200">
        <div class="lg:hidden cursor-pointer" @click="toggleBurger">
          BURGER
        </div>
        <div class="">LOGO</div>
        <div class="ml-auto">LOGOUT</div>
      </div>
      <div class="flex lg:flex flex-col fixed lg:static w-full h-full bg-gradient-to-b bg-slate-50" :class="menuClass">
        <div class="p-4">
          <div class="px-4 py-2 bg-slate-100 rounded-lg flex justify-between hover:bg-slate-200 cursor-pointer transition-all hover:shadow">
            REALM: MASTER <span>v</span></div>
        </div>
        <hr class=""/>
        <menu class="flex flex-col p-4 gap-2">
          <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Clients</li>
          <li class="px-4 py-2 cursor-pointer rounded-lg text-fuchsia-950 font-bold bg-slate-100">Users</li>
          <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Scopes</li>
          <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Claims</li>
          <li class="px-4 py-2 cursor-pointer rounded-lg hover:bg-slate-200 transition-all">Configuration</li>
        </menu>
        <div class="mt-auto px-8 py-4 flex justify-between text-sm">
          <div class="text-slate-500">holvit v.1.33.7</div>
          <div>
            <a href="https://github.com/racccoooon/holvit-backend" target="_blank" class="text-blue-400">github</a>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-auto p-8 w-full" id="content">
      <div class="mb-8 flex justify-between">
        <div>
          <Heading>Hello World</Heading>
          <p class="text-sm text-slate-700">Here you can manage all your worlds and hello them</p>
        </div>
        <div class="">
          <Button text="Action!" color="primary" size="sm"/>
        </div>
      </div>



      <Table key-prop="id" :data-source="fetchTableData" title="repudiare eros conceptam populo vel">
        <TableCol key="username" header="User Name" :can-mark="true" :can-sort="true" />
        <TableCol key="email" header="Email" :can-mark="true" />
        <template #email="{row, markText}">
          <a href="mailto:{{row.email}}" v-html="markText(row.email)" />
        </template>
      </Table>
      <div class="border border-slate-200 rounded-md overflow-hidden py-4">
        <div class="flex justify-between px-4 mb-2">
          <p>repudiare eros conceptam populo vel</p>
          <div>
             <input type="text" class="border border-slate-200 px-4 py-2 rounded-lg focus:outline outline-2 outline-fuchsia-700" placeholder="Search for users..." aria-label="User search"/>
          </div>
        </div>
        <table class="w-full">
          <thead class="uppercase">
          <tr>
            <th scope="col" class="px-4 text-left text-fuchsia-950">Username</th>
            <th scope="col" class="px-4 text-left text-fuchsia-950">Display Name</th>
            <th scope="col" class="px-4 text-left text-fuchsia-950">Email</th>
            <th scope="col" class="px-4 text-left text-fuchsia-950"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="x in [1,2,3,4,5,6,7,8,9,10]" class="cursor-pointer hover:bg-slate-50 transition-all">
            <td class="px-4 py-2 text-left">gwe<mark class="font-bold">nya</mark></td>
            <td class="px-4 py-2 text-left text-slate-700">Gwendolyn</td>
            <td class="px-4 py-2 text-left text-slate-700">me@gwendolyn.dev</td>
            <td class="px-4 py-2 text-left">
              <Icon name="ellipsis-vertical" size="md" class="cursor-pointer border border-slate-200 hover:bg-slate-200 rounded hover:shadow p-1" aria-role="button" @click="ellipsis_clicked" />
            </td>
          </tr>
          </tbody>
        </table>
        <div class="px-4 mt-4 flex justify-between">
          <div>
            <div class="px-4 py-2 bg-slate-100 rounded-lg inline-flex justify-between hover:bg-slate-200 cursor-pointer transition-all text-slate-700 hover:shadow">
             20 / page
              <span class="ml-3">v</span>
            </div>
          </div>
          <div class="flex gap-1">
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">&laquo;</span>
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">1</span>
            <span class="block cursor-pointer rounded px-4 content-center border bg-slate-100 font-bold">2</span>
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">...</span>
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">4</span>
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">5</span>
            <span class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">&raquo;</span>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
</style>