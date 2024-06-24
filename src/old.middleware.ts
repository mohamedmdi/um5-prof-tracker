// import { type NextRequest, NextResponse } from 'next/server';
// import { HOME_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/lib/constants';

// const protectedRoutes = [HOME_ROUTE];

// export default function middleware(request: NextRequest) {
//   // const session = request.cookies.get(SESSION_COOKIE_NAME)?.value || '';
//   return NextResponse.redirect(new URL('/', request.url))


//   // // Redirect to login if session is not set
//   // if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
//   //   const absoluteURL = new URL(ROOT_ROUTE, request.nextUrl.origin);
//   //   return NextResponse.redirect(absoluteURL.toString());
//   // }

//   // // Redirect to home if session is set and user tries to access root
//   // if (session && request.nextUrl.pathname === ROOT_ROUTE) {
//   //   const absoluteURL = new URL(HOME_ROUTE, request.nextUrl.origin);
//   //   return NextResponse.redirect(absoluteURL.toString());
//   // }
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname != '/'){
    return NextResponse.rewrite(new URL('/', request.url))
  }
}