import { type ClassValue, clsx } from "clsx";
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
  num: z
    .string()
    .optional(),
});
