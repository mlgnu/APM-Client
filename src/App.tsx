import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Profile } from '';

import { fetchUser } from './utils/fetchUser';
import { NavLinks } from './NavLinks'; // Import your NavLinks component
import { UserContext } from './utils/UserContext';
import { CollapsedAppShell } from './components/AppShell';
import { Notifications } from '@mantine/notifications';
import { ContextModalProps, ModalsProvider } from '@mantine/modals';
import { AnnouncementsEditor } from './pages/Announcements/AnnouncementsEditor';

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

// const ProfileModal2 = ({
//   innerProps,
// }: ContextModalProps<{ edit: boolean }>) => (
//   <>
//     <Profile edit={innerProps.edit} />
//   </>
// );

export function App() {
  const user = fetchUser();
  //   const EditorModal2 = ({ context }: ContextModalProps<{}>) => (
  //     <>
  //       <Profile />
  //     </>
  //   );
  return (
    <UserContext.Provider value={user}>
      {/* <React.StrictMode> */}
      <ModalsProvider modals={{ editor: EditorModal }}>
        <BrowserRouter>
          <Notifications position="top-right" zIndex={1001} />

          <CollapsedAppShell />
        </BrowserRouter>
      </ModalsProvider>

      {/* <AnnouncementsEditor /> */}
    </UserContext.Provider>
  );
}
