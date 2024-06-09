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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useFetchFeedback } from "../../hooks/Feedback/useFetchFeedback";

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
  const { data: feedback } = useFetchFeedback({
    sessionId,
    enabled: isEdit,
  });
  const { mutate: submitFeedback } = useSubmitFeedback();

  const form = useForm({
    initialValues: {
      quantitativeFeedback: feedback?.rating || 0,
      qualitativeFeedback: feedback?.feedback || "",
    },
    validate: {
      quantitativeFeedback: (value) =>
        value > 0 && value <= 10 ? null : "Value should be between 1 and 10",
      qualitativeFeedback: (value) =>
        value.length > 0 ? null : "Feedback should not be empty",
    },
  });

  const handleSubmitFeedback = () => {
    submitFeedback({
      sessionId: sessionId,
      feedback: form.values.qualitativeFeedback,
      rating: form.values.quantitativeFeedback,
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
        {...form.getInputProps("quantitativeFeedback")}
        styles={{
          label: {
            zIndex: 1000,
          },
        }}
        max={10}
        step={0.5}
      />
      {form.errors.quantitativeFeedback && (
        <>
          <Space h="xs"></Space>
          <Text c="red" size="xs">
            {form.errors.quantitativeFeedback}
          </Text>
        </>
      )}
      <Space h="md"></Space>
      <Textarea
        {...form.getInputProps("qualitativeFeedback")}
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
            form.validate();
            console.log(form.errors, "errors");
            if (!form.isValid()) return;
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
