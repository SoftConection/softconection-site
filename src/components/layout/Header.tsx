import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Bell, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

export const Header: React.FC = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed md:fixed top-0 md:left-64 right-0 h-16 md:h-16 bg-card/80 backdrop-blur-xl border-b border-border/30 z-30">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar serviços, propostas..."
              className="pl-10 h-9 bg-secondary/40 border-border/30 focus:bg-secondary"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Search Mobile */}
          <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Search className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* User Avatar / Divider */}
          <div className="hidden md:block w-px h-6 bg-border/30" />

          {/* User Profile - Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center gap-3 pl-2">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
