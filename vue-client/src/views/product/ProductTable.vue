<script setup>
import { useQuery } from "@tanstack/vue-query";
import { getProducts } from "@/services/product-service";
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { reactive } from "vue";

const columns = [
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

const paginate = reactive({ page: 1, item_per_page: 5 });

const table = useVueTable({
  get data() {
    return productList?.data?.data;
  },
  get columns() {
    return columns;
  },
  state: {
    // get sorting() { return sorting.value },
    // get columnFilters() { return columnFilters.value },
    // get columnVisibility() { return columnVisibility.value },
    // get rowSelection() { return rowSelection.value },
  },
  //   enableRowSelection: true,
  //   onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
  //   onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
  //   onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
  //   onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   getFacetedRowModel: getFacetedRowModel(),
  //   getFacetedUniqueValues: getFacetedUniqueValues(),
});

const { isLoading, data: productList } = useQuery({
  //   queryKey: ["products", currentPage, item_per_page],
  queryKey: ["products", paginate],
  queryFn: () =>
    getProducts({
      page: paginate.page,
      item_per_page: paginate.item_per_page,
    }),
});
</script>

<template>
  <div class="space-y-4">
    <!-- <DataTableToolbar :table="table" /> -->
    <div class="rounded-md border">
      <Table>
        <!-- <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
              </TableHead>
            </TableRow>
          </TableHeader> -->
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- <DataTablePagination :table="table" /> -->
  </div>
</template>
