import Header from "@/components/ui/dashboard/header";
import Footer from "@/components/ui/dashboard/footer";
import { Toaster } from "sonner";

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="container mx-auto p-0 flex-1 flex">{children}</div>
      </div>
      <Footer className="mt-auto" />
      <Toaster />
    </div>
  );
}
