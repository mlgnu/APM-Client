import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { ActivityReq } from "./useMakeActivity";

type updateActivity = ActivityReq & { id: number };

const editActivity = async (activity: updateActivity) => {
  const data = await apiClient.patch(`activity/${activity.id}`, activity);
  return data;
};

export const useEditActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
};
