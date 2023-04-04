import { NextRequest, NextResponse } from 'next/server';

// export { default } from 'next-auth/middleware';

// See: https://github.com/vercel/next.js/discussions/18419#discussioncomment-1561577
const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname, locale },
  } = req;
  if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE.test(pathname)) {
    return;
  }
  const sessionLocale = req.cookies.get('locale');
  const headerCountry = req.headers.get('x-km-country')?.toLowerCase();
  const headerLocale = ['en-ng', 'en-za'].find(locale => locale.slice(-2) === headerCountry);

  if (sessionLocale && sessionLocale !== locale) {
    return NextResponse.redirect(new URL(`/${sessionLocale}${pathname}`, req.url));
  } else if (headerLocale && headerLocale !== locale) {
    return NextResponse.redirect(new URL(`/${headerLocale}${pathname}`, req.url));
  }
}

// import { withAuth } from 'next-auth/middleware';

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req: NextRequest) {
//     const {
//       nextUrl: { pathname, locale },
//     } = req;
//     if (pathname.startsWith('/_next') || pathname.includes('/api/') || PUBLIC_FILE.test(pathname)) {
//       return;
//     }
//     const sessionLocale = req.cookies.get('locale');
//     const headerCountry = req.headers.get('x-km-country')?.toLowerCase();
//     const headerLocale = ['en-ng', 'en-za'].find(locale => locale.slice(-2) === headerCountry);

//     if (sessionLocale && sessionLocale !== locale) {
//       return NextResponse.redirect(new URL(`/${sessionLocale}${pathname}`, req.url));
//     } else if (headerLocale && headerLocale !== locale) {
//       return NextResponse.redirect(new URL(`/${headerLocale}${pathname}`, req.url));
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === 'admin',
//     },
//   },
// );

// export const config = { matcher: ['/dashoard'] };
