"use client";

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Download } from "lucide-react";
import { getColums, Prof } from "./columns";
import { useRouter } from "next/navigation";
import { InputButton } from "@/components/ui/inputButton";
import { generateCsv, download } from "export-to-csv";
import { csvConfig } from "@/lib/utils";

export function DataTable({
  data,
  isDeleted,
}: {
  data: Prof[];
  isDeleted: boolean;
}) {
  const router = useRouter();

  const columns = getColums({
    refresh: () => {
      router.refresh();
    },
    isDeleted,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 20, //default page size
  });

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable<Prof>({
    data,
    columns,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  type Category = "A" | "B" | "C" | "D";

  const categories: Category[] = ["A", "B", "C", "D"];

  const [filteredCat, setFilteredCat] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
  });
  const exportCVS = (rows: any) => {
    const fieldsToRemove = ["createdAt", "isDeleted", "id"];
    const rowData = rows.map((row : any) => {
      fieldsToRemove.forEach((field) => {
        delete row.original[field];
      });
      return row.original;
    });
    console.log(rowData);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
  const filterCategory = (cat: Category) => {
    // Toggle the selected category
    const updatedFilteredCat: any = {
      ...filteredCat,
      [cat]: !filteredCat[cat],
    };

    setFilteredCat(updatedFilteredCat);

    // Get the list of active categories
    const activeCategories = categories.filter(
      (key) => updatedFilteredCat[key]
    );

    // If no categories are selected, clear the filter
    if (activeCategories.length === 0) {
      table.getColumn("cat")?.setFilterValue(undefined); // Clears the filter
    } else {
      table.getColumn("cat")?.setFilterValue(activeCategories);
    }
  };
  return (
    <div className="rounded-md border">
      <div className="m-4">
        <div className="flex py-4 items-start flex-col md:flex-row md:gap-2 gap-1 md:justify-between justify-center w-full">
          <div className="flex flex-row gap-2">
            <InputButton
              placeholder="Filter par nom..."
              value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("nom")?.setFilterValue(event.target.value)
              }
              className="pr-10 py-2 border border-gray-300 rounded-md"
              click={() => table.getColumn("nom")?.setFilterValue("")}
              show={table.getColumn("nom")?.getFilterValue() ? true : false}
              icon={
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
            />
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Filtrer Categorie <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Categeorie</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((cat, index) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={index}
                        className="capitalize"
                        checked={filteredCat[cat]}
                        onCheckedChange={() => {
                          filterCategory(cat);
                        }}
                      >
                        {cat}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div>
            <div className="flex flex-row gap-2">
              {table.getIsAllPageRowsSelected() ||
              table.getIsSomePageRowsSelected() ? (
                <div
                  onClick={() => {
                    exportCVS(table.getFilteredRowModel().rows);
                  }}
                  className="bg-emerald-500 flex flex-row items-center gap-1 p-1 px-2 bg-opacity-50 hover:bg-opacity-100 transition-all duration-100 ease-in-out rounded-xl cursor-pointer"
                >
                  <Download />
                  <span className="font-semibold">Exporter en Excel</span>
                </div>
              ) : null}

              <div
                onClick={() => router.refresh()}
                className="flex flex-row max-w-min items-center gap-1 p-1 px-2 bg-slate-200 bg-opacity-50 hover:bg-opacity-100 transition-all duration-100 ease-in-out rounded-xl cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12.077 19q-2.931 0-4.966-2.033q-2.034-2.034-2.034-4.964t2.034-4.966T12.077 5q1.783 0 3.339.847q1.555.847 2.507 2.365V5.5q0-.213.144-.356T18.424 5t.356.144t.143.356v3.923q0 .343-.232.576t-.576.232h-3.923q-.212 0-.356-.144t-.144-.357t.144-.356t.356-.143h3.2q-.78-1.496-2.197-2.364Q13.78 6 12.077 6q-2.5 0-4.25 1.75T6.077 12t1.75 4.25t4.25 1.75q1.787 0 3.271-.968q1.485-.969 2.202-2.573q.085-.196.274-.275q.19-.08.388-.013q.211.067.28.275t-.015.404q-.833 1.885-2.56 3.017T12.077 19"
                  />
                </svg>
                <span className="font-semibold">Actualiser</span>
              </div>
            </div>
          </div>
        </div>
        <Table className="overflow-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        cell.column.id == "cat" || cell.column.id == "nom"
                          ? "font-semibold"
                          : ""
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} ligne(s) sélectionnée(s).
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="select-none"
            >
              <span className="select-none">Précédent</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="select-none"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
