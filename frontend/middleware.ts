// TODO: test this to make sure it works

import { auth } from "@/lib/auth";
import { URLS } from "@/lib/urls";
import { NextResponse } from "next/server";

const protectedPaths = [""];

export default auth(
  (req: {
    nextUrl: { pathname: any };
    auth: any;
    url: string | URL | undefined;
  }) => {
    const { pathname } = req.nextUrl;

    const isProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    if (isProtectedPath && !req.auth) {
      const signInUrl = new URL(URLS.signIn, req.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }
);

export const config = {
  matcher: [""],
};
