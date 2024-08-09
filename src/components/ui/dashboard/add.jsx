"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddButton() {
  const router = useRouter()
  return (
    <div className="flex flex-col">
      <Button >
        <Link href="/profs/add">Add Prof</Link>
      </Button>
    </div>
  );
}