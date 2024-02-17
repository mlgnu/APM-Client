import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export async function makeAnnouncement(announcement: string) {
  return await axios.post(`${API_URL}/announcements/make`, { announcement });
}

export async function getAnnouncements(page: any) {
  console.log(page, "page")
  return await axios.get(`${API_URL}/announcements/${page}`);
}

export async function removeAnnouncement(id: string) {
  return await axios.get(`${API_URL}/announcements/remove/${id}`);
}

export async function editAnnouncement(params: {
  id: string;
  announcement: string;
}) {
  return await axios.post(`${API_URL}/announcements/edit/${params.id}`, {
    announcement: params.announcement,
  });
}
