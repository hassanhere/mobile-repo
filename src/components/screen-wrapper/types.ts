import { ReactNode, RefObject } from 'react';
import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollViewRef } from 'react-native-keyboard-controller';

export interface ScreenWrapperProps {
  children?: ReactNode;
  scrollViewRef?: RefObject<KeyboardAwareScrollViewRef | null>;
  barStyle?: 'default' | 'dark-content' | 'light-content';
  statusBarColor?: string;
  translucent?: boolean;
  scrollEnabled?: boolean;
  backgroundImage?: ImageSourcePropType;
  containerViewStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showheaderUnScrollable?: boolean;
  showfooterUnScrollable?: boolean;
  headerUnScrollable?: () => ReactNode;
  footerUnScrollable?: () => ReactNode;
  backgroundColor?: string;
  showsVerticalScrollIndicator?: boolean;
  imageStyle?: ImageStyle;
  imageResizeMode?: ImageResizeMode;
  refreshing?: boolean;
  enablePullToRefresh?: boolean;
  isLoading?: boolean;
  showHeaderDuringLoading?: boolean;
  showFooterDuringLoading?: boolean;
  LoadingComponent?: () => ReactNode;
  onRefresh?: () => void;
  onContentSizeChange?: (contentWidth: number, contentHeight: number) => void;
}
