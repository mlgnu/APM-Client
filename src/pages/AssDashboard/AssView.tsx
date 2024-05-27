import { ActionIcon, Group, Modal, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEye } from "@tabler/icons-react";
import { AssDashRes } from "../../hooks/AssDash/useFetchAssDash";
import { useFetchAssBatch } from "../../hooks/AssDash/useFetchAssBatch";

type AssViewProps = {
  record: AssDashRes;
};

export const AssView = ({ record }: AssViewProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: batch } = useFetchAssBatch({
    year: record.year,
    department: record.department,
    enabled: opened,
  });

  const batchRows = batch?.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.id}</Table.Td>
      <Table.Td>{row.studentEmail}</Table.Td>
      <Table.Td>{row.advisorEmail}</Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <Group gap={4} justify="right" wrap="nowrap">
        <ActionIcon onClick={open} size="sm" variant="subtle" color="blue">
          <IconEye size={16} />
        </ActionIcon>
      </Group>

      <Modal opened={opened} onClose={close}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Student Email</Table.Th>
              <Table.Th>Advisor Email</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{batchRows}</Table.Tbody>
        </Table>
      </Modal>
    </>
  );
};
