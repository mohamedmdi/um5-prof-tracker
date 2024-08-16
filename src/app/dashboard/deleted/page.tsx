import AddButton from "@/components/ui/dashboard/add";
import React from "react";
import { DataTable } from "../../dashboard/data-table";
import { Prof } from "../../dashboard/columns";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Trash2 } from "lucide-react";

async function getProfs() {
  "use server";
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/profs/deleted"
    );
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
        <div className="flex flex-row gap-2 w-full">
          <Trash2 className="text-red-500 w-8 h-8" />
          <span className="font-bold text-2xl text-left text-red-500 uppercase">
            Les Profs supprimés
          </span>
        </div>
      </div>
      <div className="w-full">
        <div className="py-4">
          <DataTable data={data} isDeleted={true} />
        </div>
      </div>
      <div className="relative z-[-1] flex place-items-center"></div>
    </div>
  );
}
