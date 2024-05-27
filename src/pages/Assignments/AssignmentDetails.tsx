import { Button, NumberInput, Select, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Department } from "../../utils/Globals";

type AssignmentDetailsObj = {
  department: string;
  studentsNumber: string;
  batchYear: string;
};

type AssignmentDetailsProps = {
  assignmentDetails: AssignmentDetailsObj;
  setAssignmentDetails: React.Dispatch<
    React.SetStateAction<{
      department: string;
      studentsNumber: string;
      batchYear: string;
    }>
  >;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AssignmentDetails = ({
  assignmentDetails,
  setAssignmentDetails,
  setOpened,
}: AssignmentDetailsProps) => {
  const form = useForm({
    initialValues: {
      department: assignmentDetails.department,
      studentsNumber: assignmentDetails.studentsNumber,
      batchYear: assignmentDetails.batchYear,
    },

    // initialErrors: {
    //   department: "Please select a department",
    //   studentsNumber: "Please enter the number of students",
    //   batchYear: "Please enter the academic year",
    // },

    validate: {
      department: (value) =>
        value.length <= 0 ? "Please select a department" : null,
      studentsNumber: (value) =>
        value.length <= 0 ? "Please enter the number of students" : null,
      batchYear: (value) =>
        value.length <= 0 ? "Please enter the academic year" : null,
    },
  });

  const handleClick = () => {
    form.validate();
    if (!form.isValid()) return;
    setAssignmentDetails({
      department: form.values.department,
      studentsNumber: form.values.studentsNumber,
      batchYear: form.values.batchYear,
    });
    setOpened(false);
  };

  return (
    <Stack>
      <Select
        withAsterisk
        label="Department"
        {...form.getInputProps("department")}
        data={Department}
        placeholder="Department"
      />
      <NumberInput
        withAsterisk
        label="Number of Students"
        allowNegative={false}
        allowDecimal={false}
        {...form.getInputProps("studentsNumber")}
        placeholder="Number of students"
      />
      <NumberInput
        withAsterisk
        label="Academic Year"
        allowNegative={false}
        {...form.getInputProps("batchYear")}
        placeholder="Academic Year"
      />
      <Button onClick={handleClick}>Confirm Assignment Details</Button>
    </Stack>
  );
};
