import { cn } from "@/lib/utils";

const Footer = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer className={cn("w-full py-2 bg-sky-700", className)}>
      <div className="container mx-auto">
        <p className="text-center text-sm font-semibold text-white">
          FSJES-SOUISSI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
