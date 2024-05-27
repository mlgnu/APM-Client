import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { PaginationParams } from "../utils/Globals";

const deleteSession = async (sessionId: string) => {
  await apiClient.delete(`/monitor/${sessionId}`, {
    withCredentials: true,
  });
};

export const useDeleteSession = (paginationparams: PaginationParams) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sessions", paginationparams.page, paginationparams.limit],
      });
    },
  });
};
