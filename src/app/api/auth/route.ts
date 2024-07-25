import { auth } from "firebase-admin";
import { customInitApp } from "@/lib/firebase-admin-config";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE_NAME } from "@/lib/constants";
// import { getAuth } from "firebase-admin/auth";

customInitApp();

export async function GET(request: NextRequest) {
  // const session = cookies().get(SESSION_COOKIE_NAME)?.value || "";
  const token = headers().get("Authorization")?.split(" ")[1] || "";

  //Validate if the cookie exist in the request
  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // //Use Firebase Admin to validate the session cookie
  // getAuth
  const decodedClaims = await auth().verifySessionCookie(token, true);
  console.log("************* decodedClaims *************: "+ decodedClaims);

  
  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
