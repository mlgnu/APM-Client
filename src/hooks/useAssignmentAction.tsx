import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

type AssignmentActionParams = {
  assignmentId: number;
  isApprove: boolean;
  message?: string;
};

const assignmentAction = async ({
  assignmentId,
  isApprove,
  message,
}: AssignmentActionParams) => {
  const { data } = await apiClient.post(
    `/assignment/${isApprove ? "approve" : "reject"}/${assignmentId}`,
    { message },
  );
  return data;
};

export const useAssignmentAction = () => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    Error,
    { assignmentId: number; isApprove: boolean; message?: string }
  >({
    mutationFn: assignmentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
