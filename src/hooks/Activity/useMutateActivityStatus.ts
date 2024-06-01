import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

type MutateActivityParams = {
  activityId: number;
  mutationType: number;
  comment?: string;
};

const mutateActivityStatus = async (mutationParms: MutateActivityParams) => {
  const data = await apiClient.patch(
    `/activity/${mutationParms.mutationType == 1 ? "approve" : "reject"}/${mutationParms.activityId}`,
    { message: mutationParms.comment },
  );
  return data;
};

export const useMutateActivityStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutateActivityStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
};
