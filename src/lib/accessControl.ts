import type { User } from "@/types";

export type PlatformRole = User["role"];

export const ROLE_LABELS: Record<PlatformRole, string> = {
  admin: "Administrador",
  manager: "Gestor",
  technician: "Técnico",
  client: "Cliente",
  partner: "Parceiro",
  investor: "Investidor",
};

const ROLE_PERMISSIONS: Record<PlatformRole, string[]> = {
  admin: ["*"],
  manager: [
    "dashboard:view",
    "services:manage",
    "appointments:manage",
    "orders:manage",
    "proposals:manage",
    "invoices:manage",
    "contracts:manage",
    "partnerships:manage",
    "donations:manage",
    "marketplace:manage",
    "investor:view",
    "activity:view",
  ],
  technician: [
    "dashboard:view",
    "services:manage",
    "appointments:manage",
    "orders:manage",
    "invoices:view",
    "contracts:view",
    "marketplace:view",
    "activity:view",
  ],
  client: [
    "dashboard:view",
    "services:create",
    "appointments:create",
    "orders:view",
    "proposals:view",
    "invoices:view",
    "contracts:view",
    "marketplace:view",
    "donations:create",
  ],
  partner: [
    "dashboard:view",
    "contracts:manage",
    "partnerships:manage",
    "invoices:view",
    "marketplace:view",
    "donations:create",
  ],
  investor: [
    "dashboard:view",
    "investor:view",
    "marketplace:view",
    "donations:create",
  ],
};

export const canAccess = (role: PlatformRole | undefined, permission: string): boolean => {
  if (!role) return false;

  const permissions = ROLE_PERMISSIONS[role] ?? [];
  return permissions.includes("*") || permissions.includes(permission);
};

export const hasSomeRole = (
  currentRole: PlatformRole | undefined,
  requiredRoles?: PlatformRole | PlatformRole[]
): boolean => {
  if (!requiredRoles) return true;
  if (!currentRole) return false;

  const normalized = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
  return normalized.includes(currentRole);
};

export const roleFromEmail = (email: string): PlatformRole => {
  const normalizedEmail = email.toLowerCase();

  if (normalizedEmail.includes("admin")) return "admin";
  if (normalizedEmail.includes("manager") || normalizedEmail.includes("gestor")) return "manager";
  if (normalizedEmail.includes("tech") || normalizedEmail.includes("tecnico")) return "technician";
  if (normalizedEmail.includes("partner") || normalizedEmail.includes("parceiro")) return "partner";
  if (normalizedEmail.includes("invest")) return "investor";

  return "client";
};
