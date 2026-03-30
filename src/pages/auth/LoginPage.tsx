import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  type CredentialResponse,
} from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { extractGoogleUserData } from "@/lib/googleAuth";
import { Logo } from "@/components/branding/Logo";

const LoginContent: React.FC<{ googleEnabled?: boolean }> = ({
  googleEnabled = true,
}) => {
  const [email, setEmail] = useState("admin@softconection.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success("Bem-vindo!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const userData = extractGoogleUserData(credentialResponse);
      if (!userData) {
        toast.error("Não foi possível validar os dados da conta Google");
        return;
      }

      // Executar login com payload sanitizado
      await login(userData);

      // Redirecionar para dashboard
      toast.success("Bem-vindo ao SoftConection!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Erro ao processar autenticação Google:", error);
      toast.error("Erro ao fazer login com Google");
    }
  };

  const handleGoogleError = () => {
    console.log("Falha no login com Google");
    toast.error("Falha ao fazer login com Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Logo size="large" animated className="drop-shadow-md" />
          </div>
          <p className="text-muted-foreground">Soluções Profissionais de TI</p>
        </div>

        {/* Login Card */}
        <Card className="p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-secondary/40 border-border/30"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-secondary/40 border-border/30"
                  required
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-muted-foreground">Lembrar-me</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">
                Esqueci a senha
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 gap-2"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Ou continue com</span>
            </div>
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            {googleEnabled ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signin"
                size="large"
                locale="pt_BR"
              />
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                Login com Google indisponível: configure
                {" "}VITE_GOOGLE_CLIENT_ID no ambiente.
              </p>
            )}
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem conta?{" "}
            <a href="/auth/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Criar agora
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
};

export const LoginPage: React.FC = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    return <LoginContent googleEnabled={false} />;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <LoginContent googleEnabled />
    </GoogleOAuthProvider>
  );
};
