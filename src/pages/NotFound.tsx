import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, Home, ArrowRight, MessageSquare, Smartphone } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl">
        {/* Header com Logo */}
        <div className="mb-12 flex justify-center">
          <img src={logo} alt="SoftConection" className="h-12 w-auto brightness-110" />
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Icon com animação */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/30">
                <AlertTriangle className="w-12 h-12 text-red-500 animate-bounce" />
              </div>
            </div>
          </div>

          {/* 404 Number */}
          <div className="text-center space-y-3">
            <p className="text-7xl md:text-8xl font-display font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              404
            </p>
            <p className="text-2xl md:text-3xl font-semibold text-white">
              Página não encontrada
            </p>
          </div>

          {/* Error Details - mais profissional */}
          <div className="space-y-4 bg-slate-800/50 rounded-xl p-6 border border-slate-700 backdrop-blur-sm">
            <p className="text-gray-300 text-center">
              Desculpe, a página que você está procurando não existe ou foi movida para outro local. A SoftConection mantém experiência clara e sem erros.
            </p>
            <div className="bg-slate-700/50 rounded-lg p-3 font-mono text-xs text-gray-400 break-all border border-slate-600 max-h-12 overflow-y-auto">
              Rota solicitada: {location.pathname}
            </div>
          </div>

          {/* Quick Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate("/")}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-11 px-6 rounded-lg"
            >
              <Home className="w-5 h-5" />
              Voltar ao Início
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2 border-slate-600 text-gray-300 hover:bg-slate-800 h-11 px-6 rounded-lg"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Página Anterior
            </Button>
          </div>

          {/* Support Section */}
          <div className="border-t border-slate-700 pt-8 space-y-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-gray-400 text-center">
              Encontrou um problema?
            </p>

            {/* Support Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Support */}
              <a
                href="mailto:suporte@softconection.com"
                className="group p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
                    <MessageSquare className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      Email
                    </p>
                    <p className="text-xs text-gray-400">suporte@softconection.com</p>
                  </div>
                </div>
              </a>

              {/* WhatsApp Support */}
              <a
                href="https://wa.me/5511968268377"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-green-500/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 flex items-center justify-center transition-colors">
                    <Smartphone className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">
                      WhatsApp
                    </p>
                    <p className="text-xs text-gray-400">+55 11 96826-8377</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Info Message */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-yellow-400">💡 Dica:</span> Se você é novo por aqui,{" "}
                <Button
                  onClick={() => navigate("/auth/register")}
                  variant="link"
                  className="p-0 h-auto text-cyan-400 hover:text-cyan-300 underline"
                >
                  crie sua conta
                </Button>{" "}
                para acessar nossos serviços.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-5" />
      </div>
    </div>
  );
};

export default NotFound;
