import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Log seguro - não expõe stack trace
    console.warn(`404 - Rota não encontrada: ${location.pathname}`);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex flex-col items-center justify-center px-4">
      {/* Header com Logo */}
      <div className="mb-12 pt-8">
        <img src={logo} alt="SoftConection" className="h-14 w-auto" />
      </div>

      {/* Main Content */}
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-2xl"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
              <AlertTriangle className="w-12 h-12 text-orange-600" />
            </div>
          </div>
        </div>

        {/* 404 Number */}
        <div className="space-y-2">
          <p className="text-6xl lg:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
            404
          </p>
          <p className="text-xl text-gray-600 font-medium">
            Página não encontrada
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2 bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-gray-700 text-sm">
            Desculpe, a página que você está procurando não existe ou foi
            movida.
          </p>
          <p className="text-gray-500 text-xs font-mono break-all">
            {location.pathname}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={() => navigate("/")}
            className="flex-1 gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            size="lg"
          >
            <Home className="w-5 h-5" />
            Voltar ao Início
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex-1 border-gray-300"
            size="lg"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Ao Anterior
          </Button>
        </div>

        {/* Help Section */}
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <p className="text-xs uppercase tracking-wide font-semibold text-gray-500">
            Precisa de ajuda?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Dashboard
            </a>
            <span className="hidden sm:block text-gray-300">•</span>
            <a
              href="mailto:suporte@softconection.com"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Suporte
            </a>
            <span className="hidden sm:block text-gray-300">•</span>
            <a
              href="/"
              className="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              Início
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
