import { useMutation } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

type SubmitFeedbackParams = {
  sessionId: number;
  feedback: string;
  rating: number;
};

const submitFeedback = async (feedback: SubmitFeedbackParams) => {
  const response = await apiClient.post("/feedback", feedback);
  return response.data;
};

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: submitFeedback,
  });
};
