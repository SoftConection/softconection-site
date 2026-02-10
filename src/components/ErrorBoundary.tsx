/**
 * Error Boundary Component
 * Captura erros não tratados e exibe interface profissional
 */

import React, { ReactNode, ReactElement } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactElement;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });

    // Log para analytics (não expõe detalhes ao usuário)
    if (process.env.NODE_ENV === "production") {
      // Aqui você poderia enviar para um serviço de logging
      // ex: Sentry, LogRocket, etc
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Reload da página sem cache
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
            <div className="max-w-md w-full space-y-8 text-center">
              {/* Icon */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500/10 rounded-full blur-lg"></div>
                  <div className="relative bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-full inline-flex">
                    <AlertTriangle className="w-12 h-12 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  Algo deu errado
                </h1>
                <p className="text-gray-600 text-sm">
                  Desculpe, encontramos um problema inesperado. Nossa equipe foi
                  notificada e estamos trabalhando para resolver.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4">
                <Button
                  onClick={this.handleReset}
                  className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  size="lg"
                >
                  <RefreshCw className="w-5 h-5" />
                  Tentar Novamente
                </Button>

                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  size="lg"
                  className="border-gray-300"
                >
                  Ir para Início
                </Button>
              </div>

              {/* Support Info */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Se o problema persistir, entre em contato com nosso suporte em{" "}
                  <a
                    href="mailto:suporte@softconection.com"
                    className="text-cyan-600 hover:underline font-medium"
                  >
                    suporte@softconection.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
