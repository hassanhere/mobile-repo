import { Image } from 'react-native-image-crop-picker';

export interface PickedImageVideoType {
  uri: string;
  name?: string;
  type: string;
  path?: string;
}

export interface ImageVideoPickerProps {
  onFilesSelected: (image?: Image | PickedImageVideoType) => void;
  mediaType?: 'photo' | 'video' | 'any';
}

export interface ImageVideoPickerRef {
  show: () => void;
  hide: () => void;
  cleanTempImages: () => void;
}
