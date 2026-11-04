import { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ModalProps } from 'react-native-modal';

export default interface ModalWrapperProps extends Partial<ModalProps> {
  restricted?: boolean;
  onClose?: () => void;
  onModalHide?: () => void;
  children: ReactNode;
  modalStyle?: ViewStyle;
  contentContainerStyle?: StyleProp<ViewStyle>;
  showHeader?: boolean;
  showCrossIcon?: boolean;
  title?: string;
  leftIcon?: ReactNode;
  swipable?: boolean;
  showSwipeHandler?: boolean;
  isKeyboardAvoidingEnabled?: boolean;
  scrollViewContentContainerStyle?: StyleProp<ViewStyle>;
  swipeHandlerStyle?: ViewStyle;
  titleTextStyle?: StyleProp<TextStyle>;
}
