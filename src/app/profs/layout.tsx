import Header from "@/components/ui/dashboard/header";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function layoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable}`}>
      <Header />
      {children}
      <Toaster />
    </div>
  );
}
