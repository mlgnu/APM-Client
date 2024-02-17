import { forwardRef, useContext, useEffect, useState } from 'react';
import {
  IconChevronRight,
  IconExternalLink,
  IconUser,
} from '@tabler/icons-react';
import {
  Group,
  Avatar,
  Text,
  Menu,
  UnstyledButton,
  rem,
  Modal,
  LoadingOverlay,
} from '@mantine/core';
import { IconTrash, IconLogout, IconUserCircle } from '@tabler/icons-react';
import { UserContext } from '../utils/UserContext';
import { modals } from '@mantine/modals';
import { useDisclosure } from '@mantine/hooks';
import { Profile } from '../pages/Profile/Profile';
import { logout } from '../data/auth';
import { useQueryClient } from '@tanstack/react-query';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        // padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <IconUserCircle size={30} />
        {/* <Avatar src={image} radius="xl" /> */}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  ),
);

export function User(props: any) {
  const user = useContext(UserContext);
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  //   const [name, setName] = useState(user?.data?.firstName);
  //   const [email, setEmail] = useState(user?.data?.userEmail);

  //   useEffect(() => {
  //     setName(user?.data?.firstName);
  //     setEmail(user?.data?.userEmail);
  //   }, []);
  //   console.log(user?.data);
  //   console.log('from user context: user');
  if (!user?.data)
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
    );
  return (
    <>
      <Menu withArrow>
        <Menu.Target>
          <UserButton name={props.name} email={props.email} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            leftSection={
              <IconUser style={{ width: rem(14), height: rem(14) }} />
            }
            onClick={() => {
              // modals.openContextModal({
              //   modal: 'profile',
              //   title: 'Profile Mangager',
              //   size: '35%',
              //   innerProps: {},
              // });
              open();
            }}
          >
            Profile
          </Menu.Item>

          <Menu.Item
            onClick={() => {
              modals.openConfirmModal({
                title: 'Logout',
                centered: true,
                children: (
                  <Text size="sm">
                    Are you sure you want to logout from yor account
                  </Text>
                ),
                labels: {
                  confirm: 'Logout',
                  cancel: "Stay logged in, I've changed my mind",
                },
                confirmProps: { color: 'red' },
                onCancel: () => console.log('Cancel'),
                onConfirm: () => {
                  logout();
                  queryClient.invalidateQueries({ queryKey: ['user'] });
                  window.location.href = '/';
                },
              });
            }}
            // component="a"
            // href="http://localhost:3001/api/auth/google/logout"
            color="red"
            leftSection={
              <IconLogout style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Log out
          </Menu.Item>
          {/* <Menu.Item component="a" href="https://mantine.dev">
          Mantine website
        </Menu.Item> */}
          {/* <Menu.Item
          leftSection={
            <IconExternalLink style={{ width: rem(14), height: rem(14) }} />
          }
          component="a"
          href="https://mantine.dev"
          target="_blank"
        >
          External link
        </Menu.Item> */}
        </Menu.Dropdown>
      </Menu>

      <Modal
        size="auto"
        centered
        opened={opened}
        onClose={close}
        withCloseButton={false}
      >
        <Profile close={close} />
      </Modal>
    </>
  );
}
