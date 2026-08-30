"use client";

// src/components/Navbar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect as useEffect2, useRef, useState as useState2 } from "react";

// src/hooks/useSchoolAuth.ts
import { useCallback, useEffect, useState } from "react";
var SCHOOL_TOKEN_KEY = "schoolToken";
var SCHOOL_USER_KEY = "schoolUser";
var SCHOOL_AUTH_EVENT = "school-auth-change";
function readSchoolUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SCHOOL_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function readSchoolToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SCHOOL_TOKEN_KEY);
}
function useSchoolAuth() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const sync = useCallback(() => {
    setToken(readSchoolToken());
    setUser(readSchoolUser());
  }, []);
  useEffect(() => {
    sync();
    setReady(true);
    const onAuthChange = () => sync();
    const onStorage = (e) => {
      if (e.key === SCHOOL_TOKEN_KEY || e.key === SCHOOL_USER_KEY || e.key === null) sync();
    };
    window.addEventListener(SCHOOL_AUTH_EVENT, onAuthChange);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SCHOOL_AUTH_EVENT, onAuthChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [sync]);
  const logout = useCallback(() => {
    window.localStorage.removeItem(SCHOOL_TOKEN_KEY);
    window.localStorage.removeItem(SCHOOL_USER_KEY);
    window.dispatchEvent(new Event(SCHOOL_AUTH_EVENT));
  }, []);
  return { ready, authed: Boolean(token), token, user, logout };
}

// src/components/Navbar.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Navbar({
  logo,
  homeHref,
  navLinks,
  directoryLoginHref,
  directorySignupHref,
  erpLoginHref,
  erpSignupHref,
  dashboardHref = `${directoryLoginHref.replace(/\/login$/, "")}/dashboard`,
  accountMenuExtra,
  onLogout
}) {
  const pathname = usePathname();
  const { ready, authed, user, logout } = useSchoolAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState2(false);
  const [openMegaMenu, setOpenMegaMenu] = useState2(null);
  const [openMobileMegaMenu, setOpenMobileMegaMenu] = useState2(
    null
  );
  const [isLoginMenuOpen, setIsLoginMenuOpen] = useState2(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState2(false);
  const loginMenuRef = useRef(null);
  const avatarMenuRef = useRef(null);
  useEffect2(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
  }, [isDrawerOpen]);
  useEffect2(() => {
    function onClickOutside(e) {
      if (loginMenuRef.current && !loginMenuRef.current.contains(e.target)) {
        setIsLoginMenuOpen(false);
      }
      if (avatarMenuRef.current && !avatarMenuRef.current.contains(e.target)) {
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
  return /* @__PURE__ */ jsxs("nav", { className: "bsu-nav", children: [
    /* @__PURE__ */ jsxs("div", { className: "bsu-nav-inner", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: homeHref,
          style: {
            width: "2rem",
            height: "2rem",
            flexShrink: 0,
            position: "relative"
          },
          "aria-label": "Home",
          children: logo
        }
      ),
      /* @__PURE__ */ jsx(
        "ul",
        {
          className: "bsu-desktop-only",
          style: { alignItems: "center", gap: "2rem", listStyle: "none" },
          children: navLinks.map((navLink) => /* @__PURE__ */ jsxs(
            "li",
            {
              style: { position: "relative" },
              onMouseEnter: () => navLink.megaMenu && setOpenMegaMenu(navLink.label),
              onMouseLeave: () => navLink.megaMenu && setOpenMegaMenu(null),
              children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: navLink.path,
                    target: navLink.external ? "_blank" : void 0,
                    rel: navLink.external ? "noopener noreferrer" : void 0,
                    className: `bsu-link ${pathname?.startsWith(navLink.path) && navLink.path !== "/" ? "bsu-link-active" : ""}`,
                    children: navLink.label
                  }
                ),
                navLink.megaMenu && /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `bsu-mega-menu ${openMegaMenu === navLink.label ? "bsu-mega-menu-visible" : "bsu-mega-menu-hidden"}`,
                    children: /* @__PURE__ */ jsx("div", { className: "bsu-mega-menu-grid", children: navLink.megaMenu.map((group) => /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "bsu-mega-menu-title", children: group.title }),
                      group.items.map((item) => /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: item.path,
                          className: "bsu-mega-menu-item",
                          onClick: () => setOpenMegaMenu(null),
                          children: item.label
                        },
                        item.label
                      ))
                    ] }, group.title)) })
                  }
                )
              ]
            },
            navLink.label
          ))
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "bsu-desktop-only",
          style: { alignItems: "center", gap: "0.5rem" },
          children: !ready ? null : authed ? /* @__PURE__ */ jsxs("div", { ref: avatarMenuRef, style: { position: "relative" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bsu-avatar",
                onClick: () => setIsAvatarMenuOpen((v) => !v),
                "aria-label": "Account menu",
                "aria-expanded": isAvatarMenuOpen,
                children: initial
              }
            ),
            isAvatarMenuOpen && /* @__PURE__ */ jsxs("div", { className: "bsu-dropdown", children: [
              /* @__PURE__ */ jsx(Link, { href: dashboardHref, className: "bsu-dropdown-item", children: "Dashboard" }),
              accountMenuExtra,
              /* @__PURE__ */ jsx("button", { className: "bsu-dropdown-item", onClick: handleLogout, children: "Logout" })
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { ref: loginMenuRef, style: { position: "relative" }, children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "bsu-btn bsu-btn-outline",
                onClick: () => setIsLoginMenuOpen((v) => !v),
                "aria-expanded": isLoginMenuOpen,
                children: "Log In"
              }
            ),
            isLoginMenuOpen && /* @__PURE__ */ jsxs("div", { className: "bsu-dropdown", children: [
              /* @__PURE__ */ jsx(Link, { href: directoryLoginHref, className: "bsu-dropdown-item", children: "School Directory Login" }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: erpLoginHref,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "bsu-dropdown-item",
                  children: "BetterSchool ERP Login"
                }
              )
            ] }),
            erpSignupHref && /* @__PURE__ */ jsx(
              Link,
              {
                href: erpSignupHref,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bsu-btn bsu-btn-solid",
                style: { marginLeft: "0.5rem" },
                children: "Signup"
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "bsu-mobile-toggle",
          onClick: () => setIsDrawerOpen(!isDrawerOpen),
          "aria-label": "Toggle menu",
          "aria-expanded": isDrawerOpen,
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "bsu-mobile-toggle-bar",
                style: isDrawerOpen ? { transform: "rotate(45deg) translateY(8px)" } : void 0
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "bsu-mobile-toggle-bar",
                style: isDrawerOpen ? { opacity: 0 } : void 0
              }
            ),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "bsu-mobile-toggle-bar",
                style: isDrawerOpen ? { transform: "rotate(-45deg) translateY(-8px)" } : void 0
              }
            )
          ]
        }
      )
    ] }),
    isDrawerOpen && /* @__PURE__ */ jsx("div", { className: "bsu-backdrop", onClick: () => setIsDrawerOpen(false) }),
    /* @__PURE__ */ jsxs("div", { className: `bsu-drawer ${isDrawerOpen ? "" : "bsu-drawer-hidden"}`, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          },
          children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: homeHref,
                onClick: () => setIsDrawerOpen(false),
                style: { width: "2rem", height: "2rem", position: "relative" },
                children: logo
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setIsDrawerOpen(false),
                "aria-label": "Close menu",
                children: "\u2715"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "ul",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            width: "100%",
            listStyle: "none"
          },
          children: navLinks.map((navLink) => /* @__PURE__ */ jsxs(
            "li",
            {
              style: { borderBottom: "1px solid var(--bsu-border)" },
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        Link,
                        {
                          href: navLink.path,
                          onClick: () => !navLink.megaMenu && setIsDrawerOpen(false),
                          className: "bsu-link",
                          style: { display: "block", padding: "1rem 0" },
                          children: navLink.label
                        }
                      ),
                      navLink.megaMenu && /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => setOpenMobileMegaMenu(
                            openMobileMegaMenu === navLink.label ? null : navLink.label
                          ),
                          "aria-label": `Toggle ${navLink.label} menu`,
                          children: openMobileMegaMenu === navLink.label ? "\u25B4" : "\u25BE"
                        }
                      )
                    ]
                  }
                ),
                navLink.megaMenu && openMobileMegaMenu === navLink.label && /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      paddingBottom: "1rem"
                    },
                    children: navLink.megaMenu.map((group) => /* @__PURE__ */ jsxs("div", { children: [
                      /* @__PURE__ */ jsx("p", { className: "bsu-mega-menu-title", children: group.title }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            paddingLeft: "0.5rem"
                          },
                          children: group.items.map((item) => /* @__PURE__ */ jsx(
                            Link,
                            {
                              href: item.path,
                              onClick: () => setIsDrawerOpen(false),
                              className: "bsu-mega-menu-item",
                              children: item.label
                            },
                            item.label
                          ))
                        }
                      )
                    ] }, group.title))
                  }
                )
              ]
            },
            navLink.label
          ))
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "auto"
          },
          children: ready && authed ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Link, { href: dashboardHref, className: "bsu-btn bsu-btn-outline", children: "Dashboard" }),
            accountMenuExtra,
            /* @__PURE__ */ jsx("button", { className: "bsu-btn bsu-btn-solid", onClick: handleLogout, children: "Logout" })
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: directoryLoginHref,
                className: "bsu-btn bsu-btn-outline",
                children: "School Directory Login"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: erpLoginHref,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bsu-btn bsu-btn-outline",
                children: "BetterSchool ERP Login"
              }
            ),
            (directorySignupHref || erpSignupHref) && /* @__PURE__ */ jsx(
              Link,
              {
                href: erpSignupHref ?? directorySignupHref ?? "#",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "bsu-btn bsu-btn-solid",
                children: "Signup"
              }
            )
          ] })
        }
      )
    ] })
  ] });
}

