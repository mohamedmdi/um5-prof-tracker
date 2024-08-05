"use clinet"
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { EmailsignOut } from "@/lib/auth";

const Header = () => {
  return (
    <div className="w-full bg-gray-50 border-b-4 border-sky-700">
      <header className="container mx-auto h-20 flex justify-between items-center ">
        <Image src={"/unnamed.gif"} alt="Logo" width={80} height={80} />

        <ul className="flex flex-row space-x-4 font-semibold text-sky-700">
          <li className="hover:text-sky-500">
            <Link href="/dashboard">Mohamed</Link>
          </li>
          <li className="hover:text-sky-500">
            {/* <Button onClick={()=>{
              EmailsignOut()
            }}>
              Log Out
            </Button> */}
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
