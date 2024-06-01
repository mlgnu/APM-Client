import { ActionIcon, Modal, Text, Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { relativeTime } from "../../utils/lib";
import { IconTimeline } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

type ActivityStatusProps = {
  advisorEmail: string;
  coordinatorEmail: string;
  status: number;
  message: string;
  creationTime: string;
  modifiedTime: string;
};

export const ActivityStatus = ({
  advisorEmail,
  coordinatorEmail,
  status,
  message,
  creationTime,
  modifiedTime,
}: ActivityStatusProps) => {
  const [active, setActive] = useState(0);
  const [opened, { open, close }] = useDisclosure();
  useEffect(() => {
    if (status !== 0) setActive(1);
  }, [status]);

  return (
    <>
      <ActionIcon onClick={open} size="sm" variant="subtle" color="green">
        <IconTimeline size={16} />
      </ActionIcon>

      <Modal
        size="auto"
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <Timeline p="lg" active={active} bulletSize={25}>
          <Timeline.Item title="Activity Submitted">
            <Text c="dimmed" size="sm">
              A new activity has been submitted by {advisorEmail.split("@")[0]}
            </Text>
            <Text size="xs" mt={4}>
              {relativeTime(creationTime)}
            </Text>
          </Timeline.Item>
          {status !== -1 && (
            <Timeline.Item title="Activity Approved">
              <Text c="dimmed" size="sm">
                {status === 1
                  ? `Activity has been approved by ${coordinatorEmail.split("@")[0]}`
                  : "Activityed is pending for approval"}
              </Text>
              <Text size="xs" mt={4}>
                {status === 1 && relativeTime(modifiedTime)}
              </Text>
            </Timeline.Item>
          )}
          {status === -1 && (
            <Timeline.Item title="Activity Rejected">
              <Text c="dimmed" size="sm">
                Actifivy has been rejected by {coordinatorEmail.split("@")[0]}{" "}
                with the following message: {message}
              </Text>
              <Text size="xs" mt={4}>
                {relativeTime(modifiedTime)}
              </Text>
            </Timeline.Item>
          )}
        </Timeline>
      </Modal>
    </>
  );
};
