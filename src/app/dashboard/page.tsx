// Suggested code may be subject to a license. Learn more: ~LicenseLog:2310970598.
"use client";
import { Button } from "@/components/ui/button";
import { EmailsignOut } from "@/lib/auth";
import Link from "next/link";
import * as React from "react";
import { auth } from "@/lib/firebase";
import { useCookies } from "next-client-cookies";
import { useAuth } from "@/hooks/useAuth";
import { UID_COOKIE_NAME } from "@/lib/constants";

export default function Dashboard() {
  const cookies = useCookies();
  const UID = cookies.get(UID_COOKIE_NAME) ?? null;
  const userSessionId = useAuth(UID);

  const user = auth.currentUser;
  return (
    <main className="flex flex-col items-center justify-between p-24 bg-green-300">
      <div className="z-10 w-full max-w-5xl items-center justify-evenly font-mono text-sm lg:flex">
        <Link href="/">
          <Button>Home</Button>
          <Button
            onClick={() => {
              EmailsignOut();
            }}
          >
            Logout
          </Button>
          <Button
            onClick={() => {
              console.log(user);
            }}
          >
            Check User
          </Button>
        </Link>
      </div>
      <div className="relative z-[-1] flex place-items-center"></div>
    </main>
  );
}
