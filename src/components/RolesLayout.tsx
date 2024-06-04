import { NavLink as MantineNav, Button } from "@mantine/core";
import {
  IconActivity,
  IconBell,
  IconCalendarClock,
  IconCalendarTime,
  IconExchange,
  IconEye,
  IconLayout,
  IconProgress,
  IconUser,
} from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet, Routes } from "react-router-dom";
import { UserContext, useUserContext } from "../utils/UserContext";
import cx from "clsx";

export const RolesLayout = () => {
  const user = useUserContext();
  // const user = useContext(UserContext);
  const role = user.role;
  console.log(role, "roles layout user");

  const navItemsConfig = [
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      {
        icon: IconCalendarClock,
        path: "/sessions/view",
        label: "View Sessions",
      },
      { icon: IconProgress, path: "/activity/view", label: "View Activities" },
    ],
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      {
        icon: IconCalendarTime,
        path: "/sessions/manage",
        label: "Schedule Session",
      },
      { icon: IconBell, path: "/sessions/view", label: "View Sessions" },
      { icon: IconLayout, path: "/dashbaord", label: "Feedback Dashboard" },
      { icon: IconActivity, path: "/activity/make", label: "Propose Activity" },
      { icon: IconEye, path: "/activity/view", label: "View Activities" },
    ],
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      { icon: IconExchange, path: "/assignment", label: "Make Assignment" },
      { icon: IconEye, path: "/assignments/view", label: "View Assignments" },
      { icon: IconActivity, path: "/activity/view", label: "View Activities" },
    ],
    [
      {
        icon: IconExchange,
        path: "/assignments/view",
        label: "View Assignments",
      },
      { icon: IconLayout, path: "/assdashboard", label: "Dashboard" },
    ],
  ];

  const navItems = navItemsConfig[role] || [];
  const navLinks = navItems.map((item, index) => (
    <MantineNav
      key={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      label={item.label}
      renderRoot={({ className, ...others }) => (
        <NavLink
          to={item.path}
          key={item.label}
          className={({ isActive }) =>
            cx(className, { "active-class": isActive })
          }
          {...others}
        />
      )}
    ></MantineNav>
  ));
  return <>{navLinks}</>;
};
// export const StudentLayout = () => {
//   const [activeRoute, setActiveRoute] = useState(0);
//   const routes = [
//     { icon: IconBell, label: "Announcements", href: "/" },
//     { icon: IconUser, label: "Assignment", href: "/assignment" },
//     { icon: IconUser, label: "Message Advisor", href: "/message" },
//     { icon: IconUser, label: "Monitor", href: "/monitor" },
//   ];
//
//   const navLinks = routes.map((item, index) => (
//     <NavLink
//       component={Link}
//       to={item.href}
//       key={item.label}
//       active={index === activeRoute}
//       label={item.label}
//       leftSection={<item.icon size="1rem" stroke={1.5} />}
//       onClick={() => setActiveRoute(index)}
//     ></NavLink>
//   ));
//   return <>{navLinks}</>;
// };
//
// export const AdvisorLayout = () => {
//   return (
//     <>
//       <Link to="/advisor">Advisor</Link>
//     </>
//   );
// };
