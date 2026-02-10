/**
 * Network Error Handler
 * Detecta e trata erros de rede de forma profissional
 */

import { useEffect, useState } from "react";
import { AlertCircle, Wifi, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NetworkErrorHandler = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowError(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowError(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!showError) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/10 rounded-full blur-lg"></div>
            <div className="relative bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-full inline-flex">
              <Wifi className="w-10 h-10 text-orange-600 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Conexão Perdida
          </h2>
          <p className="text-gray-600 text-sm">
            Parece que sua conexão com a internet foi interrompida. Verifique
            sua conexão e tente novamente.
          </p>
        </div>

        {/* Status Info */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />
            <p className="text-sm text-orange-800">
              Você está offline. Muitos recursos podem não estar disponíveis.
            </p>
          </div>
        </div>

        {/* Actions */}
        <Button
          onClick={() => window.location.reload()}
          className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          size="lg"
        >
          <RefreshCw className="w-5 h-5" />
          Reconectar
        </Button>
      </div>
    </div>
  );
};
