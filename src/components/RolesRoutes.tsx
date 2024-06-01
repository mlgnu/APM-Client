import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { Assignment } from "../pages/Assignments/Assignment";
import { ViewAssignments } from "../pages/Assignments/ViewAssignments";
import { Announcements } from "../pages/Announcements/Announcements";
import { CollapsedAppShell } from "./AppShell";
import { MessageAdvisor } from "../pages/Messages/MessageAdvisor";
import { ManageSession } from "../pages/Monitor/ManageSession";
import { ViewSessions } from "../pages/Monitor/ViewSessions";
import { UserContext } from "../utils/UserContext";
import { AssDashboard } from "../pages/AssDashboard/AssDashboard";
import FeedbackDashboard from "../pages/MonitorFeebBack/FeedbackDashboard";
import { ProposeActivity } from "../pages/Activity/ProposeActivity";
import { ViewActivities } from "../pages/Activity/ViewActivities";
import { NotFound } from "../pages/NotFound";

const routesConfig = [
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    { path: "message", element: <MessageAdvisor isAdvisor={false} /> },
    { path: "/sessions/view", element: <ViewSessions isAdvisor={false} /> },
    {
      path: "activity/view",
      element: <ViewActivities isCoordinator={false} isAdvisor={false} />,
    },
    { path: "*", element: <NotFound /> },
  ],
  [
    { path: "/", element: <Announcements isEditor={false} /> },
    { path: "message", element: <MessageAdvisor isAdvisor={true} /> },
    { path: "/sessions", element: <ManageSession /> },
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
  const role = user ? user.role : 4;
  console.log(role, "roles routes role");
  const selectedRoutes = routesConfig[role];

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
{
  /* export const StudentRoutes = (props: {}) => { */
}
{
  /*   return ( */
}
{
  /*     <Routes> */
}
{
  /*       <Route path="/" element={<CollapsedAppShell />}> */
}
{
  /*         <Route index element={<Announcements isEditor={false} />} /> */
}
{
  /*         <Route path="message" element={<MessageAdvisor />} /> */
}
{
  /*         <Route path="/monitor" element={<ManageSession />} /> */
}
{
  /*         <Route */
}
{
  /*           path="/sessions/view" */
}
{
  /*           element={<ViewSessions isAdvisor={true} />} */
}
{
  /*         /> */
}
{
  /**/
}
{
  /*         <Route path="*" element={<div>404</div>} /> */
}
{
  /*       </Route> */
}
{
  /*     </Routes> */
}
{
  /*   ); */
}
{
  /* }; */
}
{
  /**/
}
{
  /* export const AdvisorRoutes = (props: {}) => { */
}
{
  /*   return ( */
}
{
  /*     <Routes> */
}
{
  /*       <Route path="/" element={<CollapsedAppShell />}> */
}
{
  /*         <Route path="/assignment" element={<Assignment />} /> */
}
{
  /*         <Route path="message" element={<MessageAdvisor />} /> */
}
{
  /*         <Route path="/monitor" element={<ManageSession />} /> */
}
{
  /*       </Route> */
}
{
  /*     </Routes> */
}
{
  /*   ); */
}
{
  /* }; */
}
{
  /**/
}
{
  /* export const CoordinatorRoutes = (props: {}) => { */
}
{
  /*   return ( */
}
{
  /*     <Routes> */
}
{
  /*       <Route path="/" element={<CollapsedAppShell />}> */
}
{
  /*         <Route path="/assignment" element={<Assignment />} /> */
}
{
  /*         <Route path="/assignments/view" element={<ViewAssignments />} /> */
}
{
  /*       </Route> */
}
{
  /*     </Routes> */
}
{
  /*   ); */
}
{
  /* }; */
}
{
  /**/
}
{
  /* export const SupervisorRoutes = (props: {}) => { */
}
{
  /*   return ( */
}
{
  /*     <Routes> */
}
{
  /*       <Route path="/" element={<CollapsedAppShell />}> */
}
{
  /*         <Route path="/assignments/view" element={<ViewAssignments />} /> */
}
{
  /*       </Route> */
}
{
  /*     </Routes> */
}
{
  /*   ); */
}
{
  /* }; */
}
{
  /**/
}
{
  /* export const RolesRoutes = (props: {}) => { */
}
{
  /*   const user = useContext(UserContext); */
}
{
  /*   return ( */
}
{
  /*     <> */
}
{
  /*       {user?.role === 0 && <StudentRoutes />} */
}
{
  /*       {user?.role === 1 && <AdvisorRoutes />} */
}
{
  /*       {user?.role === 2 && <CoordinatorRoutes />} */
}
{
  /*       {user?.role === 3 && <SupervisorRoutes />} */
}
{
  /*     </> */
}
{
  /*   ); */
}
{
  /* }; */
}
