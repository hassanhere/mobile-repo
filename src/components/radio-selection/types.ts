import { TextStyle, ViewStyle } from 'react-native';

export interface RadioSelectionProps {
  value: any[];
  label?: string;
  labelColor?: string;
  labelSize?: number;
  error?: string | null;
  errorMessageColor?: string;
  errorMessageSize?: number;
  keyValue: string;
  labelValue: string;
  data: any[];
  multiSelect?: boolean;
  containerStyle?: ViewStyle;
  optionDisplayView?: ViewStyle;
  optionTextStyle?: TextStyle;
  onSelectValue: (data: any) => void;
}
