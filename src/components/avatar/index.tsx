import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Camera, Icons } from '~assets';
import { AvatarProps } from './types';
import { useTheme } from '~theme';
import { useStyles } from '~hooks';
import createStyles from './styles';

/**
 * Versatile avatar component for displaying remote or local profile images,
 * with automatic fallback handling and an optional editable action overlay.
 *
 * Uses FastImage for remote images to provide efficient image loading and
 * caching, while falling back to a configurable local placeholder when no
 * image URL is provided or the remote image fails to load.
 *
 * Supports custom image sizing/styling, resize modes, FastImage loading
 * priority, container styling, and an optional pressable edit state with a
 * themed camera icon overlay.
 *
 * @example
 * ```tsx
 * <Avatar
 *   imageUrl={user.avatar}
 *   editable
 *   onPress={openMediaPicker}
 *   containerStyle={{ alignSelf: 'center' }}
 * />
 * ```
 */

const Avatar = ({
  imageUrl,
  simpleImage = Icons.blankProfile,
  imageStyle,
  resizeMode = 'cover',
  priority = FastImage.priority.high,
  containerStyle,
  editable = false,
  onPress,
}: AvatarProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const [isError, setIsError] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.containerStyle, containerStyle]}
      disabled={!editable}
      onPress={onPress}>
      {isError || !imageUrl?.trim() ? (
        <Image
          source={simpleImage}
          style={[styles.imageStyle, imageStyle]}
          resizeMode={resizeMode}
        />
      ) : (
        <FastImage
          source={{ uri: imageUrl, priority: priority }}
          style={[styles.imageStyle, imageStyle]}
          resizeMode={resizeMode}
          onError={() => setIsError(true)}
        />
      )}
      {editable && (
        <View style={styles.editButton}>
          <Camera color={theme.generalIconColor} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
