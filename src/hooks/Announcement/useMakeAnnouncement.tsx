import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export type AnnouncementParams = {
  announcement: string;
  title: string;
};

const makeAnnouncement = async (announcement: AnnouncementParams) => {
  const res = await apiClient.post<string>(`/announcements/make`, {
    announcement,
  });
  return res;
};

export const useMakeAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: makeAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};
