import { type NextRequest, NextResponse } from "next/server";
import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from "@/lib/constants";
import axios from "axios";

const protectedRoutes = [HOME_ROUTE];

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get("http://localhost:3000/api/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
};

export default async function middleware(request: NextRequest) {
  // const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  // const isVerified = await verifyToken(session);

  // if (request.nextUrl.pathname === "/") {
  //   if (session && isVerified == 200)
  //     return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
  //   return NextResponse.next();
  // }

  // if (protectedRoutes.includes(request.nextUrl.pathname)) {
  //   if (!session || isVerified == 401 || isVerified == 500)
  //     return NextResponse.redirect(new URL("/", request.url));
  //   return NextResponse.next();
  // }
  return NextResponse.next();
  
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};