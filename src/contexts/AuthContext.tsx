
import React, { createContext, useState, useContext, useEffect } from "react";
import { Founder, FundraisingPro } from "../types";
import { authStore } from "../lib/auth";

interface AuthContextType {
  user: Founder | FundraisingPro | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<Founder | FundraisingPro>;
  signup: (userData: Partial<Founder | FundraisingPro>, password: string) => Promise<Founder | FundraisingPro>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => Promise.reject(),
  signup: () => Promise.reject(),
  logout: () => {},
  isLoading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Founder | FundraisingPro | null>(authStore.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authStore.isAuthenticated);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for existing authentication on component mount
    authStore.checkAuth();
    setUser(authStore.getCurrentUser());
    setIsAuthenticated(authStore.isAuthenticated);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await authStore.login(email, password);
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (userData: Partial<Founder | FundraisingPro>, password: string) => {
    setIsLoading(true);
    try {
      const user = await authStore.signup(userData, password);
      setUser(user);
      setIsAuthenticated(true);
      setIsLoading(false);
      return user;
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    authStore.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
