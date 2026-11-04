import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import createStyles from './styles';
import { useStyles } from '~hooks';

/**
 * Themed touchable card component that provides a consistent card surface with
 * theme-aware styling and shadow.
 *
 * The card can optionally behave as a pressable element. When `onPress` is not
 * provided, the card is disabled while still rendering its content normally.
 *
 * - `children`: content rendered inside the card.
 * - `onPress`: optional callback invoked when the card is pressed. The card is
 *   disabled when this prop is not provided.
 * - `activeOpacity`: opacity applied to the card during press feedback.
 *   Defaults to `1`.
 * - `containerStyle`: optional style override applied to the card container.
 *
 * @example
 * ```tsx
 * <ShadowCard onPress={handlePress}>
 *   <Text>Card content</Text>
 * </ShadowCard>
 * ```
 *
 * @example
 * ```tsx
 * <ShadowCard
 *   onPress={handlePress}
 *   activeOpacity={0.7}
 *   containerStyle={{ marginVertical: 12 }}
 * >
 *   <Text>Card content</Text>
 * </ShadowCard>
 * ```
 */

interface CardProps {
  children: React.ReactNode;
  activeOpacity?: number;
  onPress?: () => void;
  containerStyle?: ViewStyle;
}

const ShadowCard = ({
  children,
  containerStyle,
  activeOpacity = 1,
  onPress,
}: CardProps) => {
  const styles = useStyles(createStyles);

  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[styles.card, containerStyle]}>
      {children}
    </TouchableOpacity>
  );
};

export default ShadowCard;
