"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  return (
    <div className="p-24 flex flex-col items-center justify-center">
      <div className="w-1/2 flex flex-col items-center justify-center gap-5">
        <span>{text}</span>
        <Input
          type="text"
          value={text}
          onChange={(i) => setText(i.target.value)}
        />
      </div>
    </div>
  );
}
