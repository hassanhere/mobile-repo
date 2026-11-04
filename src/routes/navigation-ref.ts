import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import { RootStackParamList } from './routes';

/**
 * Global navigation reference for triggering navigation actions
 * outside of React components.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * Navigates to a screen from places outside React components.
 */
export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: name as string,
        params: params as object | undefined,
      }),
    );
  }
}

/**
 * Replaces the current route with a new one from outside components.
 */
export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T],
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name as string, params as object | undefined),
    );
  }
}
