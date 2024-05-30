import { NavLink } from "@mantine/core";
import { IconBell, IconUser } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { Link, Outlet, Routes } from "react-router-dom";
import { UserContext, useUserContext } from "../utils/UserContext";

export const RolesLayout = () => {
  const user = useUserContext();
  // const user = useContext(UserContext);
  const role = user.role;
  console.log(role, "roles layout user");

  const navItemsConfig = [
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      { icon: IconBell, path: "message", label: "Messages" },
      { icon: IconBell, path: "/sessions/view", label: "View Sessions" },
    ],
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      { icon: IconBell, path: "message", label: "Message Students" },
      { icon: IconBell, path: "/sessions", label: "Schedule Session" },
      { icon: IconBell, path: "/sessions/view", label: "View Sessions" },
      { icon: IconBell, path: "/dashbaord", label: "Feedback Dashboard" },
      { icon: IconBell, path: "/activity/make", label: "Propose Activity" },
      { icon: IconBell, path: "/activity/view", label: "View Activities" },
    ],
    [
      { icon: IconBell, path: "/", label: "Announcements" },
      { icon: IconBell, path: "/assignment", label: "Assignments" },
      { icon: IconBell, path: "/assignments/view", label: "View Assignments" },
    ],
    [
      { icon: IconBell, path: "/assignments/view", label: "View Assignments" },
      { icon: IconBell, path: "/assdashboard", label: "Dashboard" },
    ],
  ];

  const navItems = navItemsConfig[role] || [];
  const [activeRoute, setActiveRoute] = useState(0);
  const navLinks = navItems.map((item, index) => (
    <NavLink
      component={Link}
      to={item.path}
      key={item.label}
      active={index === activeRoute}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActiveRoute(index)}
    ></NavLink>
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
