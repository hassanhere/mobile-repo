import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface CalenderInputProps {
  containerStyles?: ViewStyle;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  editable?: boolean;
  textFieldContainer?: Omit<
    ViewStyle,
    | 'borderColor'
    | 'borderBlockColor'
    | 'borderBlockEndColor'
    | 'borderBlockStartColor'
    | 'borderBottomColor'
    | 'borderEndColor'
    | 'borderLeftColor'
    | 'borderRightColor'
    | 'borderStartColor'
    | 'borderTopColor'
  >;
  textColor?: string;
  textSize?: number;
  textInputStyle?: TextStyle;
  value?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  placeholder?: string;
  placeholderTextColor?: string;
  mode?: 'date' | 'time';
  maximumDate?: Date;
  minimumDate?: Date;
  onChange: (value: Date) => void;
  errorMessageColor?: string;
  errorMessageSize?: number;
  error?: string | null;
  borderColor?: string;
}
