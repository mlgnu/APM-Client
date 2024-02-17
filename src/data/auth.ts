import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export async function logout() {
  return await axios.get(`${API_URL}/auth/google/logout`, {withCredentials: true});
}
