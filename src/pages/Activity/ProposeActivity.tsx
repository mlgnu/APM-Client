import {
  Button,
  ComboboxData,
  Container,
  Group,
  Select,
  Space,
  Stepper,
  TextInput,
} from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useFetchAdvisorStudents } from "../../hooks/useFetchAdvisorStudents";
import { DatePickerInput } from "@mantine/dates";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

export const ProposeActivity = (props: {}) => {
  const form = useForm({
    initialValues: {
      student: "",
      activityDuration: [null, null],
      studentSecond: "",
    },
    validate: {
      student: (value) => (value.length <= 0 ? "Student is required" : null),
      activityDuration: (value) =>
        value.length <= 0 ? "Activity duration is required" : null,
      studentSecond: (value) =>
        value.length <= 0 && active == 1 ? "Student is required" : null,
    },
  });
  const { data: students } = useFetchAdvisorStudents();
  const [active, setActive] = useState(0);
  const [activityRange, setActivityRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
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
  const content = "";
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
    content,
  });
  console.log(form.values, "form values");
  const handleSubmission = () => {};
  return (
    <>
      <Container>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step label="First step" description="Activity information">
            <form id="form-1" onSubmit={form.onSubmit(handleSubmission)}>
              <Select
                label="Student"
                withAsterisk
                searchable
                {...form.getInputProps("student")}
                // onChange={console.log}
                onChange={(value) =>
                  value && form.setFieldValue("student", value)
                }
                placeholder="Choose student"
                data={studentsSelectList}
              />
              <Space h="md"></Space>

              <DatePickerInput
                type="range"
                label="Activity duration"
                {...form.getInputProps("activityDuration")}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Activity content">
            <form id="form-2">
              <RichTextEditor
                style={{
                  minHeight: "500px",
                }}
                editor={editorExtensions}
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

              <Button type="submit">Submit</Button>
            </form>
          </Stepper.Step>
        </Stepper>
        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button onClick={nextStep}>Next step</Button>
        </Group>
      </Container>
    </>
  );
};
