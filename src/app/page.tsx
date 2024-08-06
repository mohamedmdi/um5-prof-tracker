"use client";
import { Button } from "@/components/ui/button";
import { auth } from "../lib/firebase";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EmailsignOut, signIn } from "@/lib/auth";
import { UID_COOKIE_NAME } from "@/lib/constants";
import { useAuth } from "@/hooks/useAuth";
import { useCookies } from "next-client-cookies";
import { Loader2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const cookies = useCookies();
  const UID = cookies.get(UID_COOKIE_NAME) ?? null;
  const userSessionId = useAuth(UID);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: "Veuillez entrer un email valide",
    }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const user = auth.currentUser;
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(user);
    setSubmitting(true);
    if (user) EmailsignOut();
    signIn(values)
      .then(() => {
        console.log("Signed In");
        router.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        setSubmitting(false);
        setError(error.message);
      });
  }
  
  return (
    <main>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-evenly gap-20 px-20 sm:w-80 sm:px-0 mb-36">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-row items-center justify-center gap-10">
            <Image
              src="/unnamed.gif"
              alt="um5-logo"
              width={144}
              height={144}
              draggable="false"
              />
            <Image
              src="/fsjes-logo.jpg"
              alt="fsjes-logo"
              width={100}
              height={100}
              draggable="false"
              />
              </div>
            <div className="font-inter text-center flex flex-col">
              <h2 className="text-3xl font-bold">Gestion Profs</h2>
              <span className="text-xl font-medium">
                Connectez-vous à votre compte
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 w-full">
              {error && (
                <div className="w-full">
                  <Alert className="w-full" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <span className="text-red-500 text-center font-semibold text-md">
                        {error}
                      </span>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="space-y-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-full" />
                        </FormControl>
                        <FormMessage className="max-w-full" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            className="w-full"
                          />
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
                  {submitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
