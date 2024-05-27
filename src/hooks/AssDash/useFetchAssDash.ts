import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface AssDashRes {
  department: string;
  year: number;
  id: number;
}

const fetchAssDash = async () => {
  const response = await apiClient.get("/assignment/dashboard");
  return response.data;
};

export const useFetchAssDash = () => {
  return useQuery<AssDashRes[]>({
    queryKey: ["assdash"],
    queryFn: fetchAssDash,
  });
};
