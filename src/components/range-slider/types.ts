import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface RangeSliderProps {
  variant?: 'single-slider' | 'double-slider';
  minValue?: number;
  maxValue: number;
  min?: number;
  max?: number;
  labelColor?: string;
  errorMessageColor?: string;
  containerStyle?: StyleProp<ViewStyle>;
  label?: string;
  labelSize?: number;
  errorMessageSize?: number;
  error?: string;
  rangeSliderContainerStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  fillTrackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  minTextLabel?: StyleProp<TextStyle>;
  maxTextLabel?: StyleProp<TextStyle>;
  onMinValueChange?: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}

export interface RangeSliderComponentProps {
  variant?: 'single-slider' | 'double-slider';
  min?: number;
  max?: number;
  minValue?: number;
  maxValue: number;
  rangeSliderContainerStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  fillTrackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  minTextLabel?: StyleProp<TextStyle>;
  maxTextLabel?: StyleProp<TextStyle>;
  onMinValueChange?: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}
