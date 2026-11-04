import type {
  KeyboardType,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface SearchInputProps
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  containerStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  textInputStyle?: TextStyle;
  editable?: boolean;
  keyboardType?: KeyboardType;
  maxLength?: number;
}
