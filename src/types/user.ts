/**
 * Tipos e interfaces para usuários
 */

export type AccountType = "cliente" | "parceiro" | "colaborador";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: AccountType;
  company?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
}

export interface UserCredentials {
  name: string;
  email: string;
  password: string;
  phone: string;
  accountType: AccountType;
  company?: string;
}

export interface AuthUser extends Omit<UserProfile, "id" | "createdAt" | "updatedAt"> {
  id: string;
}
