import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      if (unauthorizedHandler) {
        unauthorizedHandler();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
