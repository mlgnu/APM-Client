import {
  Button,
  ActionIcon,
  TypographyStylesProvider,
  Modal,
  Space,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";

type ViewActivityProps = {
  description: string;
};

export default function ViewActivity({ description }: ViewActivityProps) {
  const [opened, { open, close }] = useDisclosure();
  return (
    <>
      <ActionIcon
        onClick={() => open()}
        size="sm"
        variant="subtle"
        color="yellow"
      >
        <IconEye size={16} />
      </ActionIcon>

      <Modal
        size="auto"
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <TypographyStylesProvider>
          <p dangerouslySetInnerHTML={{ __html: description }}></p>
        </TypographyStylesProvider>

        <Space h="lg" />
        <Button w="100%" onClick={close}>
          Close
        </Button>
      </Modal>
    </>
  );
}
