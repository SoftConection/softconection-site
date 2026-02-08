import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas preferências e conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 text-primary font-medium transition">
            <User className="w-5 h-5" />
            Perfil
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-foreground transition">
            <Lock className="w-5 h-5" />
            Segurança
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-secondary text-foreground transition">
            <Bell className="w-5 h-5" />
            Notificações
          </button>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Perfil</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Nome</label>
                <Input
                  value={user?.name}
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  value={user?.email}
                  type="email"
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                  readOnly
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Empresa</label>
                <Input
                  value={user?.company || ""}
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                  placeholder="Sua empresa"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Telefone</label>
                <Input
                  value={user?.phone || ""}
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                  placeholder="+55 11 9999-9999"
                />
              </div>

              <Button className="w-full">Salvar Alterações</Button>
            </div>
          </Card>

          {/* Security Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Segurança</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Senha Atual</label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-11 bg-secondary/40 border-border/30 pr-10"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Nova Senha</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Confirmar Nova Senha</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-11 bg-secondary/40 border-border/30 mt-1"
                />
              </div>

              <Button className="w-full">Atualizar Senha</Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-red-500/20 bg-red-500/5">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Zona de Perigo</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Essas ações não podem ser desfeitas. Por favor, proceda com cuidado.
            </p>
            <Button variant="outline" className="text-red-500 hover:text-red-600">
              Deletar Conta
            </Button>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};
