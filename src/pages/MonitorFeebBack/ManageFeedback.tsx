import { ActionIcon, Box, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { ViewFeedback } from "./ViewFeedback";
import { ViewSessions } from "../Monitor/ViewSessions";
import { MakeFeedback } from "./MakeFeedback";

type ManageFeedbackProps = {
  isAdvisor: boolean;
  sessionId: number;
};

export const ManageFeedback = ({
  isAdvisor,
  sessionId,
}: ManageFeedbackProps) => {
  const [edit, toggleEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <ActionIcon onClick={open} size="sm" variant="subtle" color="blue">
        <IconEdit size={16} />
      </ActionIcon>

      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={() => {
          toggleEdit(false);
          close();
        }}
      >
        {!edit ? (
          <ViewFeedback
            close={close}
            isEdit={edit}
            isAdvisor={isAdvisor}
            toggleEdit={toggleEdit}
            sessionId={sessionId}
          />
        ) : (
          <MakeFeedback
            close={close}
            isEdit={edit}
            isAdvisor={isAdvisor}
            toggleEdit={toggleEdit}
            sessionId={sessionId}
          />
        )}
      </Modal>
    </Box>
  );
};
