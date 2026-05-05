import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("TrainLabAuth")?.value;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/treinos") ||
    request.nextUrl.pathname.startsWith("/home");

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(
        new URL("/login?message=invalid_token", request.url),
      );
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const redirectResponse = NextResponse.redirect(
          new URL("/login?message=invalid_token", request.url),
        );

        redirectResponse.cookies.delete("TrainLabAuth");
        return redirectResponse;
      }

      return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return NextResponse.redirect(
        new URL("/login?message=server_error", request.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/treinos/:path*", "/home/:path*"],
};
