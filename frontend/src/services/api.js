import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// students endpoints
export const createStudent = (payload) => api.post("/students", payload);
export const getStudents = (params) => api.get("/students", { params });
export const getStudentById = (id) => api.get(`/students/${id}`);
export const updateStudent = (id, payload) =>
  api.put(`/students/${id}`, payload);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export default api;
