import { Colors } from '../constants/theme';

export const theme = {
  light: {
    ...Colors.light,
    primary: '#0a7ea4',
    secondary: '#f0f0f0',
    error: '#ff4444',
    success: '#00c851',
    border: '#e0e0e0',
    card: '#ffffff',
    textSecondary: '#687076',
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
    }
  },
  dark: {
    ...Colors.dark,
    primary: '#0a7ea4',
    secondary: '#2c2c2e',
    error: '#ff5252',
    success: '#00e676',
    border: '#38383a',
    card: '#1c1c1e',
    textSecondary: '#9BA1A6',
    spacing: {
      xs: 4,
      s: 8,
      m: 16,
      l: 24,
      xl: 32,
    },
    borderRadius: {
      s: 4,
      m: 8,
      l: 16,
    }
  },
};

export type AppTheme = typeof theme.light;

