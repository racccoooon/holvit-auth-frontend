<script setup>
import {nextTick, onMounted, ref} from "vue";

const props = defineProps({
  dataSource: {
    type: Function,
    required: true,
  },
  keyProp: {
    type: String,
    required: true,
  },
  pageSizes: {
    type: Array,
    default: [5, 10, 20, 50, 100, 200],
  },
  pageSize: {
    type: Number,
    default: 20,
  },
  title: {
    type: String,
    default: null,
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
  autoFocusSearch: {
    type: Boolean,
    default: false,
  },
  searchPlaceholder: {
    type: String,
    default: "Search data...",
  },
});

const columns = ref([]);

const markText = (text) => text; // TODO

const totalCount = ref(0);

const rows = ref([]);

const searchInputRef = ref(null)


const registerColumn = (col) => {
  columns.value.push(col)
}


defineExpose({
  registerColumn
})

onMounted(() => {
  if (props.autoFocusSearch && props.showSearch) {
    nextTick(() => searchInputRef.value.focus());
  }

  props.dataSource({
    currentPage: 1,
    pageSize: 10,
    searchText: "",
    sortBy: null,
    sortDirection: "asc",
  }).then(data => {
    rows.value = data.rows;
    totalCount.value = data.totalCount;
  });

});
</script>

<template>
  <div class="border border-slate-200 rounded-md overflow-hidden py-4">
    <div class="flex items-center px-4 mb-2">
      <p v-if="title !== null" v-text="title"/>
      <input ref="searchInputRef"
             v-if="showSearch"
             type="text"
             class=" ml-auto border border-slate-200 px-4 py-2 rounded-lg focus:outline outline-2 outline-fuchsia-700"
             :placeholder="searchPlaceholder"
             aria-label="User search"/>
    </div>
    <table class="w-full">
      <thead class="uppercase">
      <tr>
        <th scope="col" class="px-4 text-left text-fuchsia-950" v-for="column in columns" :key="column.key">
          {{ column.header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer hover:bg-slate-50 transition-all" v-for="(row, rowIndex) in rows" :key="row[keyProp]">
        <td class="px-4 py-2 text-left" v-for="column in columns" :key="column.key">
          <slot :name="column.key" :row="row" :row-index="rowIndex" :mark-text="markText">
            {{ row[column.key] }}
          </slot>
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
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">&laquo;</span>
        <span
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">1</span>
        <span class="block cursor-pointer rounded px-4 content-center border bg-slate-100 font-bold">2</span>
        <span
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">...</span>
        <span
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">4</span>
        <span
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">5</span>
        <span
            class="block cursor-pointer rounded px-4 content-center border border-slate-100 hover:bg-slate-200 hover:border-slate-200 transition-all hover:shadow">&raquo;</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>