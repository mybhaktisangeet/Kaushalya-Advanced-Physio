import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("admin_access_token") || localStorage.getItem("access_token");
    if (!token) {
      // Attempt with cookie if present
      api.get("/auth/me").then((r) => setUser(r.data.user)).catch(() => setUser(false));
      return;
    }
    api.get("/auth/me")
      .then((r) => setUser(r.data.user))
      .catch(async () => {
        const refresh = localStorage.getItem("admin_refresh_token") || localStorage.getItem("refresh_token");
        if (refresh) {
          try {
            const r = await api.post("/auth/refresh", { refresh_token: refresh }, {
              headers: { Authorization: `Bearer ${refresh}` }
            });
            if (r.data?.access_token) {
              localStorage.setItem("admin_access_token", r.data.access_token);
              localStorage.setItem("access_token", r.data.access_token);
            }
            if (r.data?.refresh_token) {
              localStorage.setItem("admin_refresh_token", r.data.refresh_token);
              localStorage.setItem("refresh_token", r.data.refresh_token);
            }
            setUser(r.data.user);
            return;
          } catch (e) {}
        }
        localStorage.removeItem("admin_access_token");
        localStorage.removeItem("admin_refresh_token");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(false);
      });
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.mfa_required) return { mfaRequired: true, mfaToken: data.mfa_token };
    if (data.access_token) {
      localStorage.setItem("admin_access_token", data.access_token);
      localStorage.setItem("access_token", data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem("admin_refresh_token", data.refresh_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    setUser(data.user);
    return { mfaRequired: false };
  }, []);

  const verifyMfa = useCallback(async (mfaToken, code) => {
    const { data } = await api.post("/auth/mfa/verify", { mfa_token: mfaToken, code });
    if (data.access_token) {
      localStorage.setItem("admin_access_token", data.access_token);
      localStorage.setItem("access_token", data.access_token);
    }
    if (data.refresh_token) {
      localStorage.setItem("admin_refresh_token", data.refresh_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    }
    setUser(data.user);
  }, []);

  const logout = useCallback(async () => {
    try { await api.post("/auth/logout"); } catch (e) { /* session already gone */ }
    localStorage.removeItem("admin_access_token");
    localStorage.removeItem("admin_refresh_token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(false);
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api.get("/auth/me");
    setUser(data.user);
  }, []);

  const value = useMemo(() => ({ user, login, verifyMfa, logout, refreshUser, can: (roles) => !!user && roles.includes(user.role) }), [user, login, verifyMfa, logout, refreshUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
