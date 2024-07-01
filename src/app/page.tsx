import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import { Input } from "@/components/ui/input"


export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "profslist"));
  const data = querySnapshot.docs.map((doc) => doc.data());

  return (
    <main>
      <div
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <div className="flex flex-col z-10 w-full max-w-5xl items-center justify-evenly font-mono text-sm">
          <div className="flex flex-col items-center justify-center gap-8">
            <Image src="/unnamed.gif" alt="Logo" width={144} height={144} />
            <div className="font-inter text-center flex flex-col gap-2">
              <h2 className="text-3xl font-bold">Gestion Profs</h2>
              <span className="text-xl">Connectez-vous à votre compte</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-8" >
            <input type="email" placeholder="Email" />
            <input className="border"/>
          </div>
        </div>
        {/* <div className="relative z-[-1] flex place-items-center">
        <ul>
          {data.map((item, index) => (
            <div key= {index}>
              <li >{item.name}</li>
              <li >{item.year}</li>
              </div>
              ))}
              </ul>
            </div> */}
      </div>
    </main>
  );
}
