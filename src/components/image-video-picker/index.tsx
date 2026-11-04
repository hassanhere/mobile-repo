import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ModalWrapper, Text } from '~components';
import {
  ImageVideoPickerProps,
  ImageVideoPickerRef,
  PickedImageVideoType,
} from './types';
import createStyles from './styles';
import { useStyles } from '~hooks';
import { useTheme } from '~theme';

/**
 * Imperative media picker modal that allows users to capture photos/videos
 * using the camera or select media from the gallery via
 * `react-native-image-crop-picker`.
 *
 * Supports photo and video selection through the `mediaType` prop. Photos are
 * automatically opened in the cropper after being captured or selected, while
 * videos are returned directly without cropping.
 *
 * Exposes `show`, `hide`, and `cleanTempImages` methods through a ref, allowing
 * parent components to control the modal programmatically and clean temporary
 * image files created by `react-native-image-crop-picker`.
 *
 * - `mediaType`: determines whether the picker handles photos, videos, or both.
 * - `onFilesSelected`: callback invoked with the captured or selected media.
 * - `show()`: displays the media selection modal.
 * - `hide()`: hides the media selection modal.
 * - `cleanTempImages()`: removes temporary images created by the image picker.
 *
 * @example
 * ```tsx
 * const pickerRef = useRef<ImageVideoPickerRef>(null);
 *
 * <ImageVideoPicker
 *   ref={pickerRef}
 *   mediaType="photo"
 *   onFilesSelected={handleMedia}
 * />
 *
 * Open the picker
 * pickerRef.current?.show();
 *
 * Hide the picker
 * pickerRef.current?.hide();
 *
 * Clean temporary picker files
 * pickerRef.current?.cleanTempImages();
 * ```
 */

const ImageVideoPicker: React.ForwardRefRenderFunction<
  ImageVideoPickerRef,
  ImageVideoPickerProps
> = ({ onFilesSelected, mediaType = 'photo' }, ref) => {
  const styles = useStyles(createStyles);

  const { theme } = useTheme();

  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setIsVisible(true);
    },
    hide: () => {
      setIsVisible(false);
    },
    cleanTempImages: () => {
      ImagePicker.clean()
        .then(() => {
          console.log('removed all tmp images from tmp directory');
        })
        .catch(console.log);
    },
  }));

  const openPicker = (type: number) => {
    onClose();
    if (type === 0) {
      ImagePicker.openCamera({
        cropping: false,
        mediaType: mediaType,
        compressImageQuality: 1,
        compressVideoPreset: 'HighestQuality',
      }).then(resp => {
        if (mediaType === 'photo') {
          ImagePicker.openCropper({
            path: resp?.path,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 1,
            width: resp?.width,
            height: resp?.height,
          }).then(onFilesSelected);
        } else {
          onFilesSelected(resp);
        }
      });
    } else {
      ImagePicker.openPicker({
        cropping: false,
        mediaType: mediaType,
        compressImageQuality: 1,
        compressVideoPreset: 'HighestQuality',
      }).then(resp => {
        if (mediaType === 'photo') {
          ImagePicker.openCropper({
            path: resp?.path,
            mediaType: 'photo',
            cropping: true,
            compressImageQuality: 1,
            width: resp?.width,
            height: resp?.height,
          }).then(onFilesSelected);
        } else {
          onFilesSelected(resp);
        }
      });
    }
  };

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <ModalWrapper
      isVisible={isVisible}
      onClose={onClose}
      animationIn="fadeInUpBig"
      animationOut="fadeOutDownBig"
      animationInTiming={500}
      modalStyle={styles.modalStyle}
      showSwipeHandler={false}
      showHeader={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.modalContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => openPicker(0)}>
          <Text variant="bodyRegular">
            {mediaType === 'photo'
              ? 'Take Photo'
              : mediaType === 'video'
              ? 'Take Video'
              : 'Take Photo or Video'}
          </Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={() => openPicker(1)}>
          <Text variant="bodyRegular">Open Gallery</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.button}
          onPress={onClose}>
          <Text variant="bodyRegular" color={theme.errorMessageColor}>
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};

export default forwardRef<ImageVideoPickerRef, ImageVideoPickerProps>(
  ImageVideoPicker,
);
export type { ImageVideoPickerRef, PickedImageVideoType };
