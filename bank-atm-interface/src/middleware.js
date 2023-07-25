import { NextResponse } from "next/server";

export function middleware(request) {
  let cookies = request.cookies.getAll();

  const response = NextResponse.next();
  cookies.forEach((cookie) => response.cookies.set(cookie));
}
