import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Calendar,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  BarChart3,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: NavItem[];
  adminOnly?: boolean;
}

const NAVIGATION: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    href: "/dashboard",
  },
  {
    id: "services",
    label: "Serviços",
    icon: <Wrench className="w-5 h-5" />,
    submenu: [
      { id: "browse", label: "Ver Serviços", icon: <Home className="w-4 h-4" />, href: "/services" },
      { id: "my-requests", label: "Meus Pedidos", icon: <Clock className="w-4 h-4" />, href: "/services/requests" },
      { id: "my-services", label: "Meus Serviços", icon: <Wrench className="w-4 h-4" />, href: "/services/manage", adminOnly: true },
    ],
  },
  {
    id: "appointments",
    label: "Agendamentos",
    icon: <Calendar className="w-5 h-5" />,
    submenu: [
      { id: "schedule", label: "Agendar", icon: <Calendar className="w-4 h-4" />, href: "/appointments/schedule" },
      { id: "calendar", label: "Meu Calendário", icon: <BarChart3 className="w-4 h-4" />, href: "/appointments/calendar" },
    ],
  },
  {
    id: "orders",
    label: "Pedidos",
    icon: <ShoppingCart className="w-5 h-5" />,
    href: "/orders",
  },
  {
    id: "proposals",
    label: "Propostas",
    icon: <FileText className="w-5 h-5" />,
    submenu: [
      { id: "create", label: "Criar Proposta", icon: <FileText className="w-4 h-4" />, href: "/proposals/create", adminOnly: true },
      { id: "my-proposals", label: "Minhas Propostas", icon: <FileText className="w-4 h-4" />, href: "/proposals" },
    ],
  },
  {
    id: "analytics",
    label: "Relatórios",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/analytics",
    adminOnly: true,
  },
  {
    id: "team",
    label: "Equipe",
    icon: <Users className="w-5 h-5" />,
    href: "/team",
    adminOnly: true,
  },
];

interface SidebarProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ className, isOpen = true, onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(isOpen);

  const isActive = (href?: string) => href === location.pathname;

  const isMenuExpanded = (id: string) => expandedMenu === id;

  const filteredNav = NAVIGATION.filter((item) => {
    if (item.adminOnly && user?.role !== "admin" && user?.role !== "manager") {
      return false;
    }
    return true;
  });

  const NavItemComponent = ({ item, depth = 0 }: { item: NavItem; depth?: number }) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    if (hasSubmenu) {
      return (
        <div key={item.id}>
          <button
            onClick={() => setExpandedMenu(isMenuExpanded(item.id) ? null : item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
              "hover:bg-primary/10 text-foreground",
              isMenuExpanded(item.id) && "bg-primary/15 text-primary"
            )}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left text-sm font-medium">{item.label}</span>
            <ChevronDown
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isMenuExpanded(item.id) && "rotate-180"
              )}
            />
          </button>

          {isMenuExpanded(item.id) && (
            <div className="pl-4 mt-2 space-y-2 border-l border-border/30 ml-2">
              {item.submenu?.map((subitem) => (
                <Link
                  key={subitem.id}
                  to={subitem.href || "#"}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200",
                    "hover:bg-primary/10 text-muted-foreground hover:text-foreground",
                    isActive(subitem.href) && "bg-primary/20 text-primary font-medium"
                  )}
                >
                  <span className="flex-shrink-0">{subitem.icon}</span>
                  <span>{subitem.label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.id}
        to={item.href || "#"}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
          "hover:bg-primary/10 text-foreground",
          isActive(item.href) && "bg-primary/20 text-primary font-medium shadow-md"
        )}
      >
        <span className="flex-shrink-0">{item.icon}</span>
        <span className="text-sm font-medium">{item.label}</span>
      </Link>
    );
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo / Header */}
      <div className="px-6 py-8 border-b border-border/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-lg text-foreground">SoftConection</h1>
            <p className="text-xs text-muted-foreground">Soluções TI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-2">
        {filteredNav.map((item) => (
          <NavItemComponent key={item.id} item={item} />
        ))}
      </nav>

      {/* User Profile / Settings */}
      <div className="p-4 border-t border-border/30 space-y-3">
        {/* User Info */}
        <div className="px-4 py-3 rounded-lg bg-secondary/40 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex-shrink-0">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Link to="/settings">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-9"
            >
              <Settings className="w-4 h-4" />
              Configurações
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 h-9 text-red-500 hover:text-red-600 hover:bg-red-500/10"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-card border-r border-border/30 z-40",
          className
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 w-64 h-screen bg-card border-r border-border/30 z-40 overflow-y-auto">
            {sidebarContent}
          </aside>
        </>
      )}

      {/* Mobile Spacer */}
      <div className="md:hidden h-16" />
    </>
  );
};
