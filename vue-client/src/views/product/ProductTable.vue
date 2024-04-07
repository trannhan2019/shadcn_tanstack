<script setup>
import { reactive, ref } from "vue";
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  createColumnHelper,
} from "@tanstack/vue-table";
import { useQuery } from "@tanstack/vue-query";
import { getProducts } from "@/services/product-service";

const columnsProduct = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
];

const pagination = ref({ pageIndex: 0, pageSize: 10 });
const selectPageSize = ref(5);
const rangePageSize = ref([5, 10, 20]);
const onChangePageSize = () => {
  pagination.value.pageSize = selectPageSize.value;
};

const { isLoading, data: productList } = useQuery({
  queryKey: ["products", pagination],
  queryFn: () =>
    getProducts({
      page: pagination.value.pageIndex + 1,
      item_per_page: pagination.value.pageSize,
    }),
});

const table = useVueTable({
  get data() {
    return productList.value?.data?.data || [];
  },
  // data: productList.value?.data?.data || [],
  columns: columnsProduct,
  getCoreRowModel: getCoreRowModel(),
  manualPagination: true,
  // pageCount: productList.value?.data?.total || 0,
  get pageCount() {
    return productList.value?.data?.total || 0;
  },
  state: {
    get pagination() {
      return pagination.value;
    },
  },
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === "function" ? updater(pagination.value) : updater;
  },
});

console.log(productList.value?.data?.data);
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else class="px-4 sm:px-6 lg:px-8">
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="my-4">
            <input
              type="text"
              class="border border-gray-400 rounded px-2 py-2"
              placeholder="Search"
            />
          </div>
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
              <tr
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  scope="col"
                  class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  :class="{
                    'cursor-pointer select-none': header.column.getCanSort(),
                  }"
                  @click="header.column.getToggleSortingHandler()?.($event)"
                >
                  <FlexRender
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                  {{ { asc: " ↑", desc: "↓" }[header.column.getIsSorted()] }}
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr v-for="row in table.getRowModel().rows" :key="row.id">
                <td v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="mt-8">
        Page {{ table.getState().pagination.pageIndex + 1 }} of
        {{ table.getPageCount() }} -
        {{ table.getFilteredRowModel().rows.length }} results
      </div>
      <div class="mt-8 space-x-4">
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageSize(5)"
        >
          Page Size 5
        </button>
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageSize(10)"
        >
          Page Size 10
        </button>
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageSize(20)"
        >
          Page Size 20
        </button>
      </div>
      <select @change="onChangePageSize" v-model="selectPageSize">
        <option v-for="pageSize in rangePageSize" :key="pageSize">
          {{ pageSize }}
        </option>
      </select>
      <div class="space-x-4 mt-8">
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageIndex(0)"
        >
          First page
        </button>
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          @click="table.setPageIndex(table.getPageCount() - 1)"
        >
          Last page
        </button>
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Prev page
        </button>
        <button
          class="border border-gray-300 rounded px-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next page
        </button>
      </div>
    </div>
  </div>
</template>
