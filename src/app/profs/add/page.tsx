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
import { CirclePlus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { setProfs } from "@/actions/profs-actions";
import { formSchema } from "@/lib/utils";

export default function AddProf() {
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState<String>("");
  const [error, setError] = useState<String>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      daterec: "",
      num: "",
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const newValues = {
      ...values,
      daterec: format(values.daterec, "dd/MM/yyyy"),
      cat: category,
    };
    await setProfs(newValues)
      .then((data) => {
        console.log("Add => : data : ", data);
        setSubmitting(false);
      })
      .catch((error) => {
        console.log("Add => : error : ", error);
        setSubmitting(false);
      });
    // console.log(newValues);
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col w-auto md:w-2/5 mt-24">
        <h2 className="text-2xl font-bold uppercase">Ajouter Prof</h2>
      </div>
      <div className="flex flex-col w-auto md:w-2/5 m-5 p-6 border-2 rounded-lg items-center justify-center mt-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="space-y-3">
              <div className="flex flex-row gap-5">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-2 border-slate-300"
                        />
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
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full border-2 border-slate-300"
                        />
                      </FormControl>
                      <FormMessage className="max-w-full" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="daterec"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date de Recrutement </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="JJ/MM/AAAA"
                        className="w-full border-2 border-slate-300"
                        onChange={(e) => {
                          const inputDate = new Date(e.target.value);
                          const minDate = new Date("1900-01-01");
                          const maxDate = new Date();
                          if (
                            e.target.value &&
                            inputDate >= minDate &&
                            inputDate <= maxDate
                          ) {
                            calculateCategory(
                              format(e.target.value, "dd/MM/yyyy")
                            );
                            field.onChange(e.target.value);
                          } else {
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
                  <FormItem className="w-full ">
                    <FormLabel>Numero de telephone</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          const input = e.target.value;
                          const regex = /^(07|06|05)[0-9]{8}$/;
                          if (regex.test(input)) {
                            field.onChange(input);
                            setError("");
                          } else {
                            setError(
                              "Numero n'est pas obligatoire mais, veuillez entrer un Numero valide"
                            );
                            field.onChange("");
                          }
                        }}
                        className="w-full border-2 border-slate-300"
                      />
                    </FormControl>
                    <FormMessage className="max-w-full" />
                    {error && (
                      <div className="mt-1">
                        <span className="text-slate-900 text-sm max-w-full">
                          {error}
                        </span>
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormItem className="w-full">
                {category && (
                  <>
                    <FormLabel>Categorie</FormLabel> <Badge>{category}</Badge>
                  </>
                )}
              </FormItem>
            </div>
            
              <Button
                className={` bg-sky-700 hover:bg-sky-900 flex flex-row justify-center items-center gap-2  ${
                  submitting && " disabled:bg-sky-400"
                }`}
                disabled={submitting}
                type="submit"
              >
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                <CirclePlus />
                Ajouter Prof
              </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
