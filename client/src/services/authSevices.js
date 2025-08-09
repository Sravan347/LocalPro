import api from "./api";

export const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me"); // backend verifies cookie
    return res.data;
  } catch {
    return null;
  }
};
