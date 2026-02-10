/**
 * Página de Login com Google OAuth
 * Integração segura com Google Sign-In para SoftConection
 */

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "@/contexts/AuthContext";
import { COMPANY_INFO, BRAND_COLORS } from "@/config/branding";
import logo from "@/assets/logo.png";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoogleLoginContent: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      // Decodificar o JWT token
      const token = credentialResponse.credential;
      const decoded = JSON.parse(atob(token.split(".")[1]));

      // Armazenar informações do usuário
      const userData = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        verified: decoded.email_verified,
      };

      // Armazenar no localStorage
      localStorage.setItem("google_auth_token", token);
      localStorage.setItem("user_data", JSON.stringify(userData));

      // Executar login
      login(userData);

      // Redirecionar para dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Erro ao processar autenticação Google:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Falha no login com Google");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100">
          {/* Logo e Branding */}
          <div className="text-center mb-8">
            <img
              src={logo}
              alt="SoftConection"
              className="h-16 mx-auto mb-4 drop-shadow-md"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              SoftConection
            </h1>
            <p className="text-gray-600">
              Acesse seu dashboard profissional
            </p>
          </div>

          {/* Lock Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full">
              <Lock className="w-8 h-8 text-cyan-600" />
            </div>
          </div>

          {/* Informações */}
          <div className="mb-8">
            <p className="text-sm text-gray-600 text-center mb-6">
              Faça login com sua conta Google para acessar todos os recursos da
              SoftConection.
            </p>

            {/* Google Login Button */}
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin"
                size="large"
                locale="pt_BR"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>

          {/* Contato para acesso */}
          <div className="space-y-3 text-center">
            <p className="text-sm text-gray-600">
              Não possui conta? Entre em contato com nosso suporte
            </p>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
            >
              {COMPANY_INFO.contact.email}
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">
                Contatos de suporte:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">
                  📧 {COMPANY_INFO.contact.support}
                </p>
                <p className="text-gray-600">
                  📱 {COMPANY_INFO.contact.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Botão Voltar */}
          <div className="mt-8">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/")}
            >
              ← Voltar para Home
            </Button>
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Suas informações são protegidas pelas políticas de segurança da
              Google e SoftConection
            </p>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 p-4 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Baseado em <span style={{ color: BRAND_COLORS.secondary }}>●</span>{" "}
            {COMPANY_INFO.locations.map((l) => l.city).join(" & ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export const GoogleLoginPage: React.FC = () => {
  const googleClientId =
    "769154537622-meid4vk2fb5rsmip5oh59kpc5m7jco6l.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <GoogleLoginContent />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginPage;
