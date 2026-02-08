import React from "react";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        "md:ml-64 mt-16 md:mt-0 min-h-screen pb-8 md:pb-12",
        className
      )}
    >
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
};
