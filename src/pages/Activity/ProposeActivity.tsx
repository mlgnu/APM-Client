import {
  Button,
  ComboboxData,
  Container,
  Group,
  Select,
  Space,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { UseFormReturnType, useForm } from "@mantine/form";
import React, { useRef, useState } from "react";
import { useFetchAdvisorStudents } from "../../hooks/useFetchAdvisorStudents";
import { DatePickerInput } from "@mantine/dates";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { useMakeActivity } from "../../hooks/Activity/useMakeActivity";

export const ProposeActivity = (props: {}) => {
  const form = useForm({
    initialValues: {
      student: "",
      activityDuration: [undefined, undefined],
      content: "",
    },
    validate: {
      student: (value) => (value.length <= 0 ? "Student is required" : null),
      activityDuration: (value) =>
        value[0] === null ? "Activity duration is required" : null,
      content: (value) =>
        editorExtensions &&
        editorExtensions.getText().length! <= 0 &&
        active === 1
          ? "Content is required"
          : null,
    },
  });

  const { mutate: makeActivity } = useMakeActivity();
  const { data: students } = useFetchAdvisorStudents();
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 2 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current >= 0 ? current - 1 : current));

  const studentsSelectList: ComboboxData | undefined = students?.map(
    (student) => {
      return {
        label:
          student.firstName +
          " " +
          student.lastName +
          " | " +
          student.userEmail.split("@")[0],
        value: student.studentId.toString(),
      };
    },
  );
  const handleMakeActivity = () => {
    makeActivity({
      studentId: parseInt(form.values.student),
      description: form.values.content,
      startDate: form.values.activityDuration[0] as unknown as Date,
      endDate: form.values.activityDuration[1] as unknown as Date,
    });
  };
  const editorExtensions = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    injectCSS: true,
    content: form.values.content,
  });
  editorExtensions?.on("blur", () => {
    console.log("blur");
    form.setFieldValue("content", editorExtensions.getHTML());
    form.validate();
  });
  console.log(form.values, "form values");
  return (
    <>
      <Container>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="First step" description="Activity information">
            <Select
              label="Student"
              withAsterisk
              searchable
              {...form.getInputProps("student")}
              onChange={(value) =>
                value && form.setFieldValue("student", value)
              }
              placeholder="Choose student"
              data={studentsSelectList}
            />
            <Space h="md"></Space>

            <DatePickerInput
              placeholder="Select activity duration"
              type="range"
              label="Activity duration"
              {...form.getInputProps("activityDuration")}
            />
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Activity content">
            <form id="form-2">
              <RichTextEditor
                style={{
                  minHeight: "500px",
                }}
                editor={editorExtensions}
                autoFocus
              >
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                  </RichTextEditor.ControlsGroup>

                  <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                  </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
              </RichTextEditor>
              {form.errors.content && (
                <Text size="sm" c="red">
                  {form.errors.content}
                </Text>
              )}
            </form>
          </Stepper.Step>
        </Stepper>
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button
            onClick={() => {
              console.log(active, "active");
              if (active === 0) {
                form.validate();
                if (!form.isValid()) {
                  console.log(form.errors, "form errors");
                  return;
                }
                nextStep();
                editorExtensions?.chain().focus().run();
              } else if (active === 1) {
                form.validate();
                if (!form.isValid()) {
                  console.log(form.errors, "form errors");
                  return;
                }
                handleMakeActivity();
              }
            }}
          >
            Next step
          </Button>
        </Group>
      </Container>
    </>
  );
};
