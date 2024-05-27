import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Center,
  Input,
  Modal,
  ScrollAreaAutosize,
  Table,
  TextInput,
} from "@mantine/core";
import { AssignmentDetails } from "./AssignmentDetails";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { modals } from "@mantine/modals";
import { IconAdjustments } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useMakeAssignment } from "../../hooks/useMakeAssignment";
import classes from "./style/assignment.module.css";
import { parse } from "date-fns";
import { useNavigate } from "react-router-dom";

export type AssignmentType = {
  assignmentNum: number;
  studentId: string;
  advisorId: string;
};

export const Assignment = () => {
  const [opened, setOpened] = useState(true);
  const [assignmentDetails, setAssignmentDetails] = useState({
    department: "",
    studentsNumber: "",
    batchYear: "",
  });

  useEffect(() => {}, [assignmentDetails.studentsNumber]);

  const assignments: AssignmentType[] = useMemo(() => [], []);

  if (assignments.length != parseInt(assignmentDetails.studentsNumber)) {
    if (assignments.length < parseInt(assignmentDetails.studentsNumber)) {
      for (
        let i = assignments.length;
        i < parseInt(assignmentDetails.studentsNumber);
        i++
      ) {
        assignments.push({
          assignmentNum: i + 1,
          studentId: "",
          advisorId: "",
        });
      }
    } else if (
      assignments.length > parseInt(assignmentDetails.studentsNumber)
    ) {
      assignments.splice(
        parseInt(assignmentDetails.studentsNumber),
        assignments.length - parseInt(assignmentDetails.studentsNumber),
      );
    }
  }

  if (assignments.length == 0) {
    for (let i = 0; i < parseInt(assignmentDetails.studentsNumber); i++) {
      assignments.push({
        assignmentNum: i + 1,
        studentId: "",
        advisorId: "",
      });
    }
  }

  const rows = assignments.map((assignment) => (
    <Table.Tr key={assignment.assignmentNum}>
      <Table.Td>{assignment.assignmentNum}</Table.Td>
      <Table.Td>
        {
          <TextInput
            required
            classNames={{ section: classes.section }}
            rightSection={"@siswa.um.edu.my"}
            onBlur={(e) => {
              assignment.studentId = e.target.value;
              console.log(assignments);
            }}
            variant="filled"
          />
        }
      </Table.Td>
      <Table.Td>
        {
          <TextInput
            required
            classNames={{ section: classes.section }}
            rightSection={"@um.edu.my"}
            onBlur={(e) => {
              assignment.advisorId = e.target.value;
              console.log(assignments);
            }}
            variant="filled"
          />
        }
      </Table.Td>
      <Table.Td>{assignmentDetails.batchYear}</Table.Td>
      <Table.Td>{assignmentDetails.department}</Table.Td>
    </Table.Tr>
  ));

  console.log(rows, "rows");
  const redirect = useNavigate();

  const { mutate } = useMakeAssignment();
  const handleMakeAssignment = () => {
    if (
      assignments.some(
        (assignment) =>
          assignment.studentId === "" || assignment.advisorId === "",
      )
    ) {
      notifications.show({
        title: "Missing Fields",
        message: "Please fill all the fields for students and advisors.",
        color: "red",
      });
      return;
    }
    modals.openConfirmModal({
      title: "Make Assignment",
      children: "Are you sure you want to make this assignment?",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        mutate({
          coordinatorId: "1",
          department: assignmentDetails.department,
          studentsNumber: assignmentDetails.studentsNumber,
          batchYear: assignmentDetails.batchYear.toString(),
          assignments: assignments,
        });
        redirect("/assignments/view");
      },
    });
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        title="Assignment Details"
        opened={opened}
        onClose={() => {
          console.log("closing...");
          // setOpened(false);
        }}
        closeOnClickOutside={false}
      >
        <AssignmentDetails
          assignmentDetails={assignmentDetails}
          setAssignmentDetails={setAssignmentDetails}
          setOpened={setOpened}
        />
      </Modal>

      <Center>
        <Box>
          <Table.ScrollContainer
            component={ScrollAreaAutosize}
            mah="800"
            minWidth={1200}
          >
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th maw="30px">No.</Table.Th>
                  <Table.Th>Student Email</Table.Th>
                  <Table.Th>Advisor Email</Table.Th>
                  <Table.Th>Year</Table.Th>
                  <Table.Th>Department</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          <Button fullWidth maw="1200" onClick={handleMakeAssignment}>
            Make Assignment
          </Button>
        </Box>
      </Center>

      {!opened && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            onClick={() => setOpened(true)}
            size="lg"
            variant="filled"
            aria-label="Settings"
          >
            <IconAdjustments stroke={1.5} />
          </ActionIcon>
        </Affix>
      )}
    </>
  );
};