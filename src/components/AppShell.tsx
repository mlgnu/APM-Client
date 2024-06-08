import {
  AppShell,
  Burger,
  Flex,
  Group,
  Image,
  Space,
  Title,
} from "@mantine/core";
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
import { ToggleColorScheme } from "./ToggleColorScheme";
import { capitalize } from "lodash";

export function CollapsedAppShell() {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);
  // const user = useUserContext();
  // const profile = useProfileContext();

  const user = useContext(UserContext);
  const profile = useContext(ProfileContext);

  const getName = () => {
    if (user?.role === 2 || user?.role === 3)
      return capitalize(user?.userEmail.split("@")[0]) || "";
    return `${profile?.firstName || ""} ${profile?.lastName || ""}`;
  };

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
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            hidden={!user}
            size="sm"
          />
          <Burger
            hidden={!user}
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Title
            visibleFrom="sm"
            style={{ marginRight: "auto", marginLeft: "auto" }}
            c="blue.8"
            order={2}
          >
            Monitory
          </Title>
          {!user ? (
            <LoginButton />
          ) : (
            <User role={user.role} name={getName()} email={user.userEmail} />
          )}
          <ToggleColorScheme />
        </Group>
      </AppShell.Header>
      {user ? (
        <AppShell.Navbar p="md">
          {<RolesLayout closeMobile={toggleMobile} />}
        </AppShell.Navbar>
      ) : (
        ""
      )}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
