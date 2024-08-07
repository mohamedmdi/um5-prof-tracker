"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { EmailsignOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { UID_COOKIE_NAME } from "@/lib/constants";
import { useCookies } from "next-client-cookies";
import { auth } from "@/lib/firebase";
import { Skeleton } from "../skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "../separator";
import { useRouter } from "next/navigation";
import Avatar from "react-avatar";

const Header = () => {
  const cookies = useCookies();
  const UID = cookies.get(UID_COOKIE_NAME) ?? null;
  const userSessionId = useAuth(UID);
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <div className="w-full bg-gray-50 border-b-4 border-sky-700">
      <header className="container mx-auto h-20 flex justify-between items-center ">
        <Image src={"/unnamed.gif"} alt="Logo" width={80} height={80} />
        <div className="flex flex-row space-x-4 font-semibold text-sky-700">
          <Popover>
            <PopoverTrigger asChild>
              {user ? (
                <div className="flex flex-row gap-2 items-center hover:cursor-pointer">
                  <Avatar
                    name={user ? user.displayName : "A"}
                    round={true}
                    size="48"
                  />
                  <Button variant="outline">
                    {user.displayName ? user.displayName : user.email}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-12 w-12 rounded-full bg-slate-300" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-[120px] bg-slate-300" />
                  </div>
                </div>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-full p-3">
              <div className="flex flex-col gap-3">
                <Link
                  href="/account"
                  className="hover:cursor-pointer hover:bg-slate-100 p-2 rounded-md flex flex-row gap-2 items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 21h-4l-.551-2.48a6.991 6.991 0 0 1-1.819-1.05l-2.424.763l-2-3.464l1.872-1.718a7.055 7.055 0 0 1 0-2.1L3.206 9.232l2-3.464l2.424.763A6.992 6.992 0 0 1 9.45 5.48L10 3h4l.551 2.48a6.992 6.992 0 0 1 1.819 1.05l2.424-.763l2 3.464l-1.872 1.718a7.05 7.05 0 0 1 0 2.1l1.872 1.718l-2 3.464l-2.424-.763a6.99 6.99 0 0 1-1.819 1.052z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </g>
                  </svg>
                  <span className="font-semibold text-sm">
                    Parametres du compte
                  </span>
                </Link>
                <Button
                  className="hover:cursor-pointer p-2 rounded-md"
                  variant="outline"
                  onClick={() => {
                    try {
                      EmailsignOut();
                      router.push("/");
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <div className="flex flex-row gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8m4-9l-4-4m4 4l-4 4m4-4H9"
                      />
                    </svg>
                    Déconnecter
                  </div>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  );
};

export default Header;
