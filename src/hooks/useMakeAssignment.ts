import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { AssignmentType } from "../pages/Assignments/Assignment";

export type Assignments = {
  department: string;
  studentsNumber: string;
  batchYear: string;
  assignments: Omit<AssignmentType, "assignmentNum">[];
};

const makeAssignment = async (assignments: Assignments) => {
  const { data } = await apiClient.post(
    "/assignment/assign",
    { assignments },
    { withCredentials: true },
  );
  return data;
};

export const useMakeAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation<Assignments, Error, Assignments>({
    mutationFn: makeAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
};
