import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionParams } from "../useScheduleSession";
import apiClient from "../../utils/apiClient";

type EditSession = SessionParams & { sessionId: number };

const rescheduleSession = async ({ sessionId, ...session }: EditSession) => {
  const { data } = await apiClient.patch(`/monitor/${sessionId}`, session, {
    withCredentials: true,
  });

  return data;
};

export const useRescheduleSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rescheduleSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions", 1, 15] });
    },
  });
};
