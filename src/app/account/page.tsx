"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { UID_COOKIE_NAME } from "@/lib/constants";
import { useCookies } from "next-client-cookies";
import { auth } from "@/lib/firebase";
import { updatePassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Account() {
  const cookies = useCookies();
  const UID = cookies.get(UID_COOKIE_NAME) ?? null;
  const userSessionId = useAuth(UID);
  const user = auth.currentUser;
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submited, setSubmited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.displayName) {
      setNom(user.displayName);
    }
  }, [user]);

  const handlePasswordChange = () => {
    if (password && user) {
      setSubmited(true);
      updatePassword(user, password)
        .then(() => {
          setSubmited(false);
          toast("votre mot de passe a été mis à jour", {
            dismissible: true,
          });
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        })
        .catch((error) => {
          setSubmited(false);
          setError(error.code);
          console.log(error);
        });
    }
  };
  const handleProfileChange = () => {
    if (nom && user) {
      setSubmited(true);
      updateProfile(user, {
        displayName: nom,
      })
        .then(() => {
          console.log("Profile updated!");
          toast("votre compte a été mis à jour", {
            dismissible: true,
          });
          setSubmited(false);
          router.refresh();
        })
        .catch((error) => {
          console.error(error);
          setSubmited(false);
        });
    }
  };
  return (
    <div className="flex flex-col items-center flex-1 mt-24">
      <Tabs defaultValue="password" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="password">Mot de passe</TabsTrigger>
          <TabsTrigger value="account">Mon Compte</TabsTrigger>
        </TabsList>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Mot de passe</CardTitle>
              <CardDescription>
                Modifiez votre mot de passe ici. Après avoir enregistré, vous
                serez déconnecté.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input
                  id="new"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col gap-2">
                <Button
                  disabled={submited}
                  className="max-w-min"
                  onClick={handlePasswordChange}
                >
                  Enregistrer le mot de passe
                </Button>
                {error && (
                  <span className="text-red-500 text-center font-semibold text-md">
                    {error}
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Mon Compte</CardTitle>
              <CardDescription>
                Apportez ici des modifications à votre compte. Cliquez sur
                Enregistrer lorsque vous avez terminé.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row items-baseline gap-3">
                  <Label htmlFor="email">Email: </Label>
                  <span
                    id="email"
                    className="text-muted-foreground font-semibold"
                  >
                    {user?.email}{" "}
                  </span>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name">Nom</Label>
                  <Input
                    id="name"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={!nom || submited} onClick={handleProfileChange}>
                Sauvegarder
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
