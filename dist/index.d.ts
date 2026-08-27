import * as react from 'react';
import { ReactNode } from 'react';

type MegaMenuItem = {
    label: string;
    path: string;
};
type MegaMenuGroup = {
    title: string;
    items: MegaMenuItem[];
};
type NavLink = {
    label: string;
    path: string;
    external?: boolean;
    megaMenu?: MegaMenuGroup[];
};
type SchoolUser = {
    name?: string;
    email?: string;
    [key: string]: unknown;
};
type NavbarProps = {
    logo: ReactNode;
    homeHref: string;
    navLinks: NavLink[];
    directoryLoginHref: string;
    directorySignupHref?: string;
    erpLoginHref: string;
    erpSignupHref?: string;
    dashboardHref?: string;
    /** Extra items rendered in the logged-in account menu, after Dashboard and before Logout. */
    accountMenuExtra?: ReactNode;
    /** Called when the user clicks logout; should also clear any app-specific state. */
    onLogout?: () => void;
};

declare function Navbar({ logo, homeHref, navLinks, directoryLoginHref, directorySignupHref, erpLoginHref, erpSignupHref, dashboardHref, accountMenuExtra, onLogout, }: NavbarProps): react.JSX.Element;

declare const SCHOOL_TOKEN_KEY = "schoolToken";
declare const SCHOOL_USER_KEY = "schoolUser";
declare const SCHOOL_AUTH_EVENT = "school-auth-change";
/**
 * Reads the directory app's localStorage-based login session. Works across
 * betterschool-new-landing and betterschool-school-directory since both are
 * served from the same origin (www.betterschool.app) via the Vercel rewrite.
 */
declare function useSchoolAuth(): {
    ready: boolean;
    authed: boolean;
    token: string | null;
    user: SchoolUser | null;
    logout: () => void;
};

declare const FEATURES_MEGA_MENU: MegaMenuGroup[];
/**
 * The single source of truth for the main site nav, shared by
 * betterschool-new-landing and betterschool-school-directory so both apps
 * render an identical navbar. Only landing owns Home/Features/Pricing/Blogs/
 * Contact — when rendered from the directory app (served under the
 * `/directory` basePath), those links point back at the landing origin.
 */
declare function buildMainNavLinks(context: "landing" | "directory"): NavLink[];

export { FEATURES_MEGA_MENU, type MegaMenuGroup, type MegaMenuItem, type NavLink, Navbar, type NavbarProps, SCHOOL_AUTH_EVENT, SCHOOL_TOKEN_KEY, SCHOOL_USER_KEY, type SchoolUser, buildMainNavLinks, useSchoolAuth };
