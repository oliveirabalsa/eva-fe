import { Task } from "@/components/TaskCard/types";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export type AxiosCustomError = {
  response: {
    data: {
      code: string;
    };
  };
};

export const register = async (
  username: string,
  email: string,
  password: string
) => api.post("/users/", { username, email, password });

export const login = async (username: string, password: string) =>
  api.post("/auth/token/", { username, password });

export const createTask = async (task: Task, token: string) =>
  api.post("/tasks/", task, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateTask = async (id: number, task: Task, token: string) =>
  api.put(`/tasks/${id}/`, task, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteTask = async (id: number, token: string) =>
  api.delete(`/tasks/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const fetchTasks = async (
  token: string,
  filters: { [key: string]: string } = {}
) => {
  const noEmptyFilters = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value)
  );
  const queryString = new URLSearchParams(noEmptyFilters).toString();
  return api.get(`/tasks/?${queryString}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
