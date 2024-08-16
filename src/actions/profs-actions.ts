"use server";

import { formSchema } from "@/lib/utils";
import axios from "axios";
import { headers } from "next/headers";
import { z } from "zod";

export async function setProfs(values: z.infer<typeof formSchema>) {
  "use server";
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/profs",
      values,
      {
        headers: {
          authorization: true,
        },
      }
    );
    console.log("Add => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}
export async function modifyProfs(values: any) {
  "use server";
  try {
    // console.log("Modify => : values : ", values);
    const response = await axios.put(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/profs",
      values,
      {
        headers: {
          authorization: true,
        },
      }
    );
    // console.log("Modify => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}

export async function removeProfs(id: any) {
  "use server";
  try {
    console.log("Delete => : values : ", id);
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/profs/`,
      {
        headers: {
          Authorization: true,
        },
        data: { id: id },
      }
    );
    console.log("Modify => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}
export async function softRemoveProfs(id: any, isDeleted: boolean) {
  "use server";
  try {
    const response = await axios.patch(
      process.env.NEXT_PUBLIC_BASE_URL + `/api/profs/`,
      { id: id, isDeleted },
      {
        headers: {
          Authorization: true,
        },
      }
    );
    console.log("Soft Delete => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}
