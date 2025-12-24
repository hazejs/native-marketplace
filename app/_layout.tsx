import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { store } from '@/store';
import { theme } from '@/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ReduxProvider store={store}>
      <StyledThemeProvider theme={theme.light}>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="details/[id]" options={{ title: 'Product Details' }} />
          </Stack>
          <StatusBar style="dark" />
        </ThemeProvider>
      </StyledThemeProvider>
    </ReduxProvider>
  );
}
