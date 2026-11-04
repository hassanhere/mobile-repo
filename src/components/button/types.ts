import { ReactNode } from 'react';
import { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { TextVariant } from '~theme';

export interface ButtonProps {
  onPress?: () => void;
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  withShadow?: boolean;
  containerStyle?: ViewStyle;
  touchableOpacityProps?: TouchableOpacityProps;
  textStyle?: TextStyle;
  buttonTextVariant?: TextVariant;
  disabled?: boolean;
  buttonTextColor?: string;
  disabledTextColor?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  loaderColor?: string;
}
