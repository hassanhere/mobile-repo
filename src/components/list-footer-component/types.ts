import { TextStyle, ViewStyle } from 'react-native';

export interface ListFooterComponentProps {
  loader?: boolean;
  error?: boolean;
  errorText?: string;
  empty?: boolean;
  emptyText?: string;
  footerText?: string;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}
