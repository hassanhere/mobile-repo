import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export enum ScreenNames {
  HOME = 'Home',
  LOGIN = 'login',
  ABOUT = 'About',
}

export type RootStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.LOGIN]: undefined;
  [ScreenNames.ABOUT]: undefined;
};

// Define the navigation prop type
export type RootStackNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

// Define the route prop type
export type RootStackRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;
