"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { differenceInDays, format } from "date-fns";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { setProfs } from "@/actions/profs-actions";
import { fileSchema, FormValues } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { FormData } from "@/lib/utils";
import * as XLSX from "xlsx";

export default function BulkAdd() {
  const [submitting, setSubmitting] = useState(false);
  const [excelData, setExcelData] = useState<FormData[]>([]);

  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(fileSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const { setError, clearErrors } = form;

  const calculateCategory = (date: string) => {
    const diffDate = differenceInDays(new Date(), new Date(date));
    console.log(diffDate);
    if (diffDate <= 1825) return "A";
    if (diffDate <= 3650) return "B";
    if (diffDate <= 5475) return "C";
    return "D";
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (r) => {
        if (!r.target?.result) {
          console.error("File Reader result is empty!");
          return;
        }
        const data = new Uint8Array(r.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); //get all the rows including the HEADERS
        const headers = rows[0] as string[];
        const requiredHeaders = ["nom", "prenom", "num", "daterec"];

        const isExactMatch = 
          headers.length === requiredHeaders.length &&
          headers.every((header, index) => header === requiredHeaders[index]); //check if the headers are the same as the required

        if (isExactMatch) {
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            defval: "",
            blankrows: false,
            raw: false,
          });//get all the rows with the headers as Keys

          const validatedData: FormData[] = jsonData.map((row: any) => {
            let formattedDate = "";
            if (row.daterec) {
              const [day, month, year] = row.daterec.split("/");
              formattedDate = `${month}/${day}/${year}`;
            } //reformat the date only for calculation the category
            return {
              ...row,
              cat: calculateCategory(formattedDate),
            } as FormData;
          });
          setExcelData(validatedData);
        } else {
          setError("file", {
            type: "manual",
            message:
              'Les en-têtes de fichier Excel ne correspondent pas au format requis! "nom" "prenom" "num" "daterec"',
          }); // Set custom error
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };
  async function onSubmit() {
    setSubmitting(true);
    await setProfs(excelData)
      .then((data) => {
        console.log("Add => : data : ", data);
        setSubmitting(false);
        router.push("/dashboard");
        router.refresh();
      })
      .catch((error) => {
        console.log("Add => : error : ", error);
        setSubmitting(false);
      });

    console.log(excelData);
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col w-auto md:w-2/5 mt-10">
        <h2 className="text-2xl font-bold uppercase">Ajouter en masse</h2>
      </div>
      <div className="flex flex-col w-auto md:w-2/5 m-5 p-6 border-2 rounded-lg items-center justify-center mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              name="file"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Charger le fichier Excel</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      className="w-full border-2 border-slate-300"
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        handleFileUpload(e);
                        field.onChange(file); // Set file in React Hook Form
                      }}
                      accept=".xls,.xlsx"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={` bg-sky-700 hover:bg-sky-900 flex flex-row justify-center items-center gap-2  ${
                submitting && " disabled:bg-sky-400"
              }`}
              disabled={submitting}
              type="submit"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Plus />
              Ajouter Les Profs
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
