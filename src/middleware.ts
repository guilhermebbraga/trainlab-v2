import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('TrainLabAuth')?.value

    const isProtectedRoute = request.nextUrl.pathname.startsWith('/treinos')

    if(isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/?message=invalid_token', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/treinos/:path*']
}