import Header from "@/components/ui/dashboard/header";
import Footer from "@/components/ui/dashboard/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - UM5-FSJES Gestion Profs"
};

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <div className="flex-1">
        <Header />
        <div className="container mx-auto p-0">{children}</div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
