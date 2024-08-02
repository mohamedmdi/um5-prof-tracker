"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { differenceInDays, format } from "date-fns";

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
  const [category, setCategory] = useState<String>("");

  const formSchema = z.object({
    nom: z.string(),
    prenom: z.string(),
    daterec: z
      .string({
        required_error: "Veuillez entrer une date",
      })
      .min(1, {
        message: "Veuillez entrer une date",
      }),
    num: z
      .string()
      .regex(/^(06|07)/, { message: "Le numéro doit commencer par 06 ou 07" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      daterec: "",
      num: "07",
    },
    mode: "onChange",
  });

  const calculateCategory = (date: string) => {
    const diffDate = differenceInDays(new Date(), new Date(date));

    if (diffDate < 1825) setCategory("A");
    else if (diffDate >= 1826 && diffDate < 3650) setCategory("B");
    else if (diffDate >= 3651 && diffDate < 5475) setCategory("C");
    else setCategory("D");
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newValues = {
      ...values,
      daterec: format(values.daterec, "dd/MM/yyyy"),
    };
    console.log(newValues);
    console.log(category);
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
              name="daterec"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date Recrutement</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="JJ/MM/AAAA"
                      className="w-full"
                      onChange={(e) => {
                        const inputDate = new Date(e.target.value);
                        const minDate = new Date("1900-01-01");
                        const maxDate = new Date();
                        if (e.target.value && inputDate >= minDate && inputDate <= maxDate) {
                          calculateCategory(
                            format(e.target.value, "dd/MM/yyyy")
                          );
                          field.onChange(e.target.value);
                        }else {
                          field.onChange("");
                          setCategory("");
                        }
                      }}
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
