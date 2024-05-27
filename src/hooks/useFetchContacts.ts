import { useQuery } from "@tanstack/react-query";
import apiClient from "../utils/apiClient";

export interface ContactResponse {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
}
const fetchContacts = async () => {
  const { data } = await apiClient.get(`message/contacts/`, {
    withCredentials: true,
  });
  return data;
};

export const useFetchContacts = () => {
  return useQuery<ContactResponse[], Error>({
    queryKey: ["contacts"],
    queryFn: () => fetchContacts(),
  });
};
