"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AddButton({ className }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <Link href="/profs/add" className="w-full flex flex-row justify-center">
        <Button className="w-full flex flex-row justify-center">
          <Plus /> Ajouter un prof
        </Button>
      </Link>
    </div>
  );
}
