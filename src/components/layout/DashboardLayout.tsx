/**
 * Dashboard Layout — Premium Multi-Role Container
 * Header + Sidebar + Main content area com breadcrumb
 */

import React, { useState } from 'react';
import { ChevronRight, Menu } from 'lucide-react';
import { PremiumHeader } from './PremiumHeader';
import { PremiumSidebar } from './PremiumSidebar';
import { TechBackground } from '../branding/TechBackground';
import { cn } from '@/lib/utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Breadcrumb[];
  showTechBackground?: boolean;
  headerClassName?: string;
  contentClassName?: string;
}

/**
 * DashboardLayout — Container premium para todas as páginas de dashboard
 *
 * ├─ PremiumHeader (topo, navigation global)
 * ├─ PremiumSidebar (colapsável, nav por role)
 * └─ Main (pt-20 + ps-20 + tech background opcional)
 *    ├─ Header section (breadcrumb + title + actions)
 *    └─ Content area (children)
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  breadcrumbs = [],
  showTechBackground = true,
  headerClassName = '',
  contentClassName = '',
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth >= 1024;
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) setIsSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(222,24%,3%)] text-foreground overflow-x-hidden">
      {/* ──── Header Premium ──── */}
      <PremiumHeader />

      {/* ──── Sidebar + Main Layout ──── */}
      <div className="flex pt-24">
        {/* Sidebar */}
        {!isLargeScreen && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        {(isLargeScreen || isSidebarOpen) && (
          <PremiumSidebar onClose={() => setIsSidebarOpen(false)} />
        )}

        {/* Main Content */}
        <main className={cn('flex-1 transition-all duration-300', isLargeScreen && 'lg:ps-64')}>
          {/* Mobile Toggle */}
          {!isLargeScreen && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="fixed bottom-6 right-6 p-3 bg-primary/20 hover:bg-primary/30 text-primary rounded-full shadow-lg backdrop-blur-sm z-20 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* Header Section */}
          {(title || breadcrumbs.length > 0) && (
            <div
              className={cn(
                'border-b border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-sm',
                headerClassName,
              )}
            >
              <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                {/* Breadcrumb */}
                {breadcrumbs.length > 0 && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    {breadcrumbs.map((crumb, idx) => (
                      <React.Fragment key={`${crumb.label}-${idx}`}>
                        {idx > 0 && <ChevronRight className="w-4 h-4 text-foreground/30" />}
                        {crumb.href ? (
                          <a href={crumb.href} className="text-primary hover:text-primary/80 transition-colors">
                            {crumb.label}
                          </a>
                        ) : (
                          <span className="text-foreground/60">{crumb.label}</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}

                {/* Title */}
                {title && (
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                    {title}
                  </h1>
                )}
              </div>
            </div>
          )}

          {/* Tech Background (Optional) */}
          {showTechBackground && (
            <div className="relative">
              <TechBackground intensity="light" />
              <div className="relative">
                <div className={cn('max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8', contentClassName)}>
                  {children}
                </div>
              </div>
            </div>
          )}

          {/* Content Area (No Background) */}
          {!showTechBackground && (
            <div className={cn('max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8', contentClassName)}>
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
