import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_EMAILS = [
  'sharmadevendra715@gmail.com',
  'kpdeora1986@gmail.com',
  'berriescherry8@gmail.com'
] as const;

export async function middleware(request: NextRequest) {
  const res = NextResponse.next({
    request,
    headers: {
      ...request.headers,
      'x-robots-tag': 'noindex, nofollow'
    }
  });

  const pathname = request.nextUrl.pathname;

  // Public admin login
  if (pathname === '/admin/login') {
    return res;
  }

  // Protect all other /admin/* routes
  if (pathname.startsWith('/admin/')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            request.cookies.set({ name, value, ...options });
            res.cookies.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            request.cookies.set({ name, value: '', ...options });
            res.cookies.set({ name, value: '', ...options });
          },
        },
      }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !ADMIN_EMAILS.includes(user.email! as any)) {
      // Redirect to login (login is public)
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
