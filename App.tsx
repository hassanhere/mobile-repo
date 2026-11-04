/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNavigator from './src/routes';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PersistGate } from 'redux-persist/integration/react';
import { LogBox } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ErrorBoundary from 'ErrorBoundary';
import { toastConfig } from '~utils';
import { SlowNetWorkMessage } from '~components';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { ThemeProvider } from '~theme';

LogBox.ignoreLogs(['Warning: ...']);

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <ThemeProvider>
              <ErrorBoundary>
                <KeyboardProvider>
                  <SlowNetWorkMessage />
                  <MainNavigator />
                </KeyboardProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

export default App;
