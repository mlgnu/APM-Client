import { Text, Timeline } from "@mantine/core";
import { useEffect, useState } from "react";
import { relativeTime } from "../../utils/lib";

type AssignmentStatusProps = {
  coordinatorEmail: string;
  status: string;
  message: string;
  creationTime: string;
  modifiedTime: string;
};

export const AssignmentStatus = ({
  coordinatorEmail,
  status,
  message,
  creationTime,
  modifiedTime,
}: AssignmentStatusProps) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (status != "pending") setActive(1);
  }, [status]);

  return (
    <Timeline active={active} bulletSize={25}>
      <Timeline.Item title="Assignment Submitted">
        <Text c="dimmed" size="sm">
          A new assignment has been submitted by{" "}
          {coordinatorEmail.split("@")[0]}
        </Text>
        <Text size="xs" mt={4}>
          {relativeTime(creationTime)}
        </Text>
      </Timeline.Item>
      {status != "rejected" && (
        <Timeline.Item title="Assignment Approved">
          <Text c="dimmed" size="sm">
            {status == "approved"
              ? "Assignment has been approved"
              : "Assignmented is pending for approval"}
          </Text>
          <Text size="xs" mt={4}>
            {status == "approved" && relativeTime(modifiedTime)}
          </Text>
        </Timeline.Item>
      )}
      {status == "rejected" && (
        <Timeline.Item title="Assignment Rejected">
          <Text c="dimmed" size="sm">
            Assignment has been rejected with the following message: {message}
          </Text>
          <Text size="xs" mt={4}></Text>
        </Timeline.Item>
      )}
    </Timeline>
  );
};
