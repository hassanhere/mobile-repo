import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { CustomTextProps } from './types';
import { AppFonts, TextVariants, useTheme } from '~theme';
import { textSize } from '~utils';

/**
 * Typography helper that maps `variant` names to shared styles while allowing
 * runtime overrides for size, color, family, and container press handling.
 *
 * Wraps `Text` in a `Pressable` so content can be tappable without extra
 * wrappers, but stays inert when no `onPress` is provided.
 *
 * @example
 * ```tsx
 * <CustomText variant="bodyMedium" onPress={() => console.log('tap')}>
 *   View details
 * </CustomText>
 * ```
 */
const CustomText = (props: CustomTextProps) => {
  const {
    variant = 'smallText',
    children,
    size,
    color,
    style,
    fontFamily,
    onPress,
    containerStyle,
    ...res
  } = props;

  const { theme } = useTheme();

  const variantStyles = TextVariants[variant];

  const styles = StyleSheet.flatten([
    variantStyles,
    { color: color ?? theme.generalTextColor },
    fontFamily ? { fontFamily: AppFonts[fontFamily] } : null,
    size ? { fontSize: textSize(size) } : null,
    style,
  ]);

  return (
    <Pressable disabled={!onPress} onPress={onPress} style={containerStyle}>
      <Text style={styles} {...res}>
        {children}
      </Text>
    </Pressable>
  );
};

export default CustomText;
