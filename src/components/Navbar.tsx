"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSchoolAuth } from "../hooks/useSchoolAuth";
import type { NavbarProps } from "../types";

export function Navbar({
  logo,
  homeHref,
  navLinks,
  directoryLoginHref,
  directorySignupHref,
  erpLoginHref,
  erpSignupHref,
  dashboardHref = `${directoryLoginHref.replace(/\/login$/, "")}/dashboard`,
  accountMenuExtra,
  onLogout,
  onDirectoryLoginClick,
}: NavbarProps) {
  const pathname = usePathname();
  const { ready, authed, user, logout } = useSchoolAuth();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null);
  const [openMobileMegaMenu, setOpenMobileMegaMenu] = useState<string | null>(
    null,
  );
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);

  const loginMenuRef = useRef<HTMLDivElement>(null);
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
  }, [isDrawerOpen]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        loginMenuRef.current &&
        !loginMenuRef.current.contains(e.target as Node)
      ) {
        setIsLoginMenuOpen(false);
      }
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(e.target as Node)
      ) {
        setIsAvatarMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    onLogout?.();
    setIsAvatarMenuOpen(false);
  };

  const displayName = user?.name || user?.email || "Account";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="bsu-nav">
      <div className="bsu-nav-inner">
        <Link
          href={homeHref}
          style={{
            width: "2rem",
            height: "2rem",
            flexShrink: 0,
            position: "relative",
          }}
          aria-label="Home"
        >
          {logo}
        </Link>

        {/* Desktop links */}
        <ul
          className="bsu-desktop-only"
          style={{ alignItems: "center", gap: "2rem", listStyle: "none" }}
        >
          {navLinks.map((navLink) => (
            <li
              key={navLink.label}
              style={{ position: "relative" }}
              onMouseEnter={() =>
                navLink.megaMenu && setOpenMegaMenu(navLink.label)
              }
              onMouseLeave={() => navLink.megaMenu && setOpenMegaMenu(null)}
            >
              <Link
                href={navLink.path}
                target={navLink.external ? "_blank" : undefined}
                rel={navLink.external ? "noopener noreferrer" : undefined}
                className={`bsu-link ${pathname?.startsWith(navLink.path) && navLink.path !== "/" ? "bsu-link-active" : ""}`}
              >
                {navLink.label}
              </Link>

              {navLink.megaMenu && (
                <div
                  className={`bsu-mega-menu ${
                    openMegaMenu === navLink.label
                      ? "bsu-mega-menu-visible"
                      : "bsu-mega-menu-hidden"
                  }`}
                >
                  <div className="bsu-mega-menu-grid">
                    {navLink.megaMenu.map((group) => (
                      <div key={group.title}>
                        <p className="bsu-mega-menu-title">{group.title}</p>
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.path}
                            className="bsu-mega-menu-item"
                            onClick={() => setOpenMegaMenu(null)}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop auth area */}
        <div
          className="bsu-desktop-only"
          style={{ alignItems: "center", gap: "0.5rem" }}
        >
          {!ready ? null : authed ? (
            <div ref={avatarMenuRef} style={{ position: "relative" }}>
              <button
                className="bsu-avatar"
                onClick={() => setIsAvatarMenuOpen((v) => !v)}
                aria-label="Account menu"
                aria-expanded={isAvatarMenuOpen}
              >
                {initial}
              </button>
              {isAvatarMenuOpen && (
                <div className="bsu-dropdown">
                  <Link href={dashboardHref} className="bsu-dropdown-item">
                    Dashboard
                  </Link>
                  {accountMenuExtra}
                  <button className="bsu-dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div ref={loginMenuRef} style={{ position: "relative" }}>
              <button
                className="bsu-btn bsu-btn-outline"
                onClick={() => setIsLoginMenuOpen((v) => !v)}
                aria-expanded={isLoginMenuOpen}
              >
                Log In
              </button>
              {isLoginMenuOpen && (
                <div className="bsu-dropdown">
                  {onDirectoryLoginClick ? (
                    <button
                      type="button"
                      className="bsu-dropdown-item"
                      onClick={() => {
                        setIsLoginMenuOpen(false);
                        onDirectoryLoginClick();
                      }}
                    >
                      School Directory Login
                    </button>
                  ) : (
                    <Link href={directoryLoginHref} className="bsu-dropdown-item">
                      School Directory Login
                    </Link>
                  )}
                  <Link
                    href={erpLoginHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bsu-dropdown-item"
                  >
                    BetterSchool ERP Login
                  </Link>
                </div>
              )}
              {erpSignupHref && (
                <Link
                  href={erpSignupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bsu-btn bsu-btn-solid"
                  style={{ marginLeft: "0.5rem" }}
                >
                  Signup
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="bsu-mobile-toggle"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          aria-label="Toggle menu"
          aria-expanded={isDrawerOpen}
        >
          <span
            className="bsu-mobile-toggle-bar"
            style={
              isDrawerOpen
                ? { transform: "rotate(45deg) translateY(8px)" }
                : undefined
            }
          />
          <span
            className="bsu-mobile-toggle-bar"
            style={isDrawerOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="bsu-mobile-toggle-bar"
            style={
              isDrawerOpen
                ? { transform: "rotate(-45deg) translateY(-8px)" }
                : undefined
            }
          />
        </button>
      </div>

      {isDrawerOpen && (
        <div className="bsu-backdrop" onClick={() => setIsDrawerOpen(false)} />
      )}

      <div className={`bsu-drawer ${isDrawerOpen ? "" : "bsu-drawer-hidden"}`}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href={homeHref}
            onClick={() => setIsDrawerOpen(false)}
            style={{ width: "2rem", height: "2rem", position: "relative" }}
          >
            {logo}
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            listStyle: "none",
          }}
        >
          {navLinks.map((navLink) => (
            <li
              key={navLink.label}
              style={{ borderBottom: "1px solid var(--bsu-border)" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Link
                  href={navLink.path}
                  onClick={() => !navLink.megaMenu && setIsDrawerOpen(false)}
                  className="bsu-link"
                  style={{ display: "block", padding: "1rem 0" }}
                >
                  {navLink.label}
                </Link>
                {navLink.megaMenu && (
                  <button
                    onClick={() =>
                      setOpenMobileMegaMenu(
                        openMobileMegaMenu === navLink.label
                          ? null
                          : navLink.label,
                      )
                    }
                    aria-label={`Toggle ${navLink.label} menu`}
                  >
                    {openMobileMegaMenu === navLink.label ? "▴" : "▾"}
                  </button>
                )}
              </div>

              {navLink.megaMenu && openMobileMegaMenu === navLink.label && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    paddingBottom: "1rem",
                  }}
                >
                  {navLink.megaMenu.map((group) => (
                    <div key={group.title}>
                      <p className="bsu-mega-menu-title">{group.title}</p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.path}
                            onClick={() => setIsDrawerOpen(false)}
                            className="bsu-mega-menu-item"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "auto",
          }}
        >
          {ready && authed ? (
            <>
              <Link href={dashboardHref} className="bsu-btn bsu-btn-outline">
                Dashboard
              </Link>
              {accountMenuExtra}
              <button className="bsu-btn bsu-btn-solid" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              {onDirectoryLoginClick ? (
                <button
                  type="button"
                  className="bsu-btn bsu-btn-outline"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    onDirectoryLoginClick();
                  }}
                >
                  School Directory Login
                </button>
              ) : (
                <Link
                  href={directoryLoginHref}
                  className="bsu-btn bsu-btn-outline"
                >
                  School Directory Login
                </Link>
              )}
              <Link
                href={erpLoginHref}
                target="_blank"
                rel="noopener noreferrer"
                className="bsu-btn bsu-btn-outline"
              >
                BetterSchool ERP Login
              </Link>
              {(directorySignupHref || erpSignupHref) && (
                <Link
                  href={erpSignupHref ?? directorySignupHref ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bsu-btn bsu-btn-solid"
                >
                  Signup
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
