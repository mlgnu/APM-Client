import { useFetchStudentAdvisorAssignment } from "../../hooks/useFetchStudentAdvisorAssignments";
import { Table } from "@mantine/core";

type displayAssignmentProps = {
  assignmentId: number;
};

export const DisplayAssignment = ({ assignmentId }: displayAssignmentProps) => {
  const { data: assignments } = useFetchStudentAdvisorAssignment(assignmentId);

  const rows = assignments?.map((assignment) => (
    <Table.Tr key={assignment.id}>
      <Table.Td>{assignment.id}</Table.Td>
      <Table.Td>{assignment.studentEmail}</Table.Td>
      <Table.Td>{assignment.advisorEmail}</Table.Td>
      <Table.Td>{assignment.year}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>ID</Table.Th>
          <Table.Th>Student Email</Table.Th>
          <Table.Th>Advisor Email</Table.Th>
          <Table.Th>Year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
