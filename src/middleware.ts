// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('supabaseToken')?.value;

  if (!token) {
    // No token found, redirect to login
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  // If a token is found, let the request through
  return NextResponse.next();
}

// Apply to specific routes
export const config = {
  matcher: ['/'],
};
