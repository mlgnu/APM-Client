import { PaginationProps } from "@mantine/core";
import apiClient from "../utils/apiClient";
import { PaginationParams } from "../utils/Globals";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

type FetchAssignmentsCoordinatorQueryParams = PaginationParams;

export interface AssignmentsCoordinatorResponse {
  payload: Payload[];
  pages: number;
}

export interface Payload {
  assignmentId: number;
  status: string;
  department: string;
  year: number;
  createdAt: string;
  updatedAt: string;
  message: string;
  coordinator: Coordinator;
}

interface Coordinator {
  id: number;
  user: User;
}

interface User {
  id: number;
  userEmail: string;
  role: number;
}

const fetchAssignments = async (
  fetchParams: FetchAssignmentsCoordinatorQueryParams,
) => {
  const { data } = await apiClient.get(`/assignment`, {
    withCredentials: true,
    params: { page: fetchParams.page, limit: fetchParams.limit },
  });
  return data;
};

export const useFetchAssignmentsForCoordinator = (
  params: FetchAssignmentsCoordinatorQueryParams,
) => {
  return useQuery<AssignmentsCoordinatorResponse, Error>({
    queryKey: ["assignments"],
    queryFn: () => fetchAssignments(params),
    placeholderData: keepPreviousData,
  });
};
