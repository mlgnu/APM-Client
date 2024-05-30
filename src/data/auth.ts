import axios from "axios";
import apiClient from "../utils/apiClient";

export async function logout() {
  return await apiClient.post(`/auth/google/logout`, {
    withCredentials: true,
  });
}
