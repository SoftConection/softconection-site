/**
 * Premium Sidebar — Role-Based Navigation & Quick Actions
 * Colapsável, animado, com rotas reais da plataforma
 */

import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  BarChart3,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  Bell,
  Clock,
  Handshake,
  Gift,
  Store,
  Landmark,
  ClipboardList,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '../branding/Logo';
import { cn } from '@/lib/utils';
import { ROLE_LABELS, type PlatformRole } from '@/lib/accessControl';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  badge?: number | string;
  badgeColor?: 'red' | 'green' | 'blue' | 'amber';
}

const baseItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" />, href: '/dashboard' },
  { id: 'services', label: 'Serviços', icon: <ClipboardList className="w-4 h-4" />, href: '/services' },
  { id: 'appointments', label: 'Agendamentos', icon: <Clock className="w-4 h-4" />, href: '/appointments/calendar' },
];

const byRole = (role: PlatformRole | undefined): SidebarItem[] => {
  switch (role) {
    case 'admin':
    case 'manager':
      return [
        ...baseItems,
        { id: 'orders', label: 'Pedidos', icon: <FileText className="w-4 h-4" />, href: '/orders', badge: 3, badgeColor: 'red' },
        { id: 'admin-catalog', label: 'Catalogo Admin', icon: <Store className="w-4 h-4" />, href: '/admin/catalog' },
        { id: 'admin-pricing', label: 'Precificacao', icon: <CreditCard className="w-4 h-4" />, href: '/admin/pricing' },
        { id: 'admin-billing', label: 'Faturacao', icon: <CreditCard className="w-4 h-4" />, href: '/admin/billing' },
        { id: 'admin-history', label: 'Auditoria', icon: <BarChart3 className="w-4 h-4" />, href: '/admin/history' },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, href: '/settings' },
      ];

    case 'technician':
      return [
        ...baseItems,
        { id: 'orders', label: 'Fila de Pedidos', icon: <FileText className="w-4 h-4" />, href: '/orders', badge: 2 },
        { id: 'invoices-tech', label: 'Faturas', icon: <CreditCard className="w-4 h-4" />, href: '/invoices' },
        { id: 'admin-catalog-tech', label: 'Catalogo', icon: <Store className="w-4 h-4" />, href: '/admin/catalog' },
        { id: 'admin-pricing-tech', label: 'Solicitar Preco', icon: <CreditCard className="w-4 h-4" />, href: '/admin/pricing' },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, href: '/settings' },
      ];

    case 'partner':
      return [
        ...baseItems,
        { id: 'partnerships', label: 'Parcerias', icon: <Handshake className="w-4 h-4" />, href: '/partnerships' },
        { id: 'contracts', label: 'Acordos', icon: <FileText className="w-4 h-4" />, href: '/contracts' },
        { id: 'marketplace', label: 'Marketplace', icon: <Store className="w-4 h-4" />, href: '/marketplace' },
        { id: 'donations', label: 'Apoios', icon: <Gift className="w-4 h-4" />, href: '/donations' },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, href: '/settings' },
      ];

    case 'investor':
      return [
        ...baseItems,
        { id: 'investor', label: 'Espaço Investidor', icon: <Landmark className="w-4 h-4" />, href: '/investor', badge: 'Novo', badgeColor: 'green' },
        { id: 'marketplace', label: 'Marketplace', icon: <Store className="w-4 h-4" />, href: '/marketplace' },
        { id: 'donations', label: 'Apoios', icon: <Gift className="w-4 h-4" />, href: '/donations' },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, href: '/settings' },
      ];

    default:
      return [
        ...baseItems,
        { id: 'orders', label: 'Meus Pedidos', icon: <FileText className="w-4 h-4" />, href: '/orders', badge: 1, badgeColor: 'amber' },
        { id: 'invoices', label: 'Minhas Faturas', icon: <CreditCard className="w-4 h-4" />, href: '/invoices' },
        { id: 'contracts', label: 'Contratos', icon: <FileText className="w-4 h-4" />, href: '/contracts' },
        { id: 'marketplace', label: 'Marketplace', icon: <Store className="w-4 h-4" />, href: '/marketplace' },
        { id: 'donations', label: 'Apoiar Projetos', icon: <Gift className="w-4 h-4" />, href: '/donations' },
        { id: 'settings', label: 'Configurações', icon: <Settings className="w-4 h-4" />, href: '/settings' },
      ];
  }
};

const badgeClass = (color?: string) => {
  switch (color) {
    case 'red':
      return 'bg-red-500/20 text-red-300 border border-red-500/30';
    case 'green':
      return 'bg-green-500/20 text-green-300 border border-green-500/30';
    case 'blue':
      return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
    case 'amber':
      return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
    default:
      return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
  }
};

export const PremiumSidebar: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const items = byRole(user?.role);

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen bg-gradient-to-b from-[hsl(222_24%_8%)] to-[hsl(222_24%_5%)] border-r border-white/[0.07]',
        'flex flex-col transition-all duration-300 z-40 pt-6',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className={cn('flex items-center justify-between px-4 mb-8', isCollapsed && 'flex-col gap-4')}>
        <Logo size={isCollapsed ? 'small' : 'medium'} animated={!isCollapsed} href="/" />
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="p-1.5 rounded-lg hover:bg-white/[0.08] text-foreground/60 hover:text-foreground transition-colors hidden lg:block"
          aria-label={isCollapsed ? 'Expandir' : 'Colapsar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && user && (
        <div className="px-4 mb-8">
          <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.08] rounded-lg p-3">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                alt={user.name}
                className="w-10 h-10 rounded-full ring-1 ring-primary/30"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-primary uppercase font-medium tracking-wide">{ROLE_LABELS[user.role]}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const active = location.pathname.startsWith(item.href);

          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium',
                active
                  ? 'bg-primary/15 text-primary border border-primary/20 shadow-lg shadow-primary/5'
                  : 'text-foreground/70 hover:text-foreground hover:bg-white/[0.05] border border-transparent'
              )}
            >
              <span className={cn('flex-shrink-0', active && 'text-primary')}>{item.icon}</span>
              {!isCollapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {(item.badge || (item.id === 'dashboard' && notifications > 0)) && (
                    <span className={cn('flex-shrink-0 px-2 py-0.5 rounded text-xs font-semibold', badgeClass(item.badgeColor))}>
                      {item.badge || notifications}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mx-2 my-2 h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

      <div className="px-2 pb-4 space-y-1">
        {!isCollapsed && (
          <button
            onClick={() => setNotifications(0)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/70 hover:text-foreground hover:bg-white/[0.05] transition-all text-sm font-medium"
          >
            <Bell className="w-4 h-4" />
            <span>Notificações</span>
          </button>
        )}
        <button
          onClick={() => {
            logout();
            navigate('/');
          }}
          className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm font-medium w-full',
            isCollapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
};

export default PremiumSidebar;
