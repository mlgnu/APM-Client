import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

type AssignmentActionParams = {
  assignmentId: number;
  isApprove: boolean;
};

const assignmentAction = async ({
  assignmentId,
  isApprove,
}: AssignmentActionParams) => {
  const { data } = await apiClient.post(
    `/assignment/${isApprove ? "approve" : "reject"}/${assignmentId}`,
  );
  return data;
};

export const useAssignmentAction = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { assignmentId: number; isApprove: boolean }>(
    {
      mutationFn: assignmentAction,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["assignments"] });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
