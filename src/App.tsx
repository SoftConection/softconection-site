import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NetworkErrorHandler } from "@/components/NetworkErrorHandler";

// Pages
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { ServicesPage } from "@/pages/services/ServicesPage";
import { CategoryPage } from "@/pages/services/CategoryPage";
import { AppointmentsPage } from "@/pages/appointments/AppointmentsPage";
import { OrdersPage } from "@/pages/orders/OrdersPage";
import { ProposalsPage } from "@/pages/proposals/ProposalsPage";
import { SettingsPage } from "@/pages/settings/SettingsPage";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";

// Query Client com error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5, // 5 minutos
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <TooltipProvider>
              <NetworkErrorHandler />
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />

                  {/* Protected Routes */}
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

                  {/* Catch All */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
