/**
 * Premium Header — Multi-Role Navigation
 * Logo grande, navegação por role, indicador de status
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings, Bell, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from '../branding/Logo';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ROLE_LABELS, type PlatformRole } from '@/lib/accessControl';

interface NavItem {
  label: string;
  to: string;
}

const getRoleNavigation = (role: PlatformRole | undefined): NavItem[] => {
  const common: NavItem[] = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Serviços', to: '/services' },
    { label: 'Agendamentos', to: '/appointments/calendar' },
  ];

  switch (role) {
    case 'admin':
    case 'manager':
      return [
        ...common,
        { label: 'Catalogo Admin', to: '/admin/catalog' },
        { label: 'Precificacao', to: '/admin/pricing' },
        { label: 'Faturacao', to: '/admin/billing' },
        { label: 'Auditoria', to: '/admin/history' },
      ];

    case 'technician':
      return [
        ...common,
        { label: 'Pedidos', to: '/orders' },
        { label: 'Faturas', to: '/invoices' },
        { label: 'Catalogo', to: '/admin/catalog' },
        { label: 'Solicitar Preco', to: '/admin/pricing' },
      ];

    case 'partner':
      return [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Parcerias', to: '/partnerships' },
        { label: 'Contratos', to: '/contracts' },
        { label: 'Marketplace', to: '/marketplace' },
        { label: 'Apoios', to: '/donations' },
      ];

    case 'investor':
      return [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Investidor', to: '/investor' },
        { label: 'Marketplace', to: '/marketplace' },
        { label: 'Apoios', to: '/donations' },
      ];

    default:
      return [
        ...common,
        { label: 'Pedidos', to: '/orders' },
        { label: 'Faturas', to: '/invoices' },
        { label: 'Marketplace', to: '/marketplace' },
      ];
  }
};

export const PremiumHeader: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigationItems = getRoleNavigation(user?.role);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'py-1 bg-[hsl(222_24%_5%/0.92)] backdrop-blur-xl border-b border-white/[0.07] shadow-[0_1px_0_0_rgba(255,255,255,0.05)]'
          : 'py-3 bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-full">
          {/* ──── Logo ──── */}
          <Logo
            size={isScrolled ? 'medium' : 'large'}
            animated
            href="/"
            className="transition-all duration-500"
          />

          {/* ──── Desktop Navigation ──── */}
          <div className="hidden xl:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors duration-200 group rounded-lg hover:bg-white/[0.05]',
                  location.pathname.startsWith(item.to)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/65 hover:text-foreground'
                )}
              >
                {item.label}
                <span className="absolute bottom-1.5 left-4 right-4 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* ──── Right Section (Auth + Icons) ──── */}
          <div className="flex items-center gap-3 md:gap-4">
            {isAuthenticated && user ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 text-foreground/70 hover:text-foreground hover:bg-white/[0.05] rounded-lg transition-colors" aria-label="Notificações">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </button>

                {/* User Menu */}
                <div className="hidden md:flex items-center gap-2 ps-2 border-l border-white/[0.07]">
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full ring-2 ring-primary/20"
                  />
                  <div className="flex flex-col gap-0 text-sm">
                    <span className="font-semibold text-foreground">{user.name}</span>
                    <span className="text-xs text-primary uppercase font-medium tracking-wide">{ROLE_LABELS[user.role]}</span>
                  </div>
                </div>

                {/* Actions Dropdown */}
                <div className="relative group">
                  <button
                    className="p-2 text-foreground/70 hover:text-foreground hover:bg-white/[0.05] rounded-lg transition-colors"
                    aria-label="Menu do usuario"
                    title="Menu do usuario"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-[hsl(222_24%_10%)] border border-white/[0.08] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link
                      to="/settings"
                      className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-white/[0.05] transition-colors"
                    >
                      <Settings className="w-4 h-4 inline-block me-2" />
                      Configurações
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-foreground/80 hover:text-red-400 hover:bg-white/[0.05] transition-colors border-t border-white/[0.07]"
                    >
                      <LogOut className="w-4 h-4 inline-block me-2" />
                      Sair
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/auth/login')}
                  variant="ghost"
                  size="sm"
                  className="hidden md:inline-flex"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => navigate('/auth/register')}
                  size="sm"
                  className="btn-primary"
                >
                  Começar
                </Button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="xl:hidden p-2 text-foreground/70 hover:text-foreground hover:bg-white/[0.05] rounded-lg transition-colors"
              aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* ──── Mobile Menu ──── */}
        {isMobileOpen && (
          <div className="xl:hidden border-t border-white/[0.07] mt-4 pt-4 space-y-2 animate-slide-up">
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location.pathname.startsWith(item.to)
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/70 hover:text-foreground hover:bg-white/[0.06]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default PremiumHeader;
