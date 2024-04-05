import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/apis/products";
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import { columns } from "./columns";
import { Link, useSearchParams } from "react-router-dom";

function Product() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsObject = Object.fromEntries([...searchParams]);

  const [pagination, setPagination] = useState({
    pageIndex: searchParamsObject.page
      ? parseInt(searchParamsObject.page) - 1
      : 0,
    pageSize: searchParamsObject.item_per_page
      ? parseInt(searchParamsObject.item_per_page)
      : 10,
  });

  useEffect(() => {
    setPagination({
      pageIndex: searchParamsObject.page
        ? parseInt(searchParamsObject.page) - 1
        : 0,
      pageSize: searchParamsObject.item_per_page
        ? parseInt(searchParamsObject.item_per_page)
        : 10,
    });
  }, [searchParamsObject, searchParams]);

  const { data: productData, isLoading } = useQuery({
    queryKey: ["products", pagination],
    queryFn: () =>
      getProducts({
        page: pagination.pageIndex + 1,
        item_per_page: pagination.pageSize || 10,
      }),
  });

  const table = useReactTable({
    data: productData?.data?.data || [],
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: productData?.data?.total || 0, //data.total
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    // autoResetPageIndex:true, //reset page sau khi search, pagination...
    debugTable: true,
  });

  return (
    <>
      {isLoading && "loading..."}
      {productData && productData.data.data.length > 0 ? (
        <div className="p-2">
          <div className="h-2" />
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="h-2" />
          {/* <DataTablePagination table={table} /> */}
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <Link
              to={`/products?page=${
                table.getState().pagination.pageIndex
              }&item_per_page=${table.getState().pagination.pageSize}`}
            >
              <button>pre</button>
            </Link>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <Link
              to={`/products?page=${
                table.getState().pagination.pageIndex + 2
              }&item_per_page=${table.getState().pagination.pageSize}`}
            >
              <button>next</button>
            </Link>
            <button
              className="border rounded p-1"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                // table.setPageSize(Number(e.target.value));

                setSearchParams({
                  ...searchParamsObject,
                  item_per_page: e.target.value,
                });
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
            {/* {isFetching ? "Loading..." : null} */}
          </div>
          <div>{table.getRowModel().rows.length} Rows</div>
          <div>
            <button onClick={() => rerender()}>Force Rerender</button>
          </div>
          <pre>{JSON.stringify(pagination, null, 2)}</pre>
        </div>
      ) : (
        "None results"
      )}
      <button onClick={() => setSearchParams({ test: [1, 2, 3] })}>
        Tesst array
      </button>
    </>
  );
}

export default Product;
