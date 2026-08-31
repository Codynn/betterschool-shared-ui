import type { ReactNode } from 'react';

export type MegaMenuItem = {
  label: string;
  path: string;
};

export type MegaMenuGroup = {
  title: string;
  items: MegaMenuItem[];
};

export type NavLink = {
  label: string;
  path: string;
  external?: boolean;
  megaMenu?: MegaMenuGroup[];
};

export type SchoolUser = {
  name?: string;
  email?: string;
  [key: string]: unknown;
};

export type NavbarProps = {
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
  /**
   * When provided, "School Directory Login" renders as a button calling this
   * instead of a `<Link>` to `directoryLoginHref` — lets a consumer open a
   * login popup in place instead of navigating to a dedicated page.
   * `directoryLoginHref` is still required as a no-JS/fallback target.
   */
  onDirectoryLoginClick?: () => void;
};
