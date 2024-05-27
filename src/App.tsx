import { BrowserRouter } from "react-router-dom";

import { UserContext } from "./utils/UserContext";
import { Notifications } from "@mantine/notifications";
import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import { AnnouncementsEditor } from "./pages/Announcements/AnnouncementsEditor";
import { RoleRoutes } from "./components/RolesRoutes";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import { useFetchUser } from "./hooks/useFetchUser";
import { useFetchProfile } from "./hooks/useFetchProfile";
import { ProfileContext } from "./utils/ProfileContext";

const EditorModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ edit: boolean; description: string; id: any }>) => (
  <>
    <AnnouncementsEditor
      edit={innerProps.edit}
      description={innerProps.description}
      id={innerProps.id}
    />
  </>
);

export function App() {
  const { data: user } = useFetchUser();
  const { data: profile } = useFetchProfile();
  return (
    <ProfileContext.Provider value={profile}>
      <UserContext.Provider value={user}>
        {/* <React.StrictMode> */}
        <ModalsProvider modals={{ editor: EditorModal }}>
          <Notifications position="top-right" zIndex={1001} />
          <BrowserRouter>
            <RoleRoutes />
            {/* <CollapsedAppShell /> */}
          </BrowserRouter>
        </ModalsProvider>

        {/* <AnnouncementsEditor /> */}
      </UserContext.Provider>
    </ProfileContext.Provider>
  );
}
