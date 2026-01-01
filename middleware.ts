import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "-";
  const originalIp = request.headers.get("cf-connecting-ip") || clientIp;
  const timestamp = new Date().toUTCString();
  const method = request.method;
  const url = request.url;
  const proto = "HTTP/1.1";
  const referer = request.headers.get("referer") || "-";
  const userAgent = request.headers.get("user-agent") || "-";

  console.log(
    `${originalIp} - - [${timestamp}] "${method} ${url} ${proto}" - - "${referer}" "${userAgent}" "${clientIp}"`,
  );

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
