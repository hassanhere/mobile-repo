import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import {
  Priority,
  ResizeMode,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';

export interface AvatarProps {
  imageUrl?: string;
  simpleImage?: ImageSourcePropType;
  imageStyle?: StyleProp<FastImageStyle>;
  resizeMode?: ResizeMode;
  priority?: Priority;
  containerStyle?: ViewStyle;
  editable?: boolean;
  onPress?: () => void;
}
