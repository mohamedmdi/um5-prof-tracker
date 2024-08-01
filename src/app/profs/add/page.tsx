"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

export default function AddProf() {
  const [submitting, setSubmitting] = useState(false);

  const formSchema = z.object({
    nom: z.string(),
    prenom: z.string(),
    cat: z.string().refine((value) => ["A", "B", "C", "D"].includes(value), {
      message: "La Categorie doit être A, B, C ou D",
    }),
    daterec: z.string(),
    num: z
      .string()
      .regex(/^(06|07)/, { message: "Le numéro doit commencer par 06 ou 07" }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      cat: "",
      daterec: "",
      num: "07",
    },
    mode: "onChange",
  });

  const formatDate = (dateString : string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    values = {
      ...values,
      daterec: formatDate(values.daterec)
    };
    console.log(values);
  }


  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prenom"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Prenom</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cat"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Categorie</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectionez une categorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="daterec"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date Recrutement</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Selectionez une date"
                      value={field.value}
                      onChange={(e) => field.onChange(formatDate(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Numero</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage className="max-w-full" />
                </FormItem>
              )}
            />
          </div>
          <Button
            className={` w-full bg-sky-700 hover:bg-sky-900  ${
              submitting && " disabled:bg-sky-400"
            }`}
            disabled={submitting}
            type="submit"
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
