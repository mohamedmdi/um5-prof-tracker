import { type ClassValue, clsx } from "clsx";
import { differenceInDays } from "date-fns";

import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formSchema = z.object({
  nom: z.string().min(1, {
    message: "Veuillez entrer un nom valide",
  }),
  prenom: z.string().min(1, {
    message: "Veuillez entrer un prénom valide",
  }),
  daterec: z
    .string({
      required_error: "Veuillez entrer une date valide",
    })
    .min(1, {
      message: "Veuillez entrer une date valide",
    }),
  num: z.string().optional(),
});

export const calculateCategory = (date: string) => {
  const diffDate = differenceInDays(new Date(), new Date(date));

  if (diffDate < 1825) return "A";
  else if (diffDate < 3650) return "B";
  else if (diffDate < 5475) return "C";
  else return "D";
};
