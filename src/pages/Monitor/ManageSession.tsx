import {
  ActionIcon,
  Box,
  Button,
  ComboboxData,
  Container,
  Group,
  Select,
  Stack,
  TextInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput, TimeInput } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import { useRef } from "react";
import { useFetchAdvisorStudents } from "../../hooks/useFetchAdvisorStudents";
import { useScheduleSession } from "../../hooks/useScheduleSession";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import Subscript from "@tiptap/extension-subscript";
import TextAlign from "@tiptap/extension-text-align";
import { useRescheduleSession } from "../../hooks/Session/useEditSession";
import { format, parse } from "date-fns";

export type EditSessionParams = {
  sessionId: number;
  edit: boolean;
  student: number;
  mode: string;
  venue: string;
  date: string;
  timeStart: string;
  timeEnd: string;
};

export const ManageSession = (props: {}) => {
  const parseToMilitaryTime = (time: string) => {
    const parsedTime = parse(time, "HH:mm:ss", new Date());
    return format(parsedTime, "HH:mm");
  };
  const { state } = useLocation() as { state: EditSessionParams };
  console.log(state, "state");
  const form = useForm({
    initialValues: {
      student: state?.student.toString() || "",
      mode: state?.mode || "",
      venue: state?.venue || "",
      date: (state?.date && new Date(state?.date)) || undefined,
      timeStart: state?.timeStart ? parseToMilitaryTime(state.timeStart) : "",
      timeEnd: state?.timeEnd ? parseToMilitaryTime(state?.timeEnd) : "",
    },
    validate: {
      student: (value) => (value.length <= 0 ? "Student is required" : null),
      mode: (value) => (value.length <= 0 ? "Mode is required" : null),
      venue: (value, values) =>
        values.mode !== "Online" && value.length == 0
          ? "Venue is required"
          : null,
      date: (value) => (value ? null : "Date is required"),
      timeStart: (value) =>
        value.length == 0 ? "Start time is required" : null,
      timeEnd: (value) => (value.length == 0 ? "End time is required" : null),
    },
  });
  const refStart = useRef<HTMLInputElement>(null);
  const refEnd = useRef<HTMLInputElement>(null);
  const { data: students } = useFetchAdvisorStudents();
  const { mutate: scheduleSession } = useScheduleSession();
  const { mutate: rescheduleSession } = useRescheduleSession();

  const pickerStart = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refStart.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const pickerEnd = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refEnd.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  console.log(form.values);
  const redirect = useNavigate();

  const formSubmit = () => {
    form.validate();
    if (!form.isValid()) {
      console.log(form.errors);

      console.log("Form is invalid");
      return;
    }
    if (state?.edit) {
      console.log("reschedule session!", form.values);
      rescheduleSession({
        sessionId: state.sessionId,
        studentId: Number.parseInt(form.values.student),
        date:
          (form?.values?.date && format(form.values.date, "yyyy-MM-dd")) || "",
        venue:
          form.values.mode === "Online" ? "Google Meet" : form.values.venue,
        isOnline: form.values.mode === "Online",
        startTime: form.values.timeStart,
        endTime: form.values.timeEnd,
      });
      return redirect("/sessions/view");
    }

    scheduleSession({
      studentId: Number.parseInt(form.values.student),
      date:
        (form?.values?.date && format(form.values.date, "yyyy-MM-dd")) || "",
      venue: form.values.mode === "Online" ? "Google Meet" : form.values.venue,
      isOnline: form.values.mode === "Online",
      startTime: form.values.timeStart,
      endTime: form.values.timeEnd,
    });
    return redirect("/sessions/view");
  };
  console.log(students, "students");

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
  return (
    <Container>
      <Stack>
        <Select
          label="Student"
          withAsterisk
          searchable
          {...form.getInputProps("student")}
          // onChange={console.log}
          onChange={(value) => value && form.setFieldValue("student", value)}
          placeholder="Choose student"
          data={studentsSelectList}
        />
        <Group grow justify="space-between" align="end">
          <Select
            label="Session Mode"
            withAsterisk
            value={form.values.mode}
            {...form.getInputProps("mode")}
            onChange={(value) => value && form.setFieldValue("mode", value)}
            placeholder="Choose mode"
            data={["Physical", "Online"]}
          />
          <TextInput
            label="Session Venue"
            withAsterisk
            disabled={form.values.mode === "Online"}
            {...form.getInputProps("venue")}
            value={
              form.values.mode == "Online" ? "Google Meet" : form.values.venue
            }
            onChange={(value) =>
              form.setFieldValue("venue", value.currentTarget.value)
            }
            placeholder="Enter venue"
          />
        </Group>
        <Group grow justify="space-between">
          <DateInput
            required
            label="Session Date"
            withAsterisk
            placeholder="Session date"
            {...form.getInputProps("date")}
          />
          <TimeInput
            required
            label="Start Time"
            withAsterisk
            ref={refStart}
            rightSection={pickerStart}
            {...form.getInputProps("timeStart")}
          />
          <TimeInput
            required
            label="End Time"
            withAsterisk
            {...form.getInputProps("timeEnd")}
            ref={refEnd}
            rightSection={pickerEnd}
          />
        </Group>
        <Button onClick={formSubmit}>
          {state?.edit ? "Reschedule" : "Schedule"} Session
        </Button>
      </Stack>
    </Container>
  );
};
