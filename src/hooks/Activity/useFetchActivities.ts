import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { PaginationParams } from "../../utils/Globals";

export interface ActivitiesResponse {
  payload: Payload[];
  pages: number;
}

export interface Payload {
  id: number;
  message: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  studentId: StudentId;
  advisorId: AdvisorId;
  coordinatorId: CoordinatorId;
}

export interface StudentId {
  id: number;
  user: User;
}

export interface User {
  id: number;
  userEmail: string;
}

export interface AdvisorId {
  id: number;
  user: User2;
}

export interface User2 {
  userEmail: string;
}

export interface CoordinatorId {
  id: number;
  user: User3;
}

export interface User3 {
  userEmail: string;
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
