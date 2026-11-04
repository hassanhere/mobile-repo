import { ReactNode } from 'react';
import { StyleProp, TextProps, ViewStyle } from 'react-native';
import { FontNames, TextVariant } from '~theme';

export interface CustomTextProps extends TextProps {
  variant: TextVariant;
  children: ReactNode;
  size?: number;
  color?: string;
  fontFamily?: FontNames;
  onPress?: VoidFunction;
  containerStyle?: StyleProp<ViewStyle>;
}
