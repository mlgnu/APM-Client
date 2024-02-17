import {
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  NavLink,
  Skeleton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantinex/mantine-logo';
import axios from 'axios';
import LoginButton from './ui/LoginButton';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { Text, Container } from '@mantine/core';
import LogoutButton from './ui/LogoutButton';
import {
  IconActivity,
  IconChevronRight,
  IconFingerprint,
  IconGauge,
  IconHome2,
} from '@tabler/icons-react';
import { NavLinks } from './ui/NavLinks';
import { RoutesHandler } from '../pages/RoutesHandler';
import { fetchUser } from '../utils/fetchUser';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import { Profile } from '../pages/Profile/Profile';
import { Announcements } from '../pages/Announcements/Announcements';
import { IconUser, IconBell } from '@tabler/icons-react';
import { User } from './User';

const data = [
  { icon: IconBell, label: 'Announcements', href: '/' },
  // { label: 'Make Announcement', href: '/make-announcement' },
  { icon: IconUser, label: 'Profile', href: '/profile' },
  // {
  //   icon: IconFingerprint,
  //   label: 'Security',
  //   rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  // },
  // { icon: IconActivity, label: 'Activity', description: 'gfg' },
];

export function CollapsedAppShell() {
  const [active, setActive] = useState(0);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  const user = fetchUser();

  const items = data.map((item, index) => (
    <NavLink
      href={item.href}
      key={item.label}
      active={index === active}
      label={item.label}
      // description={item.description}
      // rightSection={item.rightSection}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      // onClick={() => setActive(index)}
    >
      {/* <Profile /> */}
    </NavLink>
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: 10, sm: 15, lg: 'xl' }}
    >
      <AppShell.Header
      // style={{ position: 'fixed', top: '0', right: '0', left: '0' }}
      >
        <Group h="100%" px="md">
          {user ? (
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
          ) : (
            ''
          )}
          {user ? (
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
          ) : (
            ''
          )}
          <Container
            style={{
              width: '100%',
              maxWidth: '900px',
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <MantineLogo style={{ marginRight: 'auto' }} size={30} />

            {/* {user?.data?.id && (
              <Text style={{ marginLeft: 'auto' }} size="lg">
                Hi, {user.data.firstName + ' ' + user.data.lastName}
              </Text>
            )} */}
            {!user ? (
              <LoginButton />
            ) : (
              <User
                name={`${user.data.firstName} ${user.data.lastName}`}
                email={user.data.userEmail}
              />
            )}
          </Container>
        </Group>
      </AppShell.Header>
      {user ? (
        <AppShell.Navbar p="md">
          <Box>{items}</Box>
        </AppShell.Navbar>
      ) : (
        ''
      )}
      <AppShell.Main>
        {/* <Announcements /> */}
        {/* <RoutesHandler /> */}

        <Routes>
          <Route
            path="/profile"
            element={
              <UserContext.Provider value={user}>
                {/* <Profile activeIndex={1} setActiveIndex={setActive} /> */}
              </UserContext.Provider>
            }
          />

          <Route
            path="/"
            element={
              <Announcements activeIndex={0} setActiveIndex={setActive} />
            }
          />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}

// function fetchUser() {
//   const authToken = Cookies.get('SESSION_ID');
//   console.log(authToken + ' auth token');

//   const headers = {
//     Authorization: `Bearer ${authToken}`,
//     // other headers as needed
//   };
//   const userQuery = useQuery({
//     queryKey: ['user'],
//     queryFn: () =>
//       axios.get('http://localhost:3001/api/profile/', {
//         withCredentials: true,
//       }),
//     staleTime: 1000 * 60 * 5, // 5 minutes
//   });

//   if (userQuery.isLoading) {
//     console.log('loading');
//   } else if (userQuery.isError) {
//     console.log('error');
//   } else if (userQuery.isSuccess) {
//     console.log(userQuery.data);
//   }
//   return userQuery.data;
// }
