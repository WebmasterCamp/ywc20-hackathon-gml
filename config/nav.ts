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
    label: "Home",
    icon: Home,
  },
  {
    href: "/me",
    label: "Me",
    icon: UserCircle,
    requiresAuth: true,
  },
  {
    href: "/login",
    label: "Login",
    icon: LogIn,
    hideWhenAuth: true,
  },
];
