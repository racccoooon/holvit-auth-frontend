<script setup>
import {computed, nextTick, onMounted, provide, ref, watch} from "vue";
import LoadingBar from "../LoadingBar.vue";
import Box from "../Box.vue"
import debounce from 'lodash/debounce';
import Marker from "../Marker.vue";
import {markText as _markText, splitSearch} from "../util";
import Dropdown from "../Dropdown.vue";

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


const totalCount = ref(0);
const rows = ref([]);

const searchInputRef = ref(null)

const searchText = ref('');
const searches = ref([]);
watch(searchText, () => {
  searches.value = splitSearch(searchText.value);
  currentPage.value = 1;
  loadDatasourceDebounced();
});

const markText = (text) => _markText(text, searches.value);

const currentPage = ref(1);
watch(currentPage, () => {
  loadDatasourceDebounced();
})

const pageSize = ref(props.pageSize);
watch(pageSize, () => {
  currentPage.value = 1;
  loadDatasourceDebounced();
});

const pageSizesForDropdown = computed(() => props.pageSizes.map(x => ({value: x, text: `${x} / page`})));

const pagesForDropdown = computed(() => {
  let count = totalCount.value;
  if(count === 0) count = 1;
  return Array.from({length: Math.ceil(count / pageSize.value)}, (_, i) => i+1).map(x => ({value: x, text: `${x}`}))
});

const firstPage = () => {
  currentPage.value = 1
}

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value = currentPage.value-1;
}

const nextPage = () => {
  let pageCount = Math.ceil(totalCount.value / pageSize.value);
  if (pageCount > currentPage.value) currentPage.value = currentPage.value+1;
}

const lastPage = () => {
  let pageCount = Math.ceil(totalCount.value / pageSize.value);
  if (pageCount > 1) currentPage.value = pageCount;
}

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
}, 250, {leading: true})

const loadDatasourceDebounced = async () => {
  isLoading.value = true
  await debouncedDataSource()//TODO: handle errors
}

const onRowClicked = (row) => {
  emit('row-clicked', row)
}

const emit = defineEmits(['row-clicked'])

const registerColumn = (col) => {
  columns.value.push(col)
}

provide('registerColumn', registerColumn);

onMounted(() => {
  if (props.autoFocusSearch && props.showSearch) {
    nextTick(() => searchInputRef.value.focus());
  }

  loadDatasource()
});
</script>

<template>
  <slot></slot>
  <Box class="overflow-x-auto">
    <div class="flex flex-wrap gap-4 items-center px-4">
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
      <tr class="cursor-pointer hover:bg-slate-50 transition-all" v-for="(row, rowIndex) in rows" :key="row[keyProp]" @click="onRowClicked(row)">
        <td class="px-4 py-2 text-left" v-for="column in columns" :key="column.name">
          <slot :name="column.name" :row="row" :row-index="rowIndex" :mark-text="markText">
            <Marker :text="String(row[column.name])" :searches="searches"/>
          </slot>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="px-4 mt-4 flex justify-between flex-wrap gap-4">
      <div>
        <Dropdown :items="pageSizesForDropdown" v-model="pageSize"/>
      </div>
      <div class="flex gap-1">
        <span @click="firstPage"
            class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&laquo;</span>
        <span  @click="previousPage"
            class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&lsaquo;</span>
        <Dropdown :items="pagesForDropdown" v-model="currentPage"/>
        <span @click="nextPage"
            class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&rsaquo;</span>
        <span @click="lastPage"
            class="block cursor-pointer rounded px-4 content-center bg-slate-100 hover:bg-slate-200 transition-all hover:shadow">&raquo;</span>
      </div>
    </div>
  </Box>
</template>

<style scoped>

</style>