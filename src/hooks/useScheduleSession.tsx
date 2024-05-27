import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export interface SessionParams {
  studentId: number;
  date: string;
  venue: string;
  isOnline: boolean;
  startTime: string;
  endTime: string;
}

const scheduleSession = async (session: SessionParams) => {
  const { data } = await apiClient.post(`/monitor/`, session, {
    withCredentials: true,
  });

  return data;
};

export const useScheduleSession = () => {
  const queryClient = useQueryClient();
  return useMutation<SessionParams, Error, SessionParams>({
    mutationFn: scheduleSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions", 1, 15] });
    },
  });
};
