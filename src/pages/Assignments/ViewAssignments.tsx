import "mantine-datatable/styles.css";
import { DataTable } from "mantine-datatable";
import {
  ActionIcon,
  Box,
  Container,
  Group,
  Modal,
  ScrollArea,
  ScrollAreaAutosize,
} from "@mantine/core";
import {
  IconEdit,
  IconEye,
  IconTrash,
  IconTimeline,
  IconCheck,
  IconXboxX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  Payload,
  useFetchAssignmentsForCoordinator,
} from "../../hooks/useFetchAssignmentsForCoordinator";
import { modals } from "@mantine/modals";
import { AssignmentStatus } from "./AssignmentStatus";
import { DisplayAssignment } from "./DisplayAssignment";
import { useDisclosure } from "@mantine/hooks";
import { useDeleteAssignment } from "../../hooks/useDeleteAssignment";
import { Assignment, EditAssignmentProps } from "./Assignment";
import { useAssignmentAction } from "../../hooks/useAssignmentAction";
import { useNavigate } from "react-router-dom";
import { useFetchStudentAdvisorAssignment } from "../../hooks/useFetchStudentAdvisorAssignments";

type ViewAssignmentsProps = {
  isSupervisor: boolean;
};

export const ViewAssignments = ({ isSupervisor }: ViewAssignmentsProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openEdit, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [displayedAssignment, setDisplayedAssignment] = useState(0);
  const deleteAssignment = useDeleteAssignment();
  const [isEdit, setIsEdit] = useState(false);
  const [editedAssignmentId, setEditedAssignment] = useState(-1);

  const [page, setPage] = useState(1);
  const { data: newData } = useFetchAssignmentsForCoordinator({
    limit: 15,
    page: page,
  });

  const { data: assignments } =
    useFetchStudentAdvisorAssignment(displayedAssignment);
  const { mutate: approveAssignment } = useAssignmentAction();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("from view Assignments effect test!");
    const handleEdit = () => {
      const editedAssignment = newData?.payload?.find(
        (assignment) => assignment.assignmentId === editedAssignmentId,
      );
      const state: EditAssignmentProps = {
        edit: true,
        record: {
          assignments:
            assignments?.map((assignment) => ({
              assignmentNum: assignment.assignmentId,
              studentId: assignment.studentEmail.split("@")[0],
              advisorId: assignment.advisorEmail.split("@")[0],
            })) || [],
          department: editedAssignment?.department || "",
          studentsNumber: assignments?.length.toString() || "",
          batchYear: editedAssignment?.year.toString() || "",
          assignmentId: editedAssignmentId,
        },
      };
      navigate(`/assignment/`, {
        state,
      });
    };
    if (isEdit && (assignments?.length || 0) > 0 && editedAssignmentId !== -1)
      handleEdit();
  }, [
    displayedAssignment,
    assignments,
    navigate,
    isEdit,
    editedAssignmentId,
    newData?.payload,
  ]);

  const handleApprove = (assignmentId: number) => {
    modals.openConfirmModal({
      title: "Approve Assignment",
      children: "Are you sure you want to approve this assignment?",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        console.log("Assignment approved");
        approveAssignment({ assignmentId, isApprove: true });
      },
    });
  };

  const handleReject = (assignmentId: number) => {
    modals.openConfirmModal({
      title: "Reject Assignment",
      children: "Are you sure you want to reject this assignment?",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        console.log("Assignment rejected");
        approveAssignment({ assignmentId, isApprove: false });
      },
    });
  };

  const handleDelete = (assignmentId: number) => {
    modals.openConfirmModal({
      title: "Delete Assignment",
      children: "Are you sure you want to delete this assignment?",
      labels: { confirm: "Yes", cancel: "No" },
      onConfirm: () => {
        console.log("Assignment deleted");
        deleteAssignment.mutate(assignmentId);
      },
    });
  };
  const data = newData?.payload;
  console.log(newData);
  return (
    <Container>
      <DataTable
        idAccessor={(record) => record.assignmentId}
        withTableBorder
        borderRadius="md"
        height={800}
        columns={[
          { accessor: "assignmentId", title: "ID" },
          { accessor: "department" },
          { accessor: "year" },
          { accessor: "status" },
          {
            accessor: "actions",
            title: <Box mr={6}>Actions</Box>,
            textAlign: "right",
            width: 80,
            render: (record) => (
              <Group gap={4} justify="right" wrap="nowrap">
                <ActionIcon
                  onClick={() => {
                    console.log(record);
                    modals.open({
                      title: "Assignment Timeline",
                      children: (
                        <AssignmentStatus
                          coordinatorEmail={record.coordinator.user.userEmail}
                          creationTime={record.createdAt}
                          status={record.status}
                          message={record.message}
                          modifiedTime={record.updatedAt}
                        />
                      ),
                    });
                  }}
                  size="sm"
                  variant="subtle"
                  color="green"
                >
                  <IconTimeline size={16} />
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    setDisplayedAssignment(record.assignmentId);
                    open();
                  }}
                  size="sm"
                  variant="subtle"
                  color="yellow"
                >
                  <IconEye size={16} />
                </ActionIcon>
                {!isSupervisor ? (
                  <>
                    <ActionIcon
                      onClick={() => {
                        setIsEdit(true);
                        setEditedAssignment(record.assignmentId);
                        setDisplayedAssignment(record.assignmentId);
                      }}
                      size="sm"
                      variant="subtle"
                      color="blue"
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                    <ActionIcon
                      onClick={() => handleDelete(record.assignmentId)}
                      size="sm"
                      variant="subtle"
                      color="red"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </>
                ) : (
                  <>
                    <ActionIcon
                      onClick={() => handleApprove(record.assignmentId)}
                      size="sm"
                      variant="subtle"
                      color="blue"
                    >
                      <IconCheck size={16} />
                    </ActionIcon>

                    <ActionIcon
                      onClick={() => handleReject(record.assignmentId)}
                      size="sm"
                      variant="subtle"
                      color="red"
                    >
                      <IconXboxX size={16} />
                    </ActionIcon>
                  </>
                )}
              </Group>
            ),
          },
        ]}
        records={data}
        page={page}
        onPageChange={(p) => setPage(p)}
        totalRecords={newData ? newData.pages * 15 : 0}
        recordsPerPage={15}
      />
      <Modal
        opened={opened}
        size="auto"
        scrollAreaComponent={ScrollArea.Autosize}
        withCloseButton={false}
        onClose={close}
      >
        <DisplayAssignment assignments={assignments || []} />
      </Modal>
      <Modal opened={openEdit} onClose={closeEditModal}>
        <Assignment />
      </Modal>
    </Container>
  );
};
