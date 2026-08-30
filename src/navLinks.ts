import type { MegaMenuGroup, NavLink } from "./types";

export const FEATURES_MEGA_MENU: MegaMenuGroup[] = [
  {
    title: "Necessity",
    items: [
      { label: "School Directory Page", path: "/feature/school-directory" },
      { label: "Leads Tracking", path: "/feature/leads-tracking" },
      {
        label: "Open Positions and Hiring",
        path: "/feature/open-positions-hiring",
      },
      {
        label: "Birthday Cards Generator",
        path: "/feature/birthday-cards-generator",
      },
      {
        label: "Festival Post Generator",
        path: "/feature/festival-post-generator",
      },
    ],
  },
  {
    title: "Academics",
    items: [
      {
        label: "Student Management",
        path: "/feature/SchoolManagement/UserManagement",
      },
      {
        label: "Homework System",
        path: "/feature/Homework&Exams/homework-tracking",
      },
      {
        label: "Attendance System",
        path: "/feature/SchoolManagement/AttendanceTracking",
      },
      { label: "Exam System", path: "/feature/Homework&Exams/exam-management" },
      { label: "Exam Routine", path: "/feature/academics/exam-routine" },
      {
        label: "Class Routine / Timetable",
        path: "/feature/Communication&Collaboration/class-routines",
      },
      { label: "Syllabus", path: "/feature/academics/syllabus" },
      {
        label: "Lesson Notes",
        path: "/feature/SchoolManagement/LessonPlanning",
      },
      { label: "Library, E-Library", path: "/feature/academics/library" },
      { label: "CAS System", path: "/feature/academics/cas-system" },
      {
        label: "School Events",
        path: "/feature/Calendar&EventManagement/event-scheduling",
      },
      {
        label: "Awards and Certificates",
        path: "/feature/Calendar&EventManagement/awards-recognition",
      },
    ],
  },
  {
    title: "Finance & HR",
    items: [
      {
        label: "Fee Management",
        path: "/feature/SchoolManagement/FeeManagement",
      },
      {
        label: "Fee Receipt Printing",
        path: "/feature/finance/fee-receipt-printing",
      },
      { label: "Expense Tracking", path: "/feature/finance/expense-tracking" },
      {
        label: "Full Finance System",
        path: "/feature/finance/full-finance-system",
      },
      { label: "HR Management", path: "/feature/hr/hr-management" },
      {
        label: "Leave Management",
        path: "/feature/AdditionalSchoolServices/leave-requests-approvals",
      },
      { label: "Canteen Finance", path: "/feature/hr/canteen-finance" },
    ],
  },
  {
    title: "Content",
    items: [
      {
        label: "Directory & Website CMS",
        path: "/feature/content/directory-website-cms",
      },
      { label: "Clubs & Houses", path: "/feature/content/clubs-houses" },
      {
        label: "House Articles / Newsletters / Blogs",
        path: "/feature/content/house-articles-newsletters-blogs",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        label: "Notification System",
        path: "/feature/tools/notification-system",
      },
      {
        label: "Chat System",
        path: "/feature/Communication&Collaboration/chat-system",
      },
      {
        label: "Anonymous Survey System",
        path: "/feature/Parent&StudentEngagement/feedback-surveys",
      },
      { label: "Meeting Tracker", path: "/feature/tools/meeting-tracker" },
      {
        label: "Incident Management",
        path: "/feature/tools/incident-management",
      },
      {
        label: "School Visit Tracking",
        path: "/feature/Parent&StudentEngagement/school-visits-approvals",
      },
      { label: "Bus Tracking", path: "/feature/tools/bus-tracking" },
      {
        label: "Height & Weight Tracking",
        path: "/feature/tools/height-weight-tracking",
      },
      {
        label: "Birthday Wishes & Tracking",
        path: "/feature/tools/birthday-wishes-tracking",
      },
      {
        label: "Vaccination Tracking",
        path: "/feature/tools/vaccination-tracking",
      },
      {
        label: "Student Outing Records",
        path: "/feature/tools/student-outing-records",
      },
      {
        label: "Canteen Food Listings",
        path: "/feature/AdditionalSchoolServices/food-menu-management",
      },
      {
        label: "Feedback System",
        path: "/feature/Parent&StudentEngagement/feedback-surveys",
      },
    ],
  },
];

const LANDING_ORIGIN = "https://www.betterschool.app";

function prefixMegaMenu(
  groups: MegaMenuGroup[],
  prefix: string,
): MegaMenuGroup[] {
  if (!prefix) return groups;
  return groups.map((group) => ({
    title: group.title,
    items: group.items.map((item) => ({
      label: item.label,
      path: `${prefix}${item.path}`,
    })),
  }));
}

/**
 * The single source of truth for the main site nav, shared by
 * betterschool-new-landing and betterschool-school-directory so both apps
 * render an identical navbar. Only landing owns Home/Features/Pricing/Blogs/
 * Contact — when rendered from the directory app (served under the
 * `/directory` basePath), those links point back at the landing origin.
 */
export function buildMainNavLinks(context: "landing" | "directory"): NavLink[] {
  const prefix = context === "landing" ? "" : LANDING_ORIGIN;

  return [
    { label: "Home", path: `${prefix}/` },
    {
      label: "Features",
      path: `${prefix}/feature`,
      megaMenu: prefixMegaMenu(FEATURES_MEGA_MENU, prefix),
    },
    { label: "Schools", path: context === "directory" ? "/" : "/directory" },
    { label: "Pricing", path: `${prefix}/pricing` },
    { label: "Blogs", path: `${prefix}/blogs` },
  ];
}
