"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { use, useEffect, useState } from "react";
import { differenceInDays, format, parse, set } from "date-fns";
import { CirclePlus, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { modifyProfs, setProfs } from "@/actions/profs-actions";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function AddProf() {
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState<String | null>("");
  const [error, setError] = useState<String>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [prof, setProf] = useState<any>({
    id: "",
    nom: "",
    prenom: "",
    daterec: "",
    num: "",
  });

  const daterec = searchParams.get("daterec");

  useEffect(() => {
    if (daterec) {
      const parts = daterec.split("-");
      const formattedDateRec = `${parts[2]}-${parts[1]}-${parts[0]}`;

      setProf({
        ...prof,
        id: searchParams.get("id"),
        nom: searchParams.get("nom"),
        prenom: searchParams.get("prenom"),
        daterec: formattedDateRec,
        num: searchParams.get("num"),
      });
      calculateCategory(daterec);
    }
  }, [daterec]);

  const calculateCategory = (date: string | null) => {
    if (date) {
      const diffDate = differenceInDays(new Date(), new Date(date));
      if (diffDate <= 1825) setCategory("A");
      else if (diffDate >= 1826 && diffDate < 3650) setCategory("B");
      else if (diffDate >= 3651 && diffDate < 5475) setCategory("C");
      else setCategory("D");
    }
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prof) {
      setSubmitting(true);
      var newValues = {
        ...prof,
        daterec: format(prof.daterec, "dd/MM/yyyy"),
        cat: category,
      };
      await modifyProfs(newValues)
        .then(() => {
          setSubmitting(false);
          toast("Les informations du prof ont été modifiées avec succès", {
            dismissible: true,
          });

          router.push("/dashboard");
          router.refresh();

          console.log("OK");
        })

        .catch((error) => {
          console.log("Add => : error : ", error);
          setSubmitting(false);
        });
    }
  }

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex flex-col w-auto md:w-2/5 mt-24">
        <h2 className="text-2xl font-bold uppercase">Modifier Prof</h2>
      </div>
      <div className="flex flex-col w-auto md:w-2/5 m-5 p-6 border-2 rounded-lg items-center justify-center mt-5">
        <form onSubmit={onSubmit} className="space-y-8 w-full">
          <div className="space-y-3">
            <div className="flex flex-row gap-5">
              <div className="flex flex-col items-start space-y-2 w-full">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={prof.nom}
                  onChange={(e) => {
                    setProf({ ...prof, nom: e.target.value });
                  }}
                  className="w-full border-2 border-slate-300"
                />
              </div>
              <div className="flex flex-col items-start space-y-2  w-full">
                <Label htmlFor="prenom">Prenom</Label>

                <Input
                  id="prenom"
                  value={prof.prenom}
                  onChange={(e) => {
                    setProf({ ...prof, prenom: e.target.value });
                  }}
                  className="w-full border-2 border-slate-300"
                />
              </div>
            </div>

            <div className="flex flex-col items-start space-y-2  w-full">
              <Label htmlFor="date">Date de Recrutement</Label>
              <Input
                id="date"
                type="date"
                value={prof.daterec}
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
                    calculateCategory(format(e.target.value, "dd/MM/yyyy"));
                    setProf({ ...prof, daterec: e.target.value });
                  } else {
                    setProf({ ...prof, daterec: e.target.value });
                    setCategory("");
                  }
                }}
              />
            </div>
            <div className="flex flex-col items-start space-y-2  w-full">
              <Label htmlFor="num">Numero de Telephone</Label>
              <Input
                id="num"
                value={prof.num}
                onChange={(e) => {
                  setProf({ ...prof, num: e.target.value });
                }}
                className="w-full border-2 border-slate-300"
              />
            </div>
            {error && (
              <div className="mt-1">
                <span className="text-slate-900 text-sm max-w-full">
                  {error}
                </span>
              </div>
            )}
          </div>
          <div className="">
            <div className="w-full">
              {category && (
                <>
                  <span>Categorie</span> <Badge>{category}</Badge>
                </>
              )}
            </div>
          </div>

          <Button
            className={` bg-sky-700 hover:bg-sky-900 flex flex-row justify-center items-center gap-2  ${
              submitting && " disabled:bg-sky-400"
            }`}
            disabled={submitting}
            type="submit"
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <CirclePlus />
            Modifier Les Info
          </Button>
        </form>
      </div>
    </main>
  );
}
