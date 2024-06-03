// api.js
import axios from "axios";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const apiUrl = "your_api_endpoint";

export const useMakeAnnouncement = () => {
  const queryClient = useQueryClient();

  const postData = async (requestData: UseMutationOptions) => {
    const response = await axios.post(apiUrl, requestData);
    return response.data;
  };

  // return useMutation(postData, {
  //   onSuccess: () => {
  //     // Invalidate and refetch the data query after a successful post
  //     //queryClient.invalidateQueries('');
  //   },
  // });
};
