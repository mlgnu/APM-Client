import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export type EditAnnouncementParams = {
  id: string;
  title: string;
  announcement: string;
};
const editAnnouncement = async (announcement: EditAnnouncementParams) => {
  const res = await apiClient.post(`/announcements/edit/${announcement.id}`, {
    announcement: announcement,
  });
  return res;
};

export const useEditAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editAnnouncement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};
