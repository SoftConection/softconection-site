import React from "react";
import { ArrowRight, Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ComingSoonProps {
  title: string;
  description?: string;
  features?: string[];
  icon?: React.ReactNode;
  ctaText?: string;
  ctaAction?: () => void;
  showBackButton?: boolean;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description = "Estamos trabalhando para trazer essa funcionalidade em breve",
  features = [],
  icon = <Rocket className="w-12 h-12" />,
  ctaText = "Voltar ao Dashboard",
  ctaAction,
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (ctaAction) {
      ctaAction();
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl">
        <div className="text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/30">
                <div className="text-cyan-400">{icon}</div>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <p className="text-5xl md:text-6xl font-display font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Em Breve
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {title}
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              {description}
            </p>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-3 bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <p className="text-sm font-semibold text-white text-left">
                O que você poderá fazer:
              </p>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="space-y-2">
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-60% bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse rounded-full" 
                   style={{ width: "60%" }} />
            </div>
            <p className="text-sm text-gray-400">
              60% de conclusão | Entrega prevista em breve
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={handleAction}
              className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-11 px-6"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Button>
            {showBackButton && (
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="gap-2 border-slate-600 text-gray-300 hover:bg-slate-800 h-11 px-6"
              >
                Voltar
              </Button>
            )}
          </div>

          {/* Support Info */}
          <div className="pt-8 border-t border-slate-700">
            <p className="text-sm text-gray-400">
              Tem dúvidas ou sugestões?{" "}
              <a
                href="mailto:suporte@softconection.com"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                Contate nosso suporte
              </a>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-5" />
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-5" />
      </div>
    </div>
  );
};

export default ComingSoon;
