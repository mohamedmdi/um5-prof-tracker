"use server";

import { formSchema } from "@/lib/utils";
import axios from "axios";
import { z } from "zod";

export async function setProfs(values: z.infer<typeof formSchema>) {
  "use server";
  try {
    const response = await axios.post(
      "http://localhost:3000/api/profs",
      values
    );
    console.log("Add => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}
export async function modifyProfs(values : any) {
  "use server";
  try {
    console.log("Modify => : values : ", values);
    const response = await axios.put("http://localhost:3000/api/profs", values);
    console.log("Modify => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}

export async function removeProfs(id : any) {
  "use server";
  try {
    console.log("Delete => : values : ", id);
    const response = await axios.delete(`http://localhost:3000/api/profs/`, {
      data: { id: id },
    })
    console.log("Modify => : response.data : ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
}
