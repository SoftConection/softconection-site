/**
 * Sistema de Temas e Branding para SoftConection
 * Permite customização de cores, tipografia e estilos de forma centralizada
 */

export type Theme = 'dark' | 'light' | 'professional';

export interface BrandingTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    headingFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
}

export const PROFESSIONAL_THEME: BrandingTheme = {
  name: 'Professional SoftConection',
  colors: {
    primary: '#0A0A0A', // Preto corporativo
    secondary: '#00D9FF', // Cyan vibrante
    accent: '#FF6B35', // Laranja energético
    background: '#FFFFFF',
    foreground: '#0A0A0A',
    muted: '#F5F5F5',
    border: '#E0E0E0',
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    headingFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '1rem',
  },
};

export const DARK_PROFESSIONAL_THEME: BrandingTheme = {
  name: 'Dark Professional SoftConection',
  colors: {
    primary: '#FFFFFF',
    secondary: '#00D9FF',
    accent: '#FF6B35',
    background: '#0A0A0A',
    foreground: '#FFFFFF',
    muted: '#1A1A1A',
    border: '#2A2A2A',
  },
  typography: PROFESSIONAL_THEME.typography,
  spacing: PROFESSIONAL_THEME.spacing,
  radius: PROFESSIONAL_THEME.radius,
};

/**
 * Configuração de componentes profissionais
 */
export const COMPONENT_STYLES = {
  button: {
    primary: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 font-medium transition-all duration-300',
    outline: 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50 font-medium transition-all duration-300',
    ghost: 'text-gray-700 hover:bg-gray-100 font-medium transition-all duration-300',
  },
  card: {
    default: 'bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300',
    elevated: 'bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300',
    gradient: 'bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl shadow-sm',
  },
  input: {
    default: 'px-4 py-3 rounded-lg border border-gray-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300',
    filled: 'px-4 py-3 rounded-lg bg-gray-100 border border-transparent focus:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300',
  },
  section: {
    default: 'py-12 md:py-20 lg:py-28 px-4 md:px-6 lg:px-8',
    hero: 'min-h-screen py-20 px-4 md:px-6 lg:px-8 flex items-center justify-center',
  },
};

/**
 * Tokens de design para uso em toda a aplicação
 */
export const DESIGN_TOKENS = {
  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
};
