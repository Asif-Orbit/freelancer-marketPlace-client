import axios from "axios";

const AxiosAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true, // <- enable if you use http-only cookies
});

// Optional: response error handler => throw concise error
AxiosAPI.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export default AxiosAPI;
