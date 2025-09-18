import axios from 'axios';

const api = axios.create({
  baseURL: "https://remotive.com/api/remote-jobs?search="
});

export const getAPI = async (searchTerm = "") => {
  try {
    const res = await api.get(`${searchTerm}`);
    return res.status === 200 ? res.data : [];
  } catch (err) {
    console.error("API Error:", err);
    return [];
  }
};
