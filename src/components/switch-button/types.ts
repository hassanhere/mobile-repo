import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export default interface SwitchButtonProps {
  label: string;
  enabled: boolean;
  labelColor?: string;
  labelSize?: number;
  labelTextStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeSetting: VoidFunction;
}
