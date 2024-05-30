import { useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

type ActivityReq = {
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
  return useMutation({
    mutationFn: makeActivity,
  });
};
