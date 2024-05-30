import { ActionIcon, Box, Container, Group } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import React, { useState } from "react";
import { useFetchActivities } from "../../hooks/Activity/useFetchActivities";
import { IconTrash } from "@tabler/icons-react";

export const ViewActivities = (props: {}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: activities } = useFetchActivities({
    page,
    limit: pageSize,
  });

  const printStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Rejected";
      default:
        return "Pending";
    }
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
            accessor: "",
            title: "Start",
            render: (record) => record.dateStart,
          },
          {
            accessor: "date",
            title: "End",
            render: (record) => record.dateEnd,
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
                <ActionIcon size="sm" variant="subtle" color="red">
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={activities?.payload}
        page={page}
        onPageChange={(p) => setPage(p)}
        totalRecords={activities?.pages * pageSize}
        recordsPerPage={pageSize}
        recordsPerPageOptions={[2, 10, 15, 20, 25, 30]}
        onRecordsPerPageChange={(p) => setPageSize(p)}
      />
    </Container>
  );
};
