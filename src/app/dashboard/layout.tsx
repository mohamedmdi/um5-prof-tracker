import Header from "@/components/ui/dashboard/header";
import Footer from "@/components/ui/dashboard/footer";

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Header />

      <div className="container mx-auto p-0">{children}</div>

      <Footer/>
    </div>
  );
}
