import React, { createContext, useState, useCallback, ReactNode } from "react";
import { User, AuthContext as IAuthContext, RegisterData, OAuthUserData } from "@/types";
import { roleFromEmail } from "@/lib/accessControl";

interface AuthContextType extends IAuthContext {
  setUser: (user: User | null) => void;
}

const USER_STORAGE_KEY = "user";

const isValidRole = (value: unknown): value is User["role"] => {
  return ["admin", "manager", "technician", "client", "partner", "investor"].includes(String(value));
};

const parseStoredUser = (): User | null => {
  const raw = localStorage.getItem(USER_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Partial<User>;
    if (
      typeof parsed?.id !== "string" ||
      typeof parsed?.name !== "string" ||
      typeof parsed?.email !== "string" ||
      !isValidRole(parsed?.role)
    ) {
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }

    return {
      ...parsed,
      createdAt: parsed.createdAt ? new Date(parsed.createdAt) : new Date(),
      role: parsed.role,
    } as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(parseStoredUser);

  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (credentials: string | OAuthUserData, _password?: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      let mockUser: User;

      // Se for Google OAuth (objeto com id, name, email, picture)
      if (typeof credentials === "object" && credentials.id) {
        mockUser = {
          id: credentials.id,
          name: credentials.name,
          email: credentials.email,
          role: "client",
          company: "SoftConection",
          phone: "",
          avatar:
            credentials.picture ||
            `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`,
          createdAt: new Date(),
        };
      } else {
        // Login tradicional com email/password
        const resolvedRole = roleFromEmail(credentials);
        mockUser = {
          id: "user_1",
          name: "Baptista Chuma",
          email: credentials,
          role: resolvedRole,
          company: "SoftConection",
          phone: "+55 11 99999-9999",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BaptistChuma",
          createdAt: new Date(),
        };
      }

      setUser(mockUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("user_data");
    sessionStorage.removeItem("user_data");
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newUser: User = {
        id: `user_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role ?? "client",
        company: data.company,
        phone: data.phone,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
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
