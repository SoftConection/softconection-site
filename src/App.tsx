import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { PlatformProvider } from "@/contexts/PlatformContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { GovernanceProvider } from "@/contexts/GovernanceContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NetworkErrorHandler } from "@/components/NetworkErrorHandler";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const LoginPage = lazy(() =>
  import("@/pages/auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);
const RegisterPage = lazy(() =>
  import("@/pages/auth/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);
const GoogleLoginPage = lazy(() =>
  import("@/pages/auth/GoogleLoginPage").then((module) => ({
    default: module.GoogleLoginPage,
  })),
);
const DashboardPage = lazy(() =>
  import("@/pages/dashboard/DashboardPage").then((module) => ({
    default: module.DashboardPage,
  })),
);
const ServicesPage = lazy(() =>
  import("@/pages/services/ServicesPage").then((module) => ({
    default: module.ServicesPage,
  })),
);
const CategoryPage = lazy(() =>
  import("@/pages/services/CategoryPage").then((module) => ({
    default: module.CategoryPage,
  })),
);
const AppointmentsPage = lazy(() =>
  import("@/pages/appointments/AppointmentsPage").then((module) => ({
    default: module.AppointmentsPage,
  })),
);
const OrdersPage = lazy(() =>
  import("@/pages/orders/OrdersPage").then((module) => ({
    default: module.OrdersPage,
  })),
);
const ProposalsPage = lazy(() =>
  import("@/pages/proposals/ProposalsPage").then((module) => ({
    default: module.ProposalsPage,
  })),
);
const SettingsPage = lazy(() =>
  import("@/pages/settings/SettingsPage").then((module) => ({
    default: module.SettingsPage,
  })),
);
const InvoicesPage = lazy(() =>
  import("@/pages/invoices/InvoicesPage").then((module) => ({
    default: module.InvoicesPage,
  })),
);
const CatalogManagementPage = lazy(() =>
  import("@/pages/admin/CatalogManagementPage").then((module) => ({
    default: module.CatalogManagementPage,
  })),
);
const BillingManagementPage = lazy(() =>
  import("@/pages/admin/BillingManagementPage").then((module) => ({
    default: module.BillingManagementPage,
  })),
);
const PricingGovernancePage = lazy(() =>
  import("@/pages/admin/PricingGovernancePage").then((module) => ({
    default: module.PricingGovernancePage,
  })),
);
const GovernanceAuditPage = lazy(() =>
  import("@/pages/admin/GovernanceAuditPage").then((module) => ({
    default: module.GovernanceAuditPage,
  })),
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

function RouteLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        <div className="h-8 w-full animate-pulse rounded bg-muted" />
        <div className="h-3 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <PlatformProvider>
            <DataProvider>
              <GovernanceProvider>
                <TooltipProvider>
                  <NetworkErrorHandler />
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <Suspense fallback={<RouteLoadingFallback />}>
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/auth/google" element={<GoogleLoginPage />} />

                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <DashboardPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/services"
                        element={
                          <ProtectedRoute>
                            <ServicesPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/services/:categoryId"
                        element={
                          <ProtectedRoute>
                            <CategoryPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/appointments/calendar"
                        element={
                          <ProtectedRoute>
                            <AppointmentsPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/orders"
                        element={
                          <ProtectedRoute>
                            <OrdersPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/invoices"
                        element={
                          <ProtectedRoute>
                            <InvoicesPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/proposals"
                        element={
                          <ProtectedRoute>
                            <ProposalsPage />
                          </ProtectedRoute>
                        }
                      />
                        <Route
                          path="/settings"
                          element={
                            <ProtectedRoute>
                              <SettingsPage />
                            </ProtectedRoute>
                          }
                        />

                        <Route
                          path="/admin/catalog"
                          element={
                            <ProtectedRoute requiredRole={["admin", "manager", "technician"]}>
                              <CatalogManagementPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/pricing"
                          element={
                            <ProtectedRoute requiredRole={["admin", "manager", "technician"]}>
                              <PricingGovernancePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/history"
                          element={
                            <ProtectedRoute requiredRole={["admin", "manager"]}>
                              <GovernanceAuditPage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/billing"
                          element={
                            <ProtectedRoute requiredRole={["admin", "manager"]}>
                              <BillingManagementPage />
                            </ProtectedRoute>
                          }
                        />

                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </BrowserRouter>
                </TooltipProvider>
              </GovernanceProvider>
            </DataProvider>
          </PlatformProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
