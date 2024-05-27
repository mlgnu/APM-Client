import { DataTable } from "mantine-datatable";
import { useFetchAssDash } from "../../hooks/AssDash/useFetchAssDash";
import { ActionIcon, Box, Container, Group } from "@mantine/core";
import { IconEdit, IconEye, IconEyeEdit } from "@tabler/icons-react";
import { AssView } from "./AssView";

export const AssDashboard = (props: {}) => {
  const { data: batches } = useFetchAssDash();

  return (
    <Container>
      <DataTable
        withTableBorder
        borderRadius="md"
        height={800}
        records={batches}
        columns={[
          {
            accessor: "id",
            title: "ID",
          },
          {
            accessor: "department",
            title: "Department",
          },
          {
            accessor: "year",
            title: "Year",
          },
          {
            accessor: "actions",
            title: <Box mr={6}>Actions</Box>,
            textAlign: "right",
            render: (record) => <AssView record={record} />,
          },
        ]}
      />
    </Container>
  );
};
