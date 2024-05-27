import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function fetchUser() {
  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await axios.get("http://localhost:3001/api/profile/", {
        withCredentials: true,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (userQuery.isLoading) {
    console.log("loading");
  } else if (userQuery.isError) {
    console.log("error");
  } else if (userQuery.isSuccess) {
    console.log(userQuery.data);
  }
  console.log(userQuery.data, "user user");
  return userQuery.data;
}
