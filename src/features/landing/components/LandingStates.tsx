import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function LandingLoadingState() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-24 md:px-10">
        <div className="space-y-4">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-14 w-full max-w-3xl" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-xl" />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface LandingErrorStateProps {
  onRetry: () => void;
}

export function LandingErrorState({ onRetry }: LandingErrorStateProps) {
  return (
    <div className="min-h-screen bg-background px-6 py-24 md:px-10">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-2xl border border-border bg-card px-8 py-12 text-center">
        <div className="mb-4 rounded-full bg-destructive/10 p-3 text-destructive">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-display font-semibold text-foreground">Falha ao carregar a pagina</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Tivemos um problema ao buscar os dados da interface. Tente novamente em alguns instantes.
        </p>
        <Button onClick={onRetry} className="mt-8 gap-2">
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}

export function LandingEmptyState() {
  return (
    <div className="min-h-screen bg-background px-6 py-24 md:px-10">
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-card px-8 py-12 text-center">
        <h1 className="text-2xl font-display font-semibold text-foreground">Conteudo indisponivel</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Nenhum conteudo foi retornado para a landing page no momento.
        </p>
      </div>
    </div>
  );
}
