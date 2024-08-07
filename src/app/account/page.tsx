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
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Account() {
  const cookies = useCookies();
  const UID = cookies.get(UID_COOKIE_NAME) ?? null;
  const userSessionId = useAuth(UID);
  const user = auth.currentUser;
  const [nom, setNom] = useState("");

  useEffect(() => {
    if (user?.displayName) {
      setNom(user.displayName);
    }
  }, [user]);

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
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer le mot de passe</Button>
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
                  <span id="email" className="text-muted-foreground font-semibold">
                    {" "}
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
              <Button
                disabled={!nom}
                onClick={() => {
                  if (user) {
                    updateProfile(user, {
                      displayName: nom,
                    })
                      .then(() => {
                        console.log("Profile updated!");
                        toast("votre compte a été mis à jour", {
                          dismissible: true,
                        });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                }}
              >
                Sauvegarder
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