// src/navLinks.ts
var FEATURES_MEGA_MENU = [
  {
    title: "Necessity",
    items: [
      { label: "School Directory Page", path: "/feature/school-directory" },
      { label: "Leads Tracking", path: "/feature/leads-tracking" },
      {
        label: "Open Positions and Hiring",
        path: "/feature/open-positions-hiring"
      },
      {
        label: "Birthday Cards Generator",
        path: "/feature/birthday-cards-generator"
      },
      {
        label: "Festival Post Generator",
        path: "/feature/festival-post-generator"
      }
    ]
  },
  {
    title: "Academics",
    items: [
      {
        label: "Student Management",
        path: "/feature/SchoolManagement/UserManagement"
      },
      {
        label: "Homework System",
        path: "/feature/Homework&Exams/homework-tracking"
      },
      {
        label: "Attendance System",
        path: "/feature/SchoolManagement/AttendanceTracking"
      },
      { label: "Exam System", path: "/feature/Homework&Exams/exam-management" },
      { label: "Exam Routine", path: "/feature/academics/exam-routine" },
      {
        label: "Class Routine / Timetable",
        path: "/feature/Communication&Collaboration/class-routines"
      },
      { label: "Syllabus", path: "/feature/academics/syllabus" },
      {
        label: "Lesson Notes",
        path: "/feature/SchoolManagement/LessonPlanning"
      },
      { label: "Library, E-Library", path: "/feature/academics/library" },
      { label: "CAS System", path: "/feature/academics/cas-system" },
      {
        label: "School Events",
        path: "/feature/Calendar&EventManagement/event-scheduling"
      },
      {
        label: "Awards and Certificates",
        path: "/feature/Calendar&EventManagement/awards-recognition"
      }
    ]
  },
  {
    title: "Finance & HR",
    items: [
      {
        label: "Fee Management",
        path: "/feature/SchoolManagement/FeeManagement"
      },
      {
        label: "Fee Receipt Printing",
        path: "/feature/finance/fee-receipt-printing"
      },
      { label: "Expense Tracking", path: "/feature/finance/expense-tracking" },
      {
        label: "Full Finance System",
        path: "/feature/finance/full-finance-system"
      },
      { label: "HR Management", path: "/feature/hr/hr-management" },
      {
        label: "Leave Management",
        path: "/feature/AdditionalSchoolServices/leave-requests-approvals"
      },
      { label: "Canteen Finance", path: "/feature/hr/canteen-finance" }
    ]
  },
  {
    title: "Content",
    items: [
      {
        label: "Directory & Website CMS",
        path: "/feature/content/directory-website-cms"
      },
      { label: "Clubs & Houses", path: "/feature/content/clubs-houses" },
      {
        label: "House Articles / Newsletters / Blogs",
        path: "/feature/content/house-articles-newsletters-blogs"
      }
    ]
  },
  {
    title: "Tools",
    items: [
      {
        label: "Notification System",
        path: "/feature/tools/notification-system"
      },
      {
        label: "Chat System",
        path: "/feature/Communication&Collaboration/chat-system"
      },
      {
        label: "Anonymous Survey System",
        path: "/feature/Parent&StudentEngagement/feedback-surveys"
      },
      { label: "Meeting Tracker", path: "/feature/tools/meeting-tracker" },
      {
        label: "Incident Management",
        path: "/feature/tools/incident-management"
      },
      {
        label: "School Visit Tracking",
        path: "/feature/Parent&StudentEngagement/school-visits-approvals"
      },
      { label: "Bus Tracking", path: "/feature/tools/bus-tracking" },
      {
        label: "Height & Weight Tracking",
        path: "/feature/tools/height-weight-tracking"
      },
      {
        label: "Birthday Wishes & Tracking",
        path: "/feature/tools/birthday-wishes-tracking"
      },
      {
        label: "Vaccination Tracking",
        path: "/feature/tools/vaccination-tracking"
      },
      {
        label: "Student Outing Records",
        path: "/feature/tools/student-outing-records"
      },
      {
        label: "Canteen Food Listings",
        path: "/feature/AdditionalSchoolServices/food-menu-management"
      },
      {
        label: "Feedback System",
        path: "/feature/Parent&StudentEngagement/feedback-surveys"
      }
    ]
  }
];
var LANDING_ORIGIN = "https://www.betterschool.app";
function buildMainNavLinks(context) {
  const prefix = context === "landing" ? "" : LANDING_ORIGIN;
  return [
    { label: "Home", path: `${prefix}/` },
    {
      label: "Features",
      path: `${prefix}/feature`
      // TODO:: Re-enable the Features mega menu dropdown once it's ready to
      // ship again — the "Features" link still goes to /feature on its own.
      // megaMenu: prefixMegaMenu(FEATURES_MEGA_MENU, prefix),
    },
    { label: "Schools", path: context === "directory" ? "/" : "/directory" },
    { label: "Pricing", path: `${prefix}/pricing` },
    { label: "Blogs", path: `${prefix}/blogs` }
  ];
}
export {
  FEATURES_MEGA_MENU,
  Navbar,
  SCHOOL_AUTH_EVENT,
  SCHOOL_TOKEN_KEY,
  SCHOOL_USER_KEY,
  buildMainNavLinks,
  useSchoolAuth
};
