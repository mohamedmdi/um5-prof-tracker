import Header from "@/components/ui/dashboard/header";
import Footer from "@/components/ui/dashboard/footer";

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
