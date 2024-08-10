import AddButton from "@/components/ui/dashboard/add";
import React from "react";
import { DataTable } from "../dashboard/data-table";
import { Prof } from "../dashboard/columns";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getProfs() {
  "use server";
  try {
    const response = await axios.get("http://localhost:3000/api/profs");
    return response.data.profs;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}

export default async function Dashboard() {
  const data: Prof[] = await getProfs()
    .then((data) => data)
    .catch((error) => error);
  return (
    <div className="flex flex-col items-center p-16 flex-1">
      <div className="flex flex-col gap-2 w-full">
        <AddButton className="mx-36" />
      </div>
      <div className="w-full">
        <div className="py-4">
          <DataTable data={data} isDeleted={false} />
        </div>
      </div>
      <div className="relative z-[-1] flex place-items-center"></div>
    </div>
  );
}
