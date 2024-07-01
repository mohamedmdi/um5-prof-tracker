import Image from "next/image";
import Link from "next/link";

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="w-full bg-red-400">
        <header className="container mx-auto h-16 flex justify-between items-center">
          <Image src={"/unnamed.gif"} alt="Logo" width={80} height={80} />
        </header>
      </div>
      <div className="container mx-auto">{children}</div>

      <footer className="w-full h-12 bg-sky-700">
        <div className="container mx-auto" >
          <p> </p>
        </div>
      </footer>
    </div>
  );
}
