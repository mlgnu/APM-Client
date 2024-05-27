import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export interface StudentResponse {
  userEmail: string;
  firstName: string;
  lastName: string;
  studentId: number;
}

const fetchadvisorstudents = async () => {
  const { data } = await apiClient.get(`/monitor/students/`, {
    withCredentials: true,
  });
  return data;
};

export const useFetchAdvisorStudents = () => {
  return useQuery<StudentResponse[], Error, StudentResponse[]>({
    queryKey: ["students"],
    queryFn: () => fetchadvisorstudents(),
  });
};
