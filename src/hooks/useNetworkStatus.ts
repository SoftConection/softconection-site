/**
 * Hook para detectar e tratar erros de rede
 */

import { useEffect, useState, useCallback } from "react";

interface NetworkStatus {
  isOnline: boolean;
  isSlowConnection: boolean;
  connectionType?: string;
  effectiveType?: string;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    isSlowConnection: false,
    connectionType: navigator.connection?.type || undefined,
    effectiveType: navigator.connection?.effectiveType || undefined,
  });

  const checkConnection = useCallback(() => {
    const connection = navigator.connection;

    if (connection) {
      // Detectar conexão lenta (2G, 3G, slow-4g)
      const isSlowConnection = [
        "2g",
        "3g",
        "slow-4g",
      ].includes(connection.effectiveType);

      setNetworkStatus({
        isOnline: navigator.onLine,
        isSlowConnection,
        connectionType: connection.type,
        effectiveType: connection.effectiveType,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    if (navigator.connection) {
      navigator.connection.addEventListener("change", checkConnection);
    }

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);

      if (navigator.connection) {
        navigator.connection.removeEventListener("change", checkConnection);
      }
    };
  }, [checkConnection]);

  return networkStatus;
};

/**
 * Hook para detectar se há problemas com a API
 */
export const useAPIHealth = (interval: number = 30000) => {
  const [isAPIHealthy, setIsAPIHealthy] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        // Tenta fazer um request simples para a raiz da API
        const response = await fetch("/api/health", {
          method: "HEAD",
          cache: "no-cache",
        });

        setIsAPIHealthy(response.ok || response.status < 500);
        setLastChecked(new Date());
      } catch {
        setIsAPIHealthy(false);
        setLastChecked(new Date());
      }
    };

    checkAPI();
    const timer = setInterval(checkAPI, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return { isAPIHealthy, lastChecked };
};
