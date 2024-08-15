"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Link from "next/link";
import axios from "axios";
import { removeProfs, softRemoveProfs } from "@/actions/profs-actions";

export type Prof = {
  id: string;
  nom: string;
  prenom: string;
  cat: "A" | "B" | "C" | "D";
  daterec: string;
  num: string;
};

export function getColums({
  refresh,
  isDeleted,
}: {
  refresh: () => void;
  isDeleted: boolean;
}): ColumnDef<Prof>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "nom",
      accessorKey: "nom",
      header: "Nom",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("nom")}</div>
      ),
    },
    {
      accessorKey: "prenom",
      header: "Prenom",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("prenom")}</div>
      ),
    },
    {
      id: "cat",
      accessorKey: "cat",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Categorie
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("cat")}</div>,
    },
    {
      accessorKey: "daterec",
      sortingFn: (rowA, rowB, columnId) => {
        const dateA = new Date(rowA.getValue(columnId));
        const dateB = new Date(rowB.getValue(columnId));
        return dateA.getTime() - dateB.getTime();
      },
      header: ({ column }) => {
        return (
          <Button
            className="m-0 p-0"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date de Recrutement
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("daterec")}</div>,
    },
    {
      accessorKey: "num",
      header: "Telephone",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("num")}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ table, row }) => {
        const prof = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {!isDeleted && (
                <DropdownMenuItem>
                  <Link
                    className="w-full"
                    href={`/profs/modify/?id=${prof.id}&nom=${
                      prof.nom
                    }&prenom=${prof.prenom}&cat=${
                      prof.cat
                    }&daterec=${prof.daterec.replace(/\//g, "-")}&num=${
                      prof.num
                    }`}
                  >
                    <span className="hover:cursor-pointer hover:bg-slate-100">
                      Modifier
                    </span>
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {isDeleted ? (
                <DropdownMenuItem
                  className="bg-transparent hover:bg-transparent transition-none p-0"
                  onClick={async () => {
                    console.log("Clicked");
                    await softRemoveProfs(prof.id, false).then(() => {
                      refresh();
                      // console.log("Deleted");
                    });
                  }}
                >
                  <span className="text-sky-500 hover:text-sky-600 w-full hover:cursor-pointer p-2 rounded-sm">
                    Récupérer
                  </span>
                </DropdownMenuItem>
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    asChild
                  >
                    <span className="text-red-500 hover:cursor-pointer hover:bg-slate-100">
                      Supprimer
                    </span>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Êtes-vous absolument sûr ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Cette action est irréversible. Elle supprimera
                        définitivement les données.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-600"
                        onClick={async () => {
                          console.log("Clicked");
                          await softRemoveProfs(prof.id, true).then(() => {
                            refresh();
                            // console.log("Deleted");
                          });
                        }}
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
