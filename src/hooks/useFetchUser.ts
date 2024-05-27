import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export type UserType = {
  id: number;
  role: number;
  userEmail: string;
};

const fetchUser = async () => {
  const { data } = await apiClient.get("/profile", {
    withCredentials: true,
  });
  return data;
};

export const useFetchUser = () => {
  return useQuery<UserType, Error, UserType>({
    queryKey: ["user"],
    queryFn: fetchUser,
  });
};
