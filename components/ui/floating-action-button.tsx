"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link";
  size?: "sm" | "lg" | "icon";
  position?: "bottom-right" | "bottom-left" | "bottom-center";
}

const FloatingActionButton = React.forwardRef<
  HTMLButtonElement,
  FloatingActionButtonProps
>(({ className, variant = "default", size = "lg", position = "bottom-right", ...props }, ref) => {
  const positionClasses = {
    "bottom-right": "bottom-20 right-4 sm:bottom-6 sm:right-6",
    "bottom-left": "bottom-20 left-4 sm:bottom-6 sm:left-6", 
    "bottom-center": "bottom-20 left-1/2 transform -translate-x-1/2 sm:bottom-6"
  };

  return (
    <div className={cn("fixed z-40", positionClasses[position])}>
      {/* Floating bubbles around the button */}
      <div className="absolute -top-2 -right-1 w-2 h-2 bg-pub-foam rounded-full animate-bubble opacity-80"></div>
      <div className="absolute -top-1 -left-2 w-1.5 h-1.5 bg-pub-foam rounded-full animate-bubble delay-75 opacity-60"></div>
      <div className="absolute -bottom-1 -right-2 w-1 h-1 bg-pub-foam rounded-full animate-bubble delay-150 opacity-70"></div>
      
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-pub-amber rounded-full blur-lg opacity-30"></div>
      
      <Button
        className={cn(
          "relative shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group overflow-hidden",
          "h-14 w-14 sm:h-12 sm:w-12 rounded-full",
          "bg-gradient-to-br from-pub-amber to-pub-gold hover:from-pub-gold hover:to-pub-amber",
          "text-pub-mahogany border-2 border-pub-brass/50 hover:border-pub-brass",
          "hover:scale-105 hover:rotate-6 transition-transform duration-300",
          className
        )}
        variant="ghost"
        size="icon"
        ref={ref}
        {...props}
      >
        {/* Background texture overlay */}
        <div className="absolute inset-0 bg-wood-texture opacity-20 rounded-full"></div>
        
        {/* Content with enhanced styling */}
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {props.children}
        </div>
        
        {/* Ripple effect on hover */}
        <div className="absolute inset-0 bg-pub-foam/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 opacity-0 group-hover:opacity-100"></div>
      </Button>
    </div>
  );
});

FloatingActionButton.displayName = "FloatingActionButton";

export { FloatingActionButton };
