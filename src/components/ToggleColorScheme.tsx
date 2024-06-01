import { ActionIcon, useMantineColorScheme, Group } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export const ToggleColorScheme = () => {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group mr="auto" justify="center">
      <ActionIcon
        onClick={toggleColorScheme}
        variant="light"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {colorScheme === "dark" && <IconSun />}
        {colorScheme === "light" && <IconMoon />}
      </ActionIcon>
    </Group>
  );
};
