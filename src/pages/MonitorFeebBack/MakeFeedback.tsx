import {
  Text,
  ActionIcon,
  Button,
  Modal,
  Slider,
  Space,
  Textarea,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useSubmitFeedback } from "../../hooks/Feedback/useSubmitFeedback";
import { Dispatch, SetStateAction, useState } from "react";

type MakeFeedbackProps = {
  isEdit: boolean;
  sessionId: number;
  isAdvisor: boolean;
  toggleEdit: Dispatch<SetStateAction<boolean>>;
  close: () => void;
};

export const MakeFeedback = ({
  close,
  isEdit,
  toggleEdit,
  sessionId,
  isAdvisor,
}: MakeFeedbackProps) => {
  const [quantitativeFeedback, setQuantitativeFeedback] = useState(0);
  const [qualitativeFeedback, setQualitativeFeedback] = useState("");
  const { mutate: submitFeedback } = useSubmitFeedback();

  const handleSubmitFeedback = () => {
    submitFeedback({
      sessionId: sessionId,
      feedback: qualitativeFeedback,
      rating: quantitativeFeedback,
    });
    close();
  };
  return (
    <>
      <Space h="md"></Space>

      <Text size="14.2px" fw={500}>
        Quantitative Feedback
      </Text>
      <Space h="md"></Space>
      <Slider
        value={quantitativeFeedback}
        onChange={(value) => setQuantitativeFeedback(value)}
        styles={{
          label: {
            zIndex: 1000,
          },
        }}
        max={10}
        step={0.5}
      />
      <Space h="md"></Space>
      <Textarea
        value={qualitativeFeedback}
        onChange={(e) => setQualitativeFeedback(e.target.value)}
        placeholder="Write feedback"
        label="Qualitative Feedback"
      ></Textarea>

      <Space h="md"></Space>
      <Group grow>
        <Button
          onClick={() => {
            toggleEdit(false);
          }}
          color="blue"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            toggleEdit(false);
            handleSubmitFeedback();
            close();
          }}
          color="blue"
        >
          Save
        </Button>
      </Group>
    </>
  );
};
