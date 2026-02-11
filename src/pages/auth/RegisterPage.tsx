import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Users,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import UserStorageService from "@/services/UserStorageService";
import { AccountType } from "@/types/user";
import { cn } from "@/lib/utils";

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountTypeSelect = (type: AccountType) => {
    setAccountType(type);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountType) {
      toast.error("Selecione um tipo de conta");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!formData.phone) {
      toast.error("Telefone é obrigatório");
      return;
    }

    setIsLoading(true);

    try {
      // Registrar no serviço local
      const userProfile = UserStorageService.registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        accountType,
        company: formData.company,
      });

      // Registrar no AuthContext
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        company: formData.company,
        phone: formData.phone,
      });

      toast.success("🎉 Conta criada com sucesso!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Passo 1: Selecionar tipo de conta
  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl mx-auto mb-4">
              <span className="text-white font-display font-bold text-2xl">SC</span>
            </div>
            <h1 className="text-4xl font-display font-bold mb-3">Bem-vindo à SoftConection</h1>
            <p className="text-muted-foreground text-lg">Escolha seu tipo de conta para começar</p>
          </div>

          {/* Account Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cliente */}
            <button
              onClick={() => handleAccountTypeSelect("cliente")}
              className="group relative overflow-hidden rounded-xl p-8 bg-card border-2 border-transparent hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:from-cyan-500/10 group-hover:to-cyan-500/5 transition-all" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-cyan-500/20 transition-colors">
                  <Users className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Cliente</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Contratar serviços e solicitar suporte técnico
                </p>
                <ul className="text-xs text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Agendar serviços
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Suporte 24/7
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Histórico de pedidos
                  </li>
                </ul>
              </div>
            </button>

            {/* Parceiro */}
            <button
              onClick={() => handleAccountTypeSelect("parceiro")}
              className="group relative overflow-hidden rounded-xl p-8 bg-card border-2 border-transparent hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/5 transition-all" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Briefcase className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Parceiro</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Colaborar com SoftConection em projetos
                </p>
                <ul className="text-xs text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Propostas de parceria
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Acesso exclusivo
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Benefícios especiais
                  </li>
                </ul>
              </div>
            </button>

            {/* Colaborador */}
            <button
              onClick={() => handleAccountTypeSelect("colaborador")}
              className="group relative overflow-hidden rounded-xl p-8 bg-card border-2 border-transparent hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-500/5 transition-all" />
              <div className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/20 transition-colors">
                  <Building2 className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">Colaborador</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Faça parte do time SoftConection
                </p>
                <ul className="text-xs text-muted-foreground space-y-2 text-left">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Dashboard de trabalho
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Gerenciar atividades
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Comunidade interna
                  </li>
                </ul>
              </div>
            </button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Já tem conta?{" "}
            <a href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Fazer login
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Passo 2: Preencher dados
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl mx-auto mb-4">
            <span className="text-white font-display font-bold text-2xl">SC</span>
          </div>
          <h1 className="text-3xl font-display font-bold mb-2">Complete seu Perfil</h1>
          <p className="text-muted-foreground text-sm">
            Registre como <span className="font-semibold capitalize">{accountType}</span>
          </p>
        </div>

        {/* Register Card */}
        <Card className="p-8 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nome Completo *</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="name"
                  placeholder="João Silva"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Telefone *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+55 11 9999-9999"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  required
                />
              </div>
            </div>

            {/* Company (opcional para não-colaboradores) */}
            {accountType !== "colaborador" && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Empresa</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="company"
                    placeholder="Sua Empresa"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Senha *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirmar Senha *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="pl-10 h-10 bg-secondary/40 border-border/30 text-sm"
                  required
                />
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-center gap-2 text-sm cursor-pointer mt-6">
              <input type="checkbox" className="rounded" required />
              <span className="text-muted-foreground">
                Concordo com os{" "}
                <a href="#" className="text-primary hover:underline">
                  Termos de Serviço
                </a>
              </span>
            </label>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-10"
                onClick={() => setStep(1)}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                className="flex-1 h-10 gap-2 text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Criando..." : "Criar Conta"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Já tem conta?{" "}
              <a href="/auth/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                Fazer login
              </a>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};
