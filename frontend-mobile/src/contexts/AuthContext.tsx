import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginRequest, registerRequest, fetchMe } from "../services/api";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const KEY_TOKEN = "@retesp:token";

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem(KEY_TOKEN);
      if (t) {
        setToken(t);
        try {
          const me = await fetchMe(t);
          setUser(me);
        } catch {
          await AsyncStorage.removeItem(KEY_TOKEN);
          setToken(null);
        }
      }
      setLoading(false);
    })();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token: t, user: u } = await loginRequest(email, password);
      setToken(t);
      setUser(u);
      await AsyncStorage.setItem(KEY_TOKEN, t);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const { token: t, user: u } = await registerRequest(name, email, password);
      setToken(t);
      setUser(u);
      await AsyncStorage.setItem(KEY_TOKEN, t);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(KEY_TOKEN);
  };

  const refreshUser = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const me = await fetchMe(token);
      setUser(me);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
