import axios from "axios";
import apiClient from "../utils/apiClient";

export async function logout() {
  await apiClient.delete(`/auth/google/logout`, {
    withCredentials: true,
  });
  window.location.href = "/";
}
