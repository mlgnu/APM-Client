import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface FeedbackRes {
  id: number;
  rating: number;
  feedback: string;
  sessionId: number;
}

const fetchFeedback = async ({ queryKey }: { queryKey: [string, number] }) => {
  const [, sessionId] = queryKey;
  const response = await apiClient.get<FeedbackRes>(`/feedback/${sessionId}`);
  return response.data;
};

export const useFetchFeedback = ({
  sessionId,
  enabled,
}: {
  sessionId: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["feedback", sessionId],
    queryFn: fetchFeedback,
    enabled,
  });
};
