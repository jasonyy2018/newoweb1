import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /_next (Next.js internals)
    // - /static (Inside /public)
    // - /.*\\..* (Files)
    matcher: ['/((?!api|_next|static|.*\\..*).*)']
};
