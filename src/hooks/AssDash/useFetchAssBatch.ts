import {
  QueryFunction,
  QueryFunctionContext,
  useQuery,
} from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

type FetchAssBatchParams = {
  year: number;
  department: string;
  enabled: boolean;
};

type AssBatchRes = {
  year: number;
  department: string;
  studentEmail: string;
  advisorEmail: string;
  id: number;
};

const fetchAssBatch = async ({
  queryKey: [, params],
}: QueryFunctionContext<["string", FetchAssBatchParams]>) => {
  const response = await apiClient.get<AssBatchRes[]>(`/assignment/all/`, {
    params,
  });
  return response.data;
};

export const useFetchAssBatch = (params: FetchAssBatchParams) => {
  return useQuery<AssBatchRes[]>({
    queryKey: ["assbatch", params] as [string, FetchAssBatchParams],
    queryFn: fetchAssBatch as QueryFunction<AssBatchRes[]>,
    enabled: params.enabled,
  });
};
