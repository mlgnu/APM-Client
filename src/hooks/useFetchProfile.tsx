import { useQuery } from "@tanstack/react-query";
import { Profile } from "../pages/Profile/Profile";
import apiClient from "../utils/apiClient";

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
}

const fetchProfile = async () => {
  const { data } = await apiClient.get(`/profile/profile`, {
    withCredentials: true,
  });
  return data;
};

export const useFetchProfile = ({
  enabled,
  token,
}: {
  enabled: boolean;
  token: string;
}) => {
  return useQuery<Profile, Error, Profile>({
    queryKey: ["profile", token],
    queryFn: fetchProfile,
    enabled,
  });
};
