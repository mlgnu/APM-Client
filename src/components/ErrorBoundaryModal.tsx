import { Alert, Button, Modal, Paper, Space } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons-react";
import { FallbackProps } from "react-error-boundary";

export const ErrorBoundaryModal = ({
  error,
  resetErrorBoundary,
}: FallbackProps) => {
  const [opened, { open, close }] = useDisclosure(true);
  return (
    <Modal withCloseButton={false} opened={opened} onClose={close}>
      <Alert color="red" icon={<IconInfoCircle />} title="An error occurred">
        {error.message}
      </Alert>
      <Space h="lg" />
      <Button
        w="100%"
        color="red"
        onClick={() => {
          resetErrorBoundary();
          close();
        }}
      >
        Reload Page
      </Button>
    </Modal>
  );
};
