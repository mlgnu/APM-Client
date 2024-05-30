import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { PaginationParams } from "../../utils/Globals";

export interface ActivitiesResponse {
  payload: Payload[];
  pages: number;
}

export interface Payload {
  id: number;
  description: string;
  dateStart: string;
  dateEnd: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  studentId: StudentId;
  advisorId: AdvisorId;
}

export interface StudentId {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  user: User;
}

export interface User {
  id: number;
  userEmail: string;
  role: number;
}

export interface AdvisorId {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  user: User2;
}

export interface User2 {
  id: number;
  userEmail: string;
  role: number;
}

const fetchActivities = async ({
  queryKey,
}: QueryFunctionContext<[string, PaginationParams]>) => {
  const [, paginationParams] = queryKey;
  return await apiClient
    .get<ActivitiesResponse>("activity", {
      params: paginationParams,
    })
    .then((res) => res.data);
};

export const useFetchActivities = (paginationParams: PaginationParams) => {
  return useQuery({
    queryKey: ["activities", paginationParams],
    queryFn: fetchActivities,
  });
};
