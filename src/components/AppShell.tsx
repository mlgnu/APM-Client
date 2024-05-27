import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import LoginButton from "./ui/LoginButton";
import { Text, Container } from "@mantine/core";
import { useContext, useState } from "react";
import { UserContext, useUserContext } from "../utils/UserContext";
import { IconUser, IconBell } from "@tabler/icons-react";
import { User } from "./User";
import { ProfileContext, useProfileContext } from "../utils/ProfileContext";
import { Outlet } from "react-router-dom";
import { RolesLayout } from "./RolesLayout";

export function CollapsedAppShell() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  // const user = useUserContext();
  // const profile = useProfileContext();

  const user = useContext(UserContext);
  const profile = useContext(ProfileContext);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding={{ base: 10, sm: 15, lg: "xl" }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          {user ? (
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
          ) : (
            ""
          )}
          {user ? (
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
          ) : (
            ""
          )}
          <Container
            style={{
              width: "100%",
              maxWidth: "900px",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <MantineLogo style={{ marginRight: "auto" }} size={30} />

            {/* {user?.data?.id && (
              <Text style={{ marginLeft: 'auto' }} size="lg">
                Hi, {user.data.firstName + ' ' + user.data.lastName}
              </Text>
            )} */}
            {!user ? (
              <LoginButton />
            ) : (
              <User
                name={`${profile?.firstName || ""} ${profile?.lastName || ""}`}
                email={user.userEmail}
              />
            )}
          </Container>
        </Group>
      </AppShell.Header>
      {user ? <AppShell.Navbar p="md">{<RolesLayout />}</AppShell.Navbar> : ""}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
