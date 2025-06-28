import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const authCookie = req.cookies.get("task");
  const url = req.nextUrl.clone();
  const publicPaths = ["/auth", "/login", "/"];
  const isPublicPath = publicPaths.includes(url.pathname);

  if (!isPublicPath && !authCookie?.value) {
    url.pathname = "/auth";
    return NextResponse.redirect(url);
  }
  if (authCookie?.value) {
    try {
      const userData = JSON.parse(authCookie.value);
      if (isPublicPath && userData?.title) {
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
      }
      if (!userData?.title && !isPublicPath) {
        url.pathname = "/auth";
        const response = NextResponse.redirect(url);
        response.cookies.delete("task");
        return response;
      }
    } catch (e) {
      url.pathname = "/auth";
      const response = NextResponse.redirect(url);
      response.cookies.delete("task");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
