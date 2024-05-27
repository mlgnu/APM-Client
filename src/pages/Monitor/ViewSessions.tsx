import { DataTable } from "mantine-datatable";
import { useFetchSessions } from "../../hooks/useFetchSessions";
import { ActionIcon, Box, Container, Group, Slider } from "@mantine/core";
import { modals } from "@mantine/modals";
import { AssignmentStatus } from "../Assignments/AssignmentStatus";
import {
  IconEdit,
  IconEye,
  IconTimeline,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { format, parse } from "date-fns";
import { useDeleteSession } from "../../hooks/useDeleteSession";
import { ViewFeedback } from "../MonitorFeebBack/ViewFeedback";
import { MakeFeedback } from "../MonitorFeebBack/MakeFeedback";
import { ManageFeedback } from "../MonitorFeebBack/ManageFeedback";

type viewSessionsProps = {
  isAdvisor: boolean;
};

export const ViewSessions = ({ isAdvisor }: viewSessionsProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [edit, toggleEdit] = useState(false);
  const { data: sessions } = useFetchSessions(isAdvisor, {
    page,
    limit: pageSize,
  });

  const { mutate: deleteSession } = useDeleteSession({
    page,
    limit: pageSize,
  });

  const handleDelete = (id: string) => {
    modals.openConfirmModal({
      title: "Delete Session",
      children: "Are you sure you want to delete this session?",
      labels: { cancel: "No", confirm: "Yes" },
      onConfirm: () => deleteSession(id),
    });
  };

  const formatDate = (date: string) => {
    const formattedDate = format(date, "dd MMM yyyy");
    return formattedDate;
  };

  const formatTime = (time: string) => {
    const parsedTime = parse(time, "HH:mm:ss", new Date());
    return format(parsedTime, "h:mm aa");
  };

  console.log(sessions);
  return (
    <Container>
      <DataTable
        idAccessor={(record) => record.sessionId}
        withTableBorder
        borderRadius="md"
        height={800}
        columns={[
          {
            accessor: "studentEmail",
            title: "Student",
            render: (record) => record.studentEmail.split("@")[0],
          },
          {
            accessor: "advisorEmail",
            title: "Advisor",
            render: (record) => record.advisorEmail.split("@")[0],
          },
          {
            accessor: "isOnline",
            title: "Venue/Link",
            render: (record) => (record.isOnline ? "Google Meet" : "ddd"),
          },
          {
            accessor: "date",
            title: "date",
            render: (record) => formatDate(record.date),
          },
          {
            accessor: "Time",
            title: "Time",
            render: (record) => formatTime(record.startTime),
          },

          {
            accessor: "actions",
            title: <Box mr={6}>Actions</Box>,
            textAlign: "right",
            width: isAdvisor ? 80 : 0,
            render: (record) =>
              isAdvisor && (
                <Group gap={4} justify="right" wrap="nowrap">
                  <ManageFeedback
                    isAdvisor={isAdvisor}
                    sessionId={record.sessionId}
                  />
                  <ActionIcon size="sm" variant="subtle" color="red">
                    <IconTrash
                      onClick={() => handleDelete(record.eventId)}
                      size={16}
                    />
                  </ActionIcon>
                </Group>
              ),
          },
        ]}
        records={sessions?.payload}
        page={page}
        onPageChange={(p) => setPage(p)}
        totalRecords={sessions?.pages * pageSize}
        recordsPerPage={pageSize}
        recordsPerPageOptions={[2, 10, 15, 20, 25, 30]}
        onRecordsPerPageChange={(p) => setPageSize(p)}
      />
    </Container>
  );
};
