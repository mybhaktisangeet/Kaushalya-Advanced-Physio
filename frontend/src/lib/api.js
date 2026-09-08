import axios from "axios";

export const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API_BASE, withCredentials: true, timeout: 20000 });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_access_token") || localStorage.getItem("access_token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config || {};
    const status = error.response?.status;
    const isAuthCall = (original.url || "").includes("/auth/");
    if (status === 401 && !original._retried && !isAuthCall && (original.url || "").includes("/admin")) {
      original._retried = true;
      const refreshToken = localStorage.getItem("admin_refresh_token") || localStorage.getItem("refresh_token");
      
      refreshPromise = refreshPromise || api.post(
        "/auth/refresh",
        { refresh_token: refreshToken },
        { headers: refreshToken ? { Authorization: `Bearer ${refreshToken}` } : {} }
      ).then((res) => {
        if (res.data?.access_token) {
          localStorage.setItem("admin_access_token", res.data.access_token);
          localStorage.setItem("access_token", res.data.access_token);
        }
        if (res.data?.refresh_token) {
          localStorage.setItem("admin_refresh_token", res.data.refresh_token);
          localStorage.setItem("refresh_token", res.data.refresh_token);
        }
        return res;
      }).catch((err) => {
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        throw err;
      }).finally(() => {
        refreshPromise = null;
      });

      try {
        const refreshRes = await refreshPromise;
        const newToken = refreshRes.data?.access_token;
        if (newToken) {
          original.headers = original.headers || {};
          original.headers.Authorization = `Bearer ${newToken}`;
        }
        return api(original);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export const fetcher = (url, params) => api.get(url, { params }).then((r) => r.data);

export function getErrorMessage(error, fallback = "Something went wrong. Please try again.") {
  if (!error) return fallback;
  if (error.code === "ECONNABORTED" || error.message === "Network Error") return "We could not reach the server. Please check your connection and try again.";
  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  if (detail?.msg) return detail.msg;
  return fallback;
}

export function getErrorCode(error) {
  return error?.response?.data?.code || null;
}

export function getFieldErrors(error) {
  const rows = error?.response?.data?.errors;
  if (!Array.isArray(rows)) return {};
  return rows.reduce((acc, row) => ({ ...acc, [row.field]: row.message }), {});
}
