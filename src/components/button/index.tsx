import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  ViewStyle,
  View,
} from 'react-native';
import { Text } from '~components';
import { ButtonProps } from './types';
import styles from './styles';
import { horizontalSpacing } from '~utils';
import { useTheme } from '~theme';

/**
 * Versatile button component with primary/secondary variants, optional
 * loading state, left/right icon slots, and customizable styling.
 *
 * Supports disabled states with theme-aware colors, optional shadows,
 * configurable text variants and colors, custom loader colors, and additional
 * TouchableOpacity properties.
 *
 * When loading, the button replaces its text and icons with an activity
 * indicator. When only one icon is provided, spacing is maintained on the
 * opposite side to keep the button content visually balanced.
 *
 * @example
 * ```tsx
 * <Button
 *   variant="secondary"
 *   leftIcon={<IconArrowBack />}
 *   rightIcon={<IconChevronRight />}
 *   loading={isSubmitting}
 *   onPress={handleSubmit}
 * >
 *   Continue
 * </Button>
 * ```
 */

const Button = ({
  onPress,
  children = null,
  variant = 'primary',
  withShadow = false,
  containerStyle = {},
  touchableOpacityProps,
  textStyle = {},
  buttonTextVariant = 'bodyMedium',
  disabled = false,
  loaderColor,
  disabledTextColor,
  rightIcon,
  leftIcon,
  buttonTextColor,
  loading,
}: ButtonProps) => {
  const { theme } = useTheme();

  const textColor = disabled
    ? disabledTextColor || theme.disabledButtonTextColor
    : buttonTextColor || theme.buttonTextColor;

  const containerStyles = useMemo(() => {
    const baseStyles: ViewStyle[] = [
      styles.container,
      {
        justifyContent: rightIcon || leftIcon ? 'space-between' : 'center',
      },
    ];
    if (disabled) {
      baseStyles.push({ backgroundColor: theme.disabledButtonBackgroundColor });
    } else if (variant === 'primary') {
      baseStyles.push({ backgroundColor: theme.primaryBackgroundColor });
    } else {
      baseStyles.push({ backgroundColor: theme.secondaryBackgroundColor });
    }
    if (withShadow) {
      baseStyles.push(styles.shadow);
    }
    if (containerStyle) {
      baseStyles.push(containerStyle);
    }
    return baseStyles;
  }, [
    variant,
    withShadow,
    disabled,
    rightIcon,
    leftIcon,
    containerStyle,
    theme,
  ]);

  return (
    <TouchableOpacity
      style={containerStyles}
      onPress={onPress}
      disabled={disabled}
      {...touchableOpacityProps}>
      {!loading && leftIcon}
      {rightIcon && !leftIcon && (
        <View style={{ width: horizontalSpacing(20) }} />
      )}
      {loading ? (
        <ActivityIndicator
          size="small"
          color={loaderColor || theme.buttonTextColor}
        />
      ) : (
        <Text variant={buttonTextVariant} color={textColor} style={textStyle}>
          {children}
        </Text>
      )}
      {!loading && rightIcon}
      {leftIcon && !rightIcon && (
        <View style={{ width: horizontalSpacing(20) }} />
      )}
    </TouchableOpacity>
  );
};

export default Button;
