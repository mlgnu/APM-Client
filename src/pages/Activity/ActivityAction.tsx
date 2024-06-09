import {
  ActionIcon,
  Button,
  ComboboxItem,
  Group,
  Input,
  Modal,
  Select,
  Space,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import React, { useState } from "react";
import { useMutateActivityStatus } from "../../hooks/Activity/useMutateActivityStatus";

type ActivityActionProps = {
  activityId: number;
};

export const ActivityAction = ({ activityId }: ActivityActionProps) => {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const form = useForm({
    initialValues: {
      action: "",
      comment: "",
    },
    validate: (values) => ({
      action: values.action ? null : "Action is required",
      comment:
        values.action === "-1" && values.comment.length <= 0
          ? "Comment is required for rejection"
          : null,
    }),
  });
  const { mutate: mutateActivityStatus } = useMutateActivityStatus();

  const handleUpdateStatus = () => {
    form.validate();
    if (form.isValid()) {
      mutateActivityStatus({
        activityId,
        mutationType: parseInt(form.values.action),
        comment: form.values.comment,
      });
      close();
    }
  };

  return (
    <>
      <ActionIcon
        onClick={() => open()}
        size="sm"
        variant="subtle"
        color="blue"
      >
        <IconEdit size={16} />
      </ActionIcon>
      <Modal withCloseButton={false} size="sm" opened={opened} onClose={close}>
        <Select
          comboboxProps={{ withinPortal: false }}
          data={[
            { value: "-1", label: "Reject" },
            { value: "1", label: "Approve" },
          ]}
          {...form.getInputProps("action")}
          label="Choose Action"
        />
        <Space h="md" />
        <Textarea
          label="Comment"
          placeholder="Rejection comment"
          {...form.getInputProps("comment")}
          disabled={form.values.action !== "-1"}
        />

        <Space h="md" />

        <Group grow={true}>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={handleUpdateStatus}>Update Status</Button>
        </Group>
      </Modal>
    </>
  );
};
