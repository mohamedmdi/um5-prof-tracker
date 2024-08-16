import { type NextRequest, NextResponse } from "next/server";
import {
  HOME_ROUTE,
  ACCOUNT_ROUTE,
  PROFS_ROUTE,
  ROOT_ROUTE,
  SESSION_COOKIE_NAME,
  UID_COOKIE_NAME,
} from "@/lib/constants";
import axios from "axios";

const protectedRoutes = [HOME_ROUTE, ACCOUNT_ROUTE, PROFS_ROUTE];

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/auth",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) return error.response?.status || 500;
  }
};

export default async function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || "";
  const isVerified = session ? await verifyToken(session) : null;

  if (request.nextUrl.pathname.includes("/api/profs")) {
    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/") {
    if (session && isVerified == 200)
      return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
    return NextResponse.next();
  }

  if (
    protectedRoutes.some((route) => request.nextUrl.pathname.includes(route))
  ) {
    if (!session || isVerified == 401 || isVerified == 500)
      return NextResponse.redirect(new URL(ROOT_ROUTE, request.url));
    if (
      request.nextUrl.pathname.includes("/modify") &&
      !request.nextUrl.search
    ) {
      return NextResponse.redirect(new URL(HOME_ROUTE, request.url));
    }
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/((?!static|.*\\..*|_next).*)",
};
