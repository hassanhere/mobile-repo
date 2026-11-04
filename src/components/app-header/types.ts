import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TextVariant } from '~theme';

export interface HeaderProps {
  title?: string;
  textVariant?: TextVariant;
  titleTextStyle?: StyleProp<TextStyle>;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: ReactNode;
  leftIconDisplay?: boolean;
  rightIcon?: ReactNode | undefined;
  containerStyle?: ViewStyle;
}
