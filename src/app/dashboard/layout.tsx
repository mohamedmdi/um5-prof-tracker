import Header from "@/components/ui/dashboard/header";
import Footer from "@/components/ui/dashboard/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - UM5-FSJES Gestion Profs",
};

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 w-full bg-white z-10">
        <Header />
      </header>
      <main className="flex-1 flex flex-col">
        <div className="md:container mx-auto p-0 flex-1 flex justify-center">
          {children}
        </div>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
}
