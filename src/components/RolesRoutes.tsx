import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Assignment } from "../pages/Assignments/Assignment";
import { ViewAssignments } from "../pages/Assignments/ViewAssignments";
import { Announcements } from "../pages/Announcements/Announcements";
import { CollapsedAppShell } from "./AppShell";
import { ManageSession } from "../pages/Monitor/ManageSession";
import { ViewSessions } from "../pages/Monitor/ViewSessions";
import { UserContext } from "../utils/UserContext";
import { AssDashboard } from "../pages/AssDashboard/AssDashboard";
import FeedbackDashboard from "../pages/MonitorFeebBack/FeedbackDashboard";
import { ProposeActivity } from "../pages/Activity/ProposeActivity";
import { ViewActivities } from "../pages/Activity/ViewActivities";
import { NotFound } from "../pages/NotFound";
import { ManageAnnouncement } from "../pages/Announcements/ManageAnnouncement";

const routesConfig = [
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    { path: "/sessions/view", element: <ViewSessions isAdvisor={false} /> },
    {
      path: "activity/view",
      element: <ViewActivities isCoordinator={false} isAdvisor={false} />,
    },
    { path: "*", element: <NotFound /> },
  ],
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    { path: "/sessions/manage", element: <ManageSession /> },
    { path: "/sessions/view", element: <ViewSessions isAdvisor={true} /> },
    { path: "/dashbaord", element: <FeedbackDashboard /> },
    { path: "activity/make", element: <ProposeActivity /> },
    {
      path: "activity/view",
      element: <ViewActivities isCoordinator={false} isAdvisor={true} />,
    },
    { path: "*", element: <NotFound /> },
  ],
  [
    { path: "/", element: <Announcements isEditor={true} /> },
    { path: "/assignment", element: <Assignment /> },
    {
      path: "/assignments/view",
      element: <ViewAssignments isSupervisor={false} />,
    },
    {
      path: "activity/view",
      element: <ViewActivities isAdvisor={false} isCoordinator={true} />,
    },
    { path: "*", element: <NotFound /> },
    { path: "/announcement/manage", element: <ManageAnnouncement /> },
  ],
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    {
      path: "/assignments/view",
      element: <ViewAssignments isSupervisor={true} />,
    },
    { path: "/assdashboard", element: <AssDashboard /> },
    { path: "*", element: <NotFound /> },
  ],
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    { path: "*", element: <NotFound /> },
  ],
];

export const RoleRoutes = () => {
  const user = useContext(UserContext);
  const [selectedRoutes, setSelectedRoutes] = useState(routesConfig[4]);

  useEffect(() => {
    if (user) {
      setSelectedRoutes(routesConfig[user.role]);
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<CollapsedAppShell />}>
        {selectedRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};
