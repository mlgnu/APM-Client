import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

interface MessageResponse {
  id: number;
  senderId: number;
  recieverId: number;
  content: string;
  timestamp: string;
  isSender: boolean;
}

const fetchChat = async (isAdvisor: boolean, recieverId?: number) => {
  if (!recieverId) {
    return [];
  }
  const { data } = await apiClient.get(
    "message/chat/" + (isAdvisor ? "advisor/" : "student/") + recieverId,
    {
      withCredentials: true,
    },
  );
  return data;
};

export const useFetchChat = (
  refetchInterval: number,
  isAdvisor: boolean,
  recieverId?: number,
) => {
  return useQuery<MessageResponse[], Error>({
    queryKey: ["chat", recieverId],
    refetchInterval: refetchInterval,
    queryFn: () => fetchChat(isAdvisor, recieverId),
    placeholderData: keepPreviousData,
  });
};
