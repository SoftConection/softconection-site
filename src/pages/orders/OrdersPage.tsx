import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle2,
  Plus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  pending: {
    color: "bg-yellow-500/10 text-yellow-500",
    label: "Pendente",
    icon: <Package className="w-4 h-4" />,
  },
  confirmed: {
    color: "bg-blue-500/10 text-blue-500",
    label: "Confirmado",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  processing: {
    color: "bg-purple-500/10 text-purple-500",
    label: "Processando",
    icon: <ShoppingCart className="w-4 h-4" />,
  },
  shipped: {
    color: "bg-sky-500/10 text-sky-500",
    label: "Enviado",
    icon: <Truck className="w-4 h-4" />,
  },
  delivered: {
    color: "bg-green-500/10 text-green-500",
    label: "Entregue",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  cancelled: {
    color: "bg-red-500/10 text-red-500",
    label: "Cancelado",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
};

export const OrdersPage: React.FC = () => {
  const { orders, services } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingAddress.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getServiceName = (serviceId: string) => {
    return services.find((s) => s.id === serviceId)?.name || "Serviço desconhecido";
  };

  return (
    <AppLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Pedidos</h1>
          <p className="text-muted-foreground">
            Acompanhe todos os seus pedidos
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Pedido
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por ID ou localização..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 bg-secondary/40 border-border/30"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter || ""} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-11 bg-secondary/40 border-border/30">
            <SelectValue placeholder="Todos os status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos os status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="confirmed">Confirmado</SelectItem>
            <SelectItem value="processing">Processando</SelectItem>
            <SelectItem value="shipped">Enviado</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
            <SelectItem value="cancelled">Cancelado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table/Cards */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status];

            return (
              <Card key={order.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg">Pedido #{order.id}</h3>
                      <Badge className={config.color}>
                        <span className="mr-1">{config.icon}</span>
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.shippingAddress.city}, {order.shippingAddress.state}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      R${" "}
                      {order.totalAmount.toLocaleString("pt-BR", {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {order.items.length} item(ns)
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4 pb-4 border-b border-border/30 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-sm p-2 rounded-lg bg-secondary/40"
                    >
                      <span>{getServiceName(item.serviceId)}</span>
                      <span className="text-muted-foreground">
                        {item.quantity}x R${" "}
                        {item.unitPrice.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  {order.status === "pending" && (
                    <Button size="sm" variant="outline">
                      Confirmar
                    </Button>
                  )}
                  {["pending", "confirmed", "processing"].includes(order.status) && (
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                      Cancelar
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-16">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
            <p className="text-muted-foreground mb-4">
              Crie seu primeiro pedido agora
            </p>
            <Button>Novo Pedido</Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};
