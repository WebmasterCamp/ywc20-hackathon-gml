"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { navItems } from "@/config/nav";
import { cn } from "@/lib/utils";
import { Beer, Home, Plus, User, Users, Wine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Mobile bottom navigation
  const mobileNav = (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-gradient-to-r from-pub-mahogany to-pub-mahogany/95 backdrop-blur-md border-t border-pub-brass/40 md:hidden shadow-2xl flex items-center justify-center">
      <div className="flex w-full max-w-md mx-auto justify-between items-center px-8 relative">
        {/* Home */}
        <Link href="/" className={cn(
          "flex flex-col items-center justify-center text-pub-foam hover:text-pub-amber transition-all",
          pathname === "/" ? "font-bold text-pub-amber" : ""
        )}>
          <Home className="h-7 w-7 mb-1" />
          <span className="text-xs">Home</span>
        </Link>
        {/* Add Note */}
        <Link href="/note" className={cn(
          "flex flex-col items-center justify-center bg-pub-amber text-pub-mahogany rounded-full p-3 shadow-lg -mt-14 border-4 border-pub-mahogany hover:bg-pub-gold transition-all",
          pathname === "/note" ? "scale-110" : ""
        )}>
          <Plus className="h-7 w-7" />
        </Link>
        {/* Me */}
        <Link href="/me" className={cn(
          "flex flex-col items-center justify-center text-pub-foam hover:text-pub-amber transition-all",
          pathname === "/me" ? "font-bold text-pub-amber" : ""
        )}>
          <User className="h-7 w-7 mb-1" />
          <span className="text-xs">Me</span>
        </Link>
      </div>
    </div>
  );

  // Desktop sidebar
  const desktopNav = (
    <div className="fixed left-0 top-0 bottom-0 w-[250px] bg-gradient-to-b from-pub-mahogany to-pub-mahogany/95 border-r border-pub-brass/40 shadow-2xl hidden md:block">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-wood-texture opacity-30"></div>
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-pub-brass/80 via-pub-gold/60 to-pub-copper/80"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-pub-amber/5 to-pub-gold/10"></div>

      <div className="p-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <Beer className="h-8 w-8 text-pub-amber" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pub-foam rounded-full"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pub-gold to-pub-amber bg-clip-text text-transparent drop-shadow-lg">
              Bar Hub
            </h1>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-pub-copper" />
              <p className="text-pub-foam text-sm font-medium">Find your crowd</p>
            </div>
          </div>
        </div>

        {        /* Decorative separator */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pub-brass/70 to-transparent"></div>
          <Wine className="h-4 w-4 text-pub-copper" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pub-brass/70 to-transparent"></div>
        </div>
      </div>

      <div className="px-3 py-2 relative z-10">
        {navItems.map((item) => {
          if (item.requiresAuth && !user) return null;
          if (item.hideWhenAuth && user) return null;
          const Icon = item.icon;
          return (
            <SidebarNavButton
              key={item.href}
              href={item.href}
              icon={<Icon className="h-5 w-5 mr-2" />}
              label={item.label}
              active={pathname === item.href}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {mobileNav}
      {desktopNav}
    </>
  );
}

interface NavButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function SidebarNavButton({ href, icon, label, active }: NavButtonProps) {
  return (
    <Link href={href} className="block mb-1">
      <Button
        variant={active ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start text-base font-normal h-11 transition-all duration-300 group relative overflow-hidden border",
          active
            ? "font-semibold bg-pub-amber/30 text-pub-foam border-pub-brass/60 shadow-lg"
            : "text-pub-foam hover:text-pub-foam hover:bg-pub-amber/20 border-transparent hover:border-pub-brass/50 hover:shadow-md"
        )}
      >
        {active && (
          <div className="absolute inset-0 bg-gradient-to-r from-pub-amber/30 to-pub-gold/20 opacity-50"></div>
        )}
        <div className="absolute inset-0 bg-pub-copper/5 scale-0 group-hover:scale-100 transition-transform duration-300"></div>

        <div className="relative z-10 flex items-center">
          <div className={cn(
            "transition-all duration-300",
            active ? "animate-pulse" : "group-hover:scale-110"
          )}>
            {icon}
          </div>
          <span className="relative">
            {label}
            {active && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-pub-gold to-pub-amber"></div>
            )}
          </span>
        </div>

        {active && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-pub-gold to-pub-amber rounded-r"></div>
        )}
      </Button>
    </Link>
  );
}