"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { MOCK_USER, MOCK_USERS, User } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: User | null;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string>("");
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
  const sendOTP = async (email: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Check if user exists with this email
    const mockUser = MOCK_USERS.find(user => user.email === email);
    
    if (!mockUser) {
      throw new Error("No account found with this email address");
    }
    
    // Store the email for OTP verification
    setPendingEmail(email);
    
    // In a real app, this would send an actual OTP
    // For demo purposes, we'll just show a success message
    toast({
      title: "OTP Sent",
      description: "Check your email for the verification code. For demo, use any 6-digit number.",
    });
  };

  const verifyOTP = async (email: string, otp: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // For demo purposes, accept any 6-digit number as valid OTP
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      throw new Error("Please enter a valid 6-digit OTP");
    }
    
    // Find user by email
    const mockUser = MOCK_USERS.find(user => user.email === email);
    
    if (mockUser) {
      // Remove password from user object before storing/setting
      const { password: _, ...userWithoutPassword } = mockUser;
      const userForState: User = {
        ...userWithoutPassword,
        favoriteBarIds: [...userWithoutPassword.favoriteBarIds],
      };
      setUser(userForState);
      localStorage.setItem("barHubUser", JSON.stringify(userForState));
      setPendingEmail("");
    } else {
      throw new Error("Invalid email");
    }
  };

  const register = async (email: string, password: string, username: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(
      user => user.email === email || user.username === username
    );
    
    if (existingUser) {
      throw new Error("User with this email or username already exists");
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
    <AuthContext.Provider value={{ user, sendOTP, verifyOTP, register, logout, updateProfile }}>
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