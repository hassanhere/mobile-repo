import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import {
  KeyboardType,
  StyleProp,
  ViewStyle,
  ReturnKeyType,
  TextInputProps,
  TextStyle,
} from 'react-native';

type autoCapitalizeProps = 'none' | 'sentences' | 'words' | 'characters';

export interface InputProps extends Partial<TextInputProps> {
  control: Control<any>;
  name: string;
  placeholder?: string;
  placeholderTextColor?: string;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  error?: string | null;
  errorMessageColor?: string;
  errorMessageSize?: number;
  keyType?: ReturnKeyType;
  keyboardType?: KeyboardType;
  onSubmit?: () => void;
  maxLength?: number;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  textAlignVertical?: 'top' | 'center' | 'bottom';
  multiline?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: autoCapitalizeProps;
  containerStyles?: StyleProp<ViewStyle>;
  textInputStyle?: TextStyle;
  textFieldContainer?: StyleProp<ViewStyle>;
  contextMenuHidden?: boolean;
  inputBorderColor?: string;
}
