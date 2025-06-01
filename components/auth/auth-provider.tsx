"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MOCK_USER, MOCK_USERS, User } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  login: (emailOrUsername: string, isOtpRequest?: boolean, otp?: string) => Promise<void>;
  register: (email: string, username: string, isOtpRequest?: boolean, otp?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for user in localStorage (simulating persistence)
    const storedUser = localStorage.getItem("barHubUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("barHubUser");
      }
    }
  }, []);

  const login = async (emailOrUsername: string, isOtpRequest: boolean = false, otp?: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (isOtpRequest) {
      // Simulate sending OTP
      const mockUser = MOCK_USERS.find(
        user => user.email === emailOrUsername || user.username === emailOrUsername
      );
      
      if (!mockUser) {
        throw new Error("User not found");
      }
      
      // In a real app, we would send OTP to email here
      return;
    }
    
    // Verify OTP and login
    if (!otp) {
      throw new Error("OTP is required");
    }
    
    // Find user by email or username
    const mockUser = MOCK_USERS.find(
      user => user.email === emailOrUsername || user.username === emailOrUsername
    );
    
    if (mockUser) {
      // In a real app, we would verify OTP here
      // For demo, we'll accept any OTP that's not empty
      if (otp.length < 4) {
        throw new Error("Invalid OTP");
      }
      
      // Remove password from user object before storing/setting and ensure proper typing
      const { password: _, ...userWithoutPassword } = mockUser;
      const userForState: User = {
        ...userWithoutPassword,
        favoriteBarIds: [...userWithoutPassword.favoriteBarIds], // Convert to mutable array
      };
      setUser(userForState);
      localStorage.setItem("barHubUser", JSON.stringify(userForState));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const register = async (email: string, username: string, isOtpRequest: boolean = false, otp?: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (isOtpRequest) {
      // Check if user already exists
      const existingUser = MOCK_USERS.find(
        user => user.email === email || user.username === username
      );
      
      if (existingUser) {
        throw new Error("User with this email or username already exists");
      }
      
      // In a real app, we would send OTP to email here
      return;
    }
    
    // Verify OTP and complete registration
    if (!otp) {
      throw new Error("OTP is required");
    }
    
    // In a real app, we would verify OTP here
    // For demo, we'll accept any OTP that's not empty
    if (otp.length < 4) {
      throw new Error("Invalid OTP");
    }
    
    // Create a new user (in a real app, this would be a backend call)
    const newUser: User = {
      id: `user${Date.now()}`,
      username,
      email,
      avatar: `https://ui-avatars.com/api/?name=${username.substring(0, 2).toUpperCase()}&background=random`,
      bio: "",
      favoriteBarIds: [],
      joinDate: new Date().toISOString(),
    };
    
    setUser(newUser);
    localStorage.setItem("barHubUser", JSON.stringify(newUser));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("barHubUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };
  
  const updateProfile = async (userData: Partial<User>) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    if (!user) throw new Error("User not logged in");
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem("barHubUser", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};