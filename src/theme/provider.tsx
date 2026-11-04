import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { useSelector } from 'react-redux';
import { DarkTheme } from './dark-theme';
import { LightTheme } from './light-theme';
import { AppTheme } from './types';
import { selectedMode } from '~redux/slices/config';

interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  isDark: false,
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const mode = useSelector(selectedMode);

  const system = useColorScheme();

  const isDark = mode === 'system' ? system === 'dark' : mode === 'dark';

  const theme = isDark ? DarkTheme : LightTheme;

  const value = useMemo(
    () => ({
      theme,
      isDark,
    }),
    [theme, isDark],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
