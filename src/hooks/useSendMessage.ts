import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export interface MessageResponse {
  senderId: number;
  recieverId: number;
  content: string;
  id: number;
  timestamp: string;
}
type sendMessageParams = {
  message: string;
  recieverId: number;
  isAdvisor: boolean;
};

const sendMessage = async (messageParams: sendMessageParams) => {
  const { data } = await apiClient.post(
    "message/" + (messageParams.isAdvisor ? "advisor" : "student"),
    { message: messageParams.message, recieverId: messageParams.recieverId },
    {
      withCredentials: true,
    },
  );
  return data;
};

export const useSendMessage = (recieverId: number) => {
  const queryClient = useQueryClient();
  return useMutation<MessageResponse, Error, sendMessageParams>({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["message", recieverId] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
