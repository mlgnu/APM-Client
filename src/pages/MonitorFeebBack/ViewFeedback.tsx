import {
  ActionIcon,
  Alert,
  Button,
  Group,
  Modal,
  NumberFormatter,
  Paper,
  Slider,
  Space,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandFeedly, IconEdit } from "@tabler/icons-react";
import { useFetchFeedback } from "../../hooks/Feedback/useFetchFeedback";
import { Dispatch, SetStateAction } from "react";

type ViewFeedbackProps = {
  sessionId: number;
  isAdvisor: boolean;
  toggleEdit: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  close: () => void;
};

export const ViewFeedback = ({
  close,
  toggleEdit,
  sessionId,
  isAdvisor,
  isEdit,
}: ViewFeedbackProps) => {
  const { data: feedback } = useFetchFeedback({
    sessionId,
    enabled: !isEdit,
  });

  return (
    <div>
      <Space h="md"></Space>
      <Text size="14.2px" fw={500}>
        Quantitative Feedback:
      </Text>
      <Space h="md"></Space>

      <Slider
        value={feedback?.rating || 0}
        styles={{
          label: {
            zIndex: 1000,
          },
        }}
        labelAlwaysOn={true}
        max={10}
        step={0.5}
      />
      <Space h="md"></Space>

      <Alert
        variant="light"
        color="grey"
        title="Qualitative Feedback:"
        icon={<IconBrandFeedly />}
      >
        {feedback?.feedback || "No feedback is available yet"}
      </Alert>
      <Space h="md"></Space>
      <Group grow>
        <Button onClick={close} color="blue">
          Close
        </Button>
        {isAdvisor && (
          <Button
            onClick={() => {
              toggleEdit(true);
            }}
            color="blue"
          >
            Edit
          </Button>
        )}
      </Group>
    </div>
  );
};
