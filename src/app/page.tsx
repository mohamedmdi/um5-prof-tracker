import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function Home() {
  const querySnapshot = await getDocs(collection(db, "profslist"));
  const data = querySnapshot.docs.map((doc) => doc.data());

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-evenly font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Go to &nbsp;
          <Link href="/test">Test</Link>
        </p>
        <Link href="/test">
          <Button>Create Account</Button>
        </Link>
      </div>
      <div className="relative z-[-1] flex place-items-center">
        <ul>
          {data.map((item, index) => (
            <>
              <li key={index}>{item.name}</li>
              <li key={index}>{item.year}</li>
            </>
          ))}
        </ul>
      </div>
    </main>
  );
}
