import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface OtpCodeInputProps {
  disabled?: boolean;
  onComplete: (text: string) => void;
  mainContainerStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelColor?: string;
  labelSize?: number;
  errorMessageColor?: string;
  errorMessageSize?: number;
  error?: string;
  inputBorderColor?: string;
  inputContainerStyle?: ViewStyle;
  pinCodeBoxContainerStyle?: ViewStyle;
  pinCodeTextStyle?: TextStyle;
  filledPinCodeBoxContainerStyle?: ViewStyle;
  focusedPinCodeBoxColor?: string;
}

export interface OtpCodeInputRef {
  clear: VoidFunction;
  focus: VoidFunction;
  blur: VoidFunction;
  setValue: (data: string) => void;
}
