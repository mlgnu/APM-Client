import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export type ActivityReq = {
  studentId: number;
  description: string;
  startDate: Date;
  endDate: Date;
};

const makeActivity = async (activity: ActivityReq) => {
  const data = await apiClient.post("activity", activity);
  return data;
};

export const useMakeActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
};
