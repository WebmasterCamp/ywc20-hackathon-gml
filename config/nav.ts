import { Beer, Home, LogIn, UserCircle, Users, Wine } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  requiresAuth?: boolean;
  hideWhenAuth?: boolean;
}

export const navItems: NavItem[] = [
  {
    href: "/",
    label: "หน้าหลัก",
    icon: Home,
  },
  {
    href: "/me",
    label: "โปรไฟล์",
    icon: UserCircle,
    requiresAuth: true,
  },
  {
    href: "/login",
    label: "เข้าสู่ระบบ",
    icon: LogIn,
    hideWhenAuth: true,
  },
];
