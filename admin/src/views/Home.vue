<script setup>
import {Button, Icon, Table, TableCol, PageHeader} from 'holvit-components'

const ellipsis_clicked = (id) => alert(`clicked on ${id}`)

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchTableData = async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
  await timeout(2000)
  return {
    rows: [
      {
        id: '27014c4e-c341-446c-a84a-b0890ef33e00',
        username: 'gwenya',
        email: 'me@gwendolyn.dev',
        displayName: '<span style="color:red">FOOBAR<\/span>Gwendolyn'
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
    ].filter(row => {
      console.log(searchText)
      if (searchText === "") return true
      return row.username.includes(searchText) || row.displayName.includes(searchText) || row.email.includes(searchText)
    }),
    totalCount: 27,
  }
}


</script>

<template>
  <div class="flex flex-col gap-4">
    <PageHeader title="Hello World!" sub-title="Here you can manage all your worlds and hello them">
      <Button text="Action!" color="primary" size="sm"/>
    </PageHeader>

    <Table key-prop="id" :data-source="fetchTableData" title="repudiare eros conceptam populo vel"
           :auto-focus-search="true">
      <TableCol name="username" header="User Name"/>
      <TableCol name="displayName" header="Display Name"/>
      <TableCol name="email" header="Email" :can-sort="false"/>
      <TableCol name="actions" header="" :can-mark="false" :can-sort="false"/>
      <template #email="{row, markText}">
        <a href="mailto:{{row.email}}" v-html="markText(row.email)"/>
      </template>
      <template #actions="{row}">
        <Icon name="ellipsis-vertical" size="md"
              class="cursor-pointer border border-slate-200 hover:bg-slate-200 rounded hover:shadow p-1"
              aria-role="button" @click="() => ellipsis_clicked(row.id)"/>
      </template>
    </Table>

    <div class="border border-slate-200 rounded-md overflow-hidden py-4">
      <div class="flex justify-between px-4 mb-2">
        <p>repudiare eros conceptam populo vel</p>
        <div>
          <input type="text"
                 class="border border-slate-200 px-4 py-2 rounded-lg focus:outline outline-2 outline-fuchsia-700"
                 placeholder="Search for users..." aria-label="User search"/>
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
          <td class="px-4 py-2 text-left">gwe
            <mark class="font-bold">nya</mark>
          </td>
          <td class="px-4 py-2 text-left text-slate-700">Gwendolyn</td>
          <td class="px-4 py-2 text-left text-slate-700">me@gwendolyn.dev</td>
          <td class="px-4 py-2 text-left">
            <Icon name="ellipsis-vertical" size="md"
                  class="cursor-pointer border border-slate-200 hover:bg-slate-200 rounded hover:shadow p-1"
                  aria-role="button" @click="ellipsis_clicked"/>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="px-4 mt-4 flex justify-between">
        <div>
          <div
              class="px-4 py-2 bg-slate-100 rounded-lg inline-flex justify-between hover:bg-slate-200 cursor-pointer transition-all text-slate-700 hover:shadow">
            20 / page
            <span class="ml-3">v</span>
          </div>
        </div>
        <div class="flex gap-1">
            <span
                class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&laquo;</span>
          <span
              class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">1</span>
          <span class="block rounded px-4 content-center cursor-default border border-slate-200 font-bold">2</span>
          <span
              class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200  transition-all hover:shadow">...</span>
          <span
              class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">4</span>
          <span
              class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">5</span>
          <span
              class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&raquo;</span>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
</style>