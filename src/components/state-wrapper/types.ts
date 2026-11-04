import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TextVariant } from '~theme';

export interface StateWrapperProps {
  isLoading?: boolean;
  loadingText?: string;
  showCustomLoadingComponent?: boolean;
  loadingComponent?: ReactNode;
  loaderColor?: string;
  loaderSize?: 'large' | 'small';
  loadingTextVariant?: TextVariant;
  errorTextVariant?: TextVariant;
  isError?: boolean;
  showCustomErrorComponent?: boolean;
  errorComponent?: ReactNode;
  errorText?: string;
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  loadingContainerStyle?: StyleProp<ViewStyle>;
  loadingTextStyle?: StyleProp<TextStyle>;
  loadingTextContainerStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  errorTextContainerStyle?: StyleProp<ViewStyle>;
  errorContainerStyle?: StyleProp<ViewStyle>;
}
