import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

type UseAppStateOptions = {
  onBackground?: () => void;
  onForeground?: () => void;
};

const useAppState = ({
  onBackground,
  onForeground,
}: UseAppStateOptions = {}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      const previousAppState = appState.current;

      // App has gone to background
      if (previousAppState === 'active' && nextAppState === 'background') {
        onBackground?.();
      }

      // App has come back to foreground
      if (
        previousAppState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        onForeground?.();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [onBackground, onForeground]);
};

export default useAppState;
