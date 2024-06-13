import { ActionIcon, Box, Container, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React, { useState } from "react";
import { useFetchActivities } from "../../hooks/Activity/useFetchActivities";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useDeleteActivity } from "../../hooks/Activity/useDeleteActivity";
import { modals } from "@mantine/modals";
import { format, parse } from "date-fns";
import ViewActivity from "./ViewActivity";
import { ActivityAction } from "./ActivityAction";
import { ActivityStatus } from "./ActivityStatus";

type ViewActivitiesProps = {
  isAdvisor: boolean;
  isCoordinator: boolean;
};

export const ViewActivities = ({
  isAdvisor,
  isCoordinator,
}: ViewActivitiesProps) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: activities } = useFetchActivities({
    page,
    limit: pageSize,
  });
  const { mutate: deleteActivity } = useDeleteActivity();

  const printStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case -1:
        return "Rejected";
      default:
        return "Pending";
    }
  };

  const parseToMilitaryTime = (time: string) => {
    const parsedTime = parse(time, "HH:mm:ss", new Date());
    return format(parsedTime, "HH:mm");
  };

  const navigate = useNavigate();
  const redirectEdit = (recordId: number) => {
    const record = activities?.payload.find((r) => r.id === recordId);
    navigate("/activity/make", {
      state: { edit: true, record },
    });
  };

  const handleDelete = (assignmentId: number) => {
    modals.openConfirmModal({
      title: "Delete Activity",
      children: "Are you sure you want to delete this activity?",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        console.log("Assignment deleted");
        deleteActivity(assignmentId);
      },
    });
  };

  return (
    <Container>
      <DataTable
        idAccessor={(record) => record.id}
        withTableBorder
        borderRadius="md"
        height={800}
        columns={[
          {
            accessor: "studentEmail",
            title: "Student",
            render: (record) => record.studentId.user.userEmail.split("@")[0],
          },
          {
            accessor: "advisorEmail",
            title: "Advisor",
            render: (record) => record.advisorId.user.userEmail.split("@")[0],
          },
          {
            accessor: "dfd",
            title: "Start",

            render: (record) =>
              format(new Date(record.dateStart), "d MMM yyyy"),
          },
          {
            accessor: "datddfe",
            title: "End",
            render: (record) => format(new Date(record.dateEnd), "d MMM yyyy"),
          },
          {
            accessor: "date",
            title: "Status",
            render: (record) => printStatus(record.status),
          },

          {
            accessor: "actions",
            title: <Box mr={6}>Actions</Box>,
            textAlign: "right",
            render: (record) => (
              <Group gap={4} justify="right" wrap="nowrap">
                <ActivityStatus
                  advisorEmail={record?.advisorId?.user?.userEmail}
                  coordinatorEmail={
                    record?.coordinatorId?.user?.userEmail || ""
                  }
                  status={record.status}
                  message={record.message || ""}
                  creationTime={record.createdAt}
                  modifiedTime={record.updatedAt}
                />
                <ViewActivity description={record.description} />
                {isCoordinator && <ActivityAction activityId={record.id} />}
                {isAdvisor && (
                  <>
                    <ActionIcon
                      onClick={() => redirectEdit(record.id)}
                      size="sm"
                      variant="subtle"
                      color="blue"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>

                    <ActionIcon
                      onClick={() => handleDelete(record.id)}
                      size="sm"
                      variant="subtle"
                      color="red"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            ),
          },
        ]}
        records={activities?.payload}
        page={page}
        onPageChange={(p) => setPage(p)}
        totalRecords={(activities?.pages || 0) * pageSize}
        recordsPerPage={pageSize}
        recordsPerPageOptions={[2, 10, 15, 20, 25, 30]}
        onRecordsPerPageChange={(p) => setPageSize(p)}
      />
    </Container>
  );
};
