/**
 * Serviço de Armazenamento Local de Dados
 * Simula um banco de dados usando localStorage
 *
 * Dados salvos:
 * - Perfis de usuários registrados
 * - Informações de contato
 * - Histórico de atividades
 */

import { UserProfile, UserCredentials } from "@/types/user";

const STORAGE_KEYS = {
  USERS: "sc_users",
  SESSIONS: "sc_sessions",
  CONTACTS: "sc_contacts",
  ACTIVITIES: "sc_activities",
};

// Interface para dados armazenados
interface StorageData {
  users: UserProfile[];
  sessions: any[];
  contacts: any[];
  activities: any[];
  lastSync: string;
}

// Validar e obter dados do localStorage
const getStorageData = (): StorageData => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        users: parsed.users || [],
        sessions: parsed.sessions || [],
        contacts: parsed.contacts || [],
        activities: parsed.activities || [],
        lastSync: parsed.lastSync || new Date().toISOString(),
      };
    }
  } catch (error) {
    console.error("Erro ao recuperar dados do localStorage:", error);
  }

  return {
    users: [],
    sessions: [],
    contacts: [],
    activities: [],
    lastSync: new Date().toISOString(),
  };
};

// Salvar dados no localStorage
const saveStorageData = (data: StorageData) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.USERS,
      JSON.stringify({
        ...data,
        lastSync: new Date().toISOString(),
      })
    );

    // Também salva um backup em JSON stringificado
    downloadBackup(data);
  } catch (error) {
    console.error("Erro ao salvar dados no localStorage:", error);
  }
};

// Exportar dados como JSON
const downloadBackup = (data: StorageData) => {
  try {
    const backup = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      ...data,
    };

    // Salvar como variável global para possível download
    (window as any).SC_BACKUP = backup;

    // Também salva no sessionStorage como backup temporário
    sessionStorage.setItem("sc_backup", JSON.stringify(backup));
  } catch (error) {
    console.error("Erro ao criar backup:", error);
  }
};

// Serviço de operações de usuários
export const UserStorageService = {
  /**
   * Registrar novo usuário
   */
  registerUser: (credentials: UserCredentials): UserProfile => {
    const data = getStorageData();

    // Verificar se email já existe
    const existingUser = data.users.find((u) => u.email === credentials.email);
    if (existingUser) {
      throw new Error("Email já registrado");
    }

    const newUser: UserProfile = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: credentials.name,
      email: credentials.email,
      phone: credentials.phone,
      accountType: credentials.accountType,
      company: credentials.company,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      verified: false,
    };

    data.users.push(newUser);

    // Adicionar atividade
    data.activities.push({
      id: `act_${Date.now()}`,
      userId: newUser.id,
      type: "registration",
      description: `Usuário ${newUser.name} se registrou como ${newUser.accountType}`,
      timestamp: new Date().toISOString(),
    });

    saveStorageData(data);
    return newUser;
  },

  /**
   * Buscar usuário por email
   */
  findUserByEmail: (email: string): UserProfile | null => {
    const data = getStorageData();
    return data.users.find((u) => u.email === email) || null;
  },

  /**
   * Buscar usuário por ID
   */
  findUserById: (id: string): UserProfile | null => {
    const data = getStorageData();
    return data.users.find((u) => u.id === id) || null;
  },

  /**
   * Atualizar perfil do usuário
   */
  updateUserProfile: (id: string, updates: Partial<UserProfile>): UserProfile => {
    const data = getStorageData();
    const userIndex = data.users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      throw new Error("Usuário não encontrado");
    }

    const updatedUser: UserProfile = {
      ...data.users[userIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    data.users[userIndex] = updatedUser;
    saveStorageData(data);

    return updatedUser;
  },

  /**
   * Obter todos os usuários
   */
  getAllUsers: (): UserProfile[] => {
    const data = getStorageData();
    return data.users;
  },

  /**
   * Obter usuários por tipo de conta
   */
  getUsersByAccountType: (accountType: string): UserProfile[] => {
    const data = getStorageData();
    return data.users.filter((u) => u.accountType === accountType);
  },

  /**
   * Deletar usuário
   */
  deleteUser: (id: string): boolean => {
    const data = getStorageData();
    const initialLength = data.users.length;

    data.users = data.users.filter((u) => u.id !== id);

    if (data.users.length < initialLength) {
      saveStorageData(data);
      return true;
    }

    return false;
  },

  /**
   * Obter estatísticas
   */
  getStatistics: () => {
    const data = getStorageData();
    return {
      totalUsers: data.users.length,
      clientsCount: data.users.filter((u) => u.accountType === "cliente").length,
      partnersCount: data.users.filter((u) => u.accountType === "parceiro").length,
      collaboratorsCount: data.users.filter((u) => u.accountType === "colaborador")
        .length,
      lastSync: data.lastSync,
    };
  },

  /**
   * Obter atividades recentes
   */
  getRecentActivities: (limit: number = 10): any[] => {
    const data = getStorageData();
    return data.activities.sort((a, b) => {
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }).slice(0, limit);
  },

  /**
   * Download dos dados como JSON
   */
  exportData: (): void => {
    const data = getStorageData();
    const exportData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      ...data,
    };

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:application/json;charset=utf-8,${encodeURIComponent(JSON.stringify(exportData, null, 2))}`
    );
    element.setAttribute("download", `softconection_backup_${Date.now()}.json`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  },

  /**
   * Limpar todos os dados (cuidado!)
   */
  clearAllData: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USERS);
    sessionStorage.removeItem("sc_backup");
  },
};

export default UserStorageService;
