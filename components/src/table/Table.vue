<script setup>
import {nextTick, onMounted, provide, ref, watch} from "vue";
import LoadingBar from "../LoadingBar.vue";
import Box from "../Box.vue"
import debounce from 'lodash/debounce';

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
const isLoading = ref(false);

const markText = (text) => text; // TODO

const totalCount = ref(0);
const rows = ref([]);

const searchInputRef = ref(null)

const registerColumn = (col) => {
  columns.value.push(col)
}

provide('registerColumn', registerColumn);

const searchText = ref('');
watch(searchText, () => {
  loadDatasourceDebounced();
});

const currentPage = ref(1);
watch(currentPage, () => {
  loadDatasourceDebounced();
})

const pageSize = ref(props.pageSize);
watch(pageSize, () => {
  currentPage.value = 1;
  loadDatasourceDebounced();
});

const loadDatasource = async () => {
  isLoading.value = true

  const data = await props.dataSource({
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    searchText: searchText.value,
    sortBy: null,
    sortDirection: "asc",
  })//TODO: handle errors

  rows.value = data.rows;
  totalCount.value = data.totalCount;

  isLoading.value = false
  await nextTick();
}

const debouncedDataSource = debounce(async () => {
  await loadDatasource()
}, 1000)

const loadDatasourceDebounced = async () => {
  isLoading.value = true
  await debouncedDataSource()//TODO: handle errors
}

onMounted(() => {
  if (props.autoFocusSearch && props.showSearch) {
    nextTick(() => searchInputRef.value.focus());
  }

  loadDatasource()
});
</script>

<template>
  <slot></slot>
  <Box>
    <div class="flex items-center px-4">
      <p v-if="title !== null" v-text="title"/>
      <input ref="searchInputRef"
             v-if="showSearch"
             v-model="searchText"
             type="text"
             class=" ml-auto border border-slate-200 px-4 py-2 rounded-lg focus:outline outline-2 outline-fuchsia-700"
             :placeholder="searchPlaceholder"
             aria-label="User search"/>
    </div>

    <LoadingBar class="my-2" :isLoading="isLoading"/>

    <table class="w-full">
      <thead class="uppercase">
      <tr>
        <th scope="col" class="px-4 text-left text-fuchsia-950" v-for="column in columns" :key="column.name">
          {{ column.header }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="cursor-pointer hover:bg-slate-50 transition-all" v-for="(row, rowIndex) in rows" :key="row[keyProp]">
        <td class="px-4 py-2 text-left" v-for="column in columns" :key="column.name">
          <slot :name="column.name" :row="row" :row-index="rowIndex" :mark-text="markText">
            {{ row[column.name] }}
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
  </Box>
</template>

<style scoped>

</style>