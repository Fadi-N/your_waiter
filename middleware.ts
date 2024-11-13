import {NextResponse} from 'next/server';
import acceptLanguage from 'accept-language';
import {fallbackLng, languages, cookieName} from './app/i18n/settings';
import {apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes} from '@/routes';
import {getToken} from "@auth/core/jwt";
import {cookies} from "next/headers";

acceptLanguage.languages(languages);

export async function middleware(req) {
    const {nextUrl} = req;

    // Get token data
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        salt: process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    });

    const isLoggedIn = !!token; // Check if the user has a valid token (is logged in)
    const userRole = token?.role || null; // Retrieve user role if available in the token

    let lng;

    // Handle language preference from cookies or headers
    if (req.cookies.has(cookieName)) {
        lng = acceptLanguage.get(req.cookies.get(cookieName).value);
    }
    if (!lng) {
        lng = acceptLanguage.get(req.headers.get('Accept-Language'));
    }
    if (!lng) {
        lng = fallbackLng; // Set fallback language if no preferred language is found
    }

    // Check if the path already includes a language prefix
    const hasLanguagePrefix = languages.some((loc) => nextUrl.pathname.startsWith(`/${loc}`));

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Check if it's an API auth route
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Check if it's a public route
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Check if it's an auth-specific route
    const isAdminRoute = nextUrl.pathname.startsWith(`/${lng}/admin`); // Check if it's an admin route

    console.log("User login status:", isLoggedIn, "Accessing route:", nextUrl.pathname, "User role:", userRole);

    // Allow access to API authentication routes without any redirects
    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    // Handle access to auth-specific routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(`/${lng}${DEFAULT_LOGIN_REDIRECT}`, nextUrl));
        }
        if (!hasLanguagePrefix) {
            return NextResponse.redirect(new URL(`/${lng}${nextUrl.pathname}`, req.url));
        }
        return NextResponse.next();
    }

    // Restrict access to /admin for users without the ADMIN role
    if (isAdminRoute) {
        if (!isLoggedIn || userRole !== "ADMIN") {
            return NextResponse.redirect(new URL(`/${lng}/auth/login`, req.url));
        }
    }

    // Redirect unauthenticated users to the login page for private routes
    if (!isLoggedIn && !isPublicRoute) {
        if (!hasLanguagePrefix) {
            return NextResponse.redirect(new URL(`/${lng}/auth/login`, req.url));
        }
        return NextResponse.next();
    }

    // Skip adding a language prefix for API routes
    if (nextUrl.pathname.startsWith('/api/')) {
        return NextResponse.next();
    }

    // Redirect to the path with a language prefix if it's missing
    if (!hasLanguagePrefix && !nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.redirect(new URL(`/${lng}${nextUrl.pathname}`, req.url));
    }

    // Set a language cookie based on the referer, if available
    if (req.headers.has('referer')) {
        const refererUrl = new URL(req.headers.get('referer'));
        const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`));
        const response = NextResponse.next();
        if (lngInReferer) {
            response.cookies.set(cookieName, lngInReferer);
        }
        return response;
    }

    // Allow request to proceed as usual if no redirects are needed
    return NextResponse.next();
}

// Middleware configuration to specify path matching
export const config = {
    matcher: [
        // Match all paths except for _next and static file extensions
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Ensure middleware runs for API routes
        '/(api|trpc)(.*)',
    ],
};
