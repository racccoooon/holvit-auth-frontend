<script setup>
import {Button, Icon, Table, TableCol, PageHeader} from 'holvit-components'
import {drop, take} from "lodash";

const ellipsisClicked = (id) => alert(`clicked on ${id}`)

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const fetchTableData = async ({currentPage, pageSize, searchText, sortBy, sortDirection}) => {
  await timeout(2000)
  const rows = [
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
    },
  ].filter(row => {
    if (searchText === "") return true
    return row.username.includes(searchText) || row.displayName.includes(searchText) || row.email.includes(searchText)
  })
  return {
    rows: take(drop(rows, (currentPage - 1) * pageSize), pageSize),
    totalCount: rows.length,
  }
}

const onRowClicked = (row) => {
  alert(row.id)
}

const action = () => {
  alert("action!")
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <PageHeader title="Hello World!" sub-title="Here you can manage all your worlds and hello them">
      <Button text="Action" color="primary" size="sm" @click="action"/>
    </PageHeader>

    <Table key-prop="id" :data-source="fetchTableData" title="repudiare eros conceptam populo vel"
           :auto-focus-search="true"
          @row-clicked="onRowClicked">
      <TableCol name="username" header="User Name"/>
      <TableCol name="displayName" header="Display Name"/>
      <TableCol name="email" header="Email" :can-sort="false"/>
      <TableCol name="actions" header="" :can-mark="false" :can-sort="false"/>
      <template #email="{row, markText}">
        <a href="mailto:{{row.email}}" @click.stop v-html="markText(row.email)"/>
      </template>
      <template #actions="{row}">
        <Icon name="ellipsis-vertical" size="md"
              class="cursor-pointer border border-slate-200 hover:bg-slate-200 rounded hover:shadow p-1"
              aria-role="button" @click.stop="() => ellipsisClicked(row.id)"/>
      </template>
    </Table>
  </div>
</template>

<style scoped>
</style>