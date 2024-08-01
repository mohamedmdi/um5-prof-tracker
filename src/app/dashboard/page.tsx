
import AddButton from "@/components/ui/dashboard/add";
import React from "react";
import { DataTable } from "../dashboardv/data-table";
import { columns } from "../dashboardv/columns";
import axios from "axios";

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
  const data = await getProfs()
    .then((data) => data)
    .catch((error) => error);
  return (
    <main className="flex flex-col items-center justify-between p-16">
      <AddButton/>
      <div className="w-full">
        <div className="py-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <div className="relative z-[-1] flex place-items-center"></div>
    </main>
  );
}
