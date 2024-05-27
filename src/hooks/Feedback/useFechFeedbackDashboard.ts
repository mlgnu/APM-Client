import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface DashboardFeedbackResponse {
  rating: number;
  student: Student;
  month: string;
  year: string;
}

interface Student {
  first_name: string;
  email: string;
}

const fetchFeedbackDashboard = async () => {
  const { data } =
    await apiClient.get<DashboardFeedbackResponse[]>(`feedback/dashboard/`);
  return data;
};

export const useFetchFeedbackDashboard = () => {
  return useQuery({
    queryKey: ["feedbackDashboard"],
    queryFn: fetchFeedbackDashboard,
  });
};
