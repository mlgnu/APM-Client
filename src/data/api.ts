import { AssignmentType } from "../pages/Assignments/Assignment";
import apiClient from "../utils/apiClient";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL, "API_URL");

export async function makeAnnouncement(announcement: string) {
  return await apiClient.post(`/announcements/make`, {
    announcement,
  });
}

export async function getAnnouncements(page: any) {
  console.log(page, "page");
  return await apiClient.get(`/announcements/${page}`);
}

export async function removeAnnouncement(id: string) {
  return await apiClient.get(`/announcements/remove/${id}`);
}

export async function editAnnouncement(params: {
  id: string;
  announcement: string;
}) {
  return await apiClient.post(`/announcements/edit/${params.id}`, {
    announcement: params.announcement,
  });
}

export async function makeAssignment(assignment: AssignmentType) {
  return await apiClient.post(`/assignments/assign`, { assignment });
}
