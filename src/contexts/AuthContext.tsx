import React, { createContext, useState, useCallback, ReactNode } from "react";
import { User, AuthContext as IAuthContext, RegisterData } from "@/types";

interface AuthContextType extends IAuthContext {
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (emailOrData: string | any, password?: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      let mockUser: User;

      // Se for Google OAuth (objeto com id, name, email, picture)
      if (typeof emailOrData === "object" && emailOrData.id) {
        mockUser = {
          id: emailOrData.id,
          name: emailOrData.name,
          email: emailOrData.email,
          role: "client",
          company: "SoftConection",
          phone: "",
          avatar: emailOrData.picture || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + emailOrData.name,
          createdAt: new Date(),
        };
      } else {
        // Login tradicional com email/password
        mockUser = {
          id: "user_1",
          name: "Baptista Chuma",
          email: emailOrData,
          role: "admin",
          company: "SoftConection",
          phone: "+55 11 99999-9999",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BaptistChuma",
          createdAt: new Date(),
        };
      }

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: "client",
        company: data.company,
        phone: data.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
