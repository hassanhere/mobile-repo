import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { AppColors, useTheme } from '~theme';
import createStyles from './styles';
import { useStyles } from '~hooks';

interface SkeletonLoaderProps {
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * SkeletonLoader
 *
 * Reusable shimmer skeleton loader that displays an animated placeholder while
 * content is loading.
 *
 * The shimmer continuously moves from left to right and back again across the
 * measured width of the container, using theme-aware styling for the shimmer
 * color.
 *
 * - `containerStyle`: optional custom styles applied to the loader container.
 *
 * @example
 * ```tsx
 * <SkeletonLoader containerStyle={{ height: 20, borderRadius: 8 }} />
 * ```
 *
 * Notes:
 * - The loader width is dynamically measured using `onLayout`.
 * - Shimmer color is derived from the active theme (`theme.skeletonColor`).
 * - The animation uses `Animated.sequence` and loops infinitely.
 */

const SkeletonLoader = ({ containerStyle }: SkeletonLoaderProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const [containerWidth, setContainerWidth] = useState(0);

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!containerWidth) return;

    const start = -0.3 * containerWidth;
    const end = 1.3 * containerWidth;

    const animate = () => {
      translateX.setValue(start);
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: end,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: start,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };

    animate();
  }, [containerWidth]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setContainerWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={[styles.container, containerStyle]} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ translateX }],
              experimental_backgroundImage: `linear-gradient(to right, ${AppColors.Transparent}, ${theme.skeletonColor}, ${AppColors.Transparent})`,
            },
          ]}
        />
      )}
    </View>
  );
};

export default SkeletonLoader;
