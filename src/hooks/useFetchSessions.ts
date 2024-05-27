import { keepPreviousData, useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";
import { PaginationParams } from "../utils/Globals";

export interface SessionsResponse {
  pages: number;
  payload: Payload[];
}

export interface Payload {
  studentId: number;
  advisorEmail: string;
  studentEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  venue: string;
  eventId: string;
  sessionId: number;
}
const fetchSessions = async (
  isAdvisor: boolean,
  paginationParams: PaginationParams,
) => {
  const { data } = await apiClient.get(
    "/monitor/" + (isAdvisor ? "advisor" : "student"),
    {
      withCredentials: true,
      params: paginationParams,
    },
  );
  return data;
};

export const useFetchSessions = (
  isAdvisor: boolean,
  paginationParams: PaginationParams,
) => {
  return useQuery<SessionsResponse, Error, SessionsResponse>({
    queryKey: ["sessions", paginationParams.page, paginationParams.limit],
    placeholderData: keepPreviousData,
    queryFn: () => fetchSessions(isAdvisor, paginationParams),
  });
};
