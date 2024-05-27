import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export type StudentAdvisorResponse = {
  id: number;
  studentEmail: string;
  advisorEmail: string;
  year: number;
  assignmentId: number;
};

const fetchStudentAdvisorAsgmnt = async (id: number) => {
  const { data } = await apiClient.get(`/assignment/sa/${id}`, {
    withCredentials: true,
  });
  return data;
};

export const useFetchStudentAdvisorAssignment = (id: number) => {
  return useQuery<StudentAdvisorResponse[], Error>({
    queryKey: ["assignments", "sa", id],
    queryFn: () => fetchStudentAdvisorAsgmnt(id),
  });
};
