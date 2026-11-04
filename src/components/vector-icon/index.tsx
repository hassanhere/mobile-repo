import React from 'react';
import { Pressable } from 'react-native';
import { VectorIconProps, VectorIcons } from './types';
import { horizontalSpacing } from '~utils';

/**
 * Simple wrapper for the app's multi-pack vector icons that normalizes sizing,
 * color, and optional press handling.
 *
 * Accepts an icon `type` to pick the correct library, scales size via the
 * design system width helper, and wraps the icon in a `Pressable` when
 * `onPress` is provided.
 */
const VectorIcon = ({
  type,
  name,
  color,
  size = 20,
  style,
  solid = false,
  onPress,
}: VectorIconProps) => {
  const Tag = VectorIcons[type];
  return (
    <>
      {type && name && (
        <Pressable disabled={!onPress} onPress={onPress}>
          <Tag
            solid={solid}
            name={name}
            size={horizontalSpacing(size)}
            color={color}
            style={style}
          />
        </Pressable>
      )}
    </>
  );
};

export default VectorIcon;
