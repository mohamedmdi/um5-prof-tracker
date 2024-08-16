"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  HOME_ROUTE,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
  UID_COOKIE_NAME,
} from "@/lib/constants";
import { customInitApp } from "@/lib/firebase-admin-config";
import { getAuth } from "firebase-admin/auth";
import axios from "axios";

customInitApp();

export async function createSession({
  idToken,
  userId,
}: {
  idToken: string;
  userId: string;
}) {
  let path: string = "/";
  const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days
  try {
    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn,
    });
    // Set the cookie
    cookies().set(SESSION_COOKIE_NAME, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn,
      path: "/",
    });
    cookies().set(UID_COOKIE_NAME, userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn,
      path: "/",
    });
    // Set the userId

    // Redirect after setting the cookie
    path = "/dashboard";
  } catch (error) {
    console.error("Error creating session cookie:", error);
  }
  redirect(path);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME);
  cookies().delete(UID_COOKIE_NAME);

  redirect(ROOT_ROUTE);
}

export const verifySession = async (token: string) => {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
};
