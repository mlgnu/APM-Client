import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { Assignments } from "../useMakeAssignment";

type EditAssignments = Assignments & { assignmentId: string };

const editAssignment = async (assignments: EditAssignments) => {
  const { data } = await apiClient.patch(
    "/assignment/edit",
    { assignments },
    { withCredentials: true },
  );
  return data;
};

export const useEditAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation<EditAssignments, Error, EditAssignments>({
    mutationFn: editAssignment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
};
