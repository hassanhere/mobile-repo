import React from 'react';
import { View } from 'react-native';
import { Text } from '~components';
import RangeSliderComponent from './range-slider';
import { RangeSliderProps } from './types';
import { useTheme } from '~theme';

/**
 * Form-friendly range slider that supports selecting either a single numeric
 * value or a numeric range within configurable `min` / `max` bounds.
 *
 * Supports two slider variants:
 * - `single-slider`: uses a single thumb to select the `maxValue`.
 * - `double-slider`: uses two thumbs to select a `minValue` and `maxValue`.
 *
 * Provides optional label and validation error messaging, customizable
 * slider track/fill/thumb styles, optional labels at the minimum and maximum
 * ends, and separate callbacks for minimum and maximum value changes.
 *
 * The component delegates slider interaction to `RangeSliderComponent` while
 * providing the surrounding form layout, labels, error handling, and
 * theme-aware colors.
 *
 * - `variant`: determines whether the slider uses one or two thumbs.
 * - `min`: minimum numeric bound of the slider.
 * - `max`: maximum numeric bound of the slider.
 * - `minValue`: current minimum value, primarily used by `double-slider`.
 * - `maxValue`: current maximum value, used by both slider variants.
 * - `onMinValueChange`: callback invoked when the minimum thumb value changes.
 * - `onMaxValueChange`: callback invoked when the maximum thumb value changes.
 * - `label`: optional label displayed above the slider.
 * - `error`: optional validation error message displayed below the slider.
 * - `minTextLabel`: optional text displayed at the minimum end of the slider.
 * - `maxTextLabel`: optional text displayed at the maximum end of the slider.
 * - `containerStyle`: custom styles for the outer component container.
 * - `rangeSliderContainerStyle`: custom styles for the slider container.
 * - `trackStyle`: custom styles for the slider track.
 * - `fillTrackStyle`: custom styles for the selected/fill portion of the track.
 * - `thumbStyle`: custom styles for the slider thumb(s).
 *
 * @example
 * Single value slider
 * ```tsx
 * <RangeSlider
 *   label="Distance"
 *   variant="single-slider"
 *   min={0}
 *   max={100}
 *   maxValue={distance}
 *   onMaxValueChange={setDistance}
 * />
 * ```
 *
 * @example
 * Range slider
 * ```tsx
 * <RangeSlider
 *   label="Price range"
 *   variant="double-slider"
 *   min={0}
 *   max={1000}
 *   minValue={price.min}
 *   maxValue={price.max}
 *   onMinValueChange={(value) =>
 *     setPrice(prev => ({ ...prev, min: value }))
 *   }
 *   onMaxValueChange={(value) =>
 *     setPrice(prev => ({ ...prev, max: value }))
 *   }
 * />
 * ```
 */

const RangeSlider = ({
  variant = 'single-slider',
  min = 0,
  max = 100,
  minValue = 0,
  maxValue = 100,
  labelColor,
  errorMessageColor,
  containerStyle,
  label,
  labelSize = 15,
  errorMessageSize = 12.5,
  error,
  rangeSliderContainerStyle,
  trackStyle,
  fillTrackStyle,
  thumbStyle,
  minTextLabel,
  maxTextLabel,
  onMinValueChange,
  onMaxValueChange,
}: RangeSliderProps) => {
  const { theme } = useTheme();

  const labelColorTheme = labelColor || theme.labelTextColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="subTitle" color={labelColorTheme} size={labelSize}>
          {label}
        </Text>
      )}
      <RangeSliderComponent
        variant={variant}
        min={min}
        max={max}
        minValue={minValue}
        maxValue={maxValue}
        rangeSliderContainerStyle={rangeSliderContainerStyle}
        trackStyle={trackStyle}
        fillTrackStyle={fillTrackStyle}
        thumbStyle={thumbStyle}
        minTextLabel={minTextLabel}
        maxTextLabel={maxTextLabel}
        onMinValueChange={onMinValueChange}
        onMaxValueChange={onMaxValueChange}
      />
      <Text
        variant="smallText"
        color={errorMessageColorTheme}
        size={errorMessageSize}
        style={{ alignSelf: 'flex-end' }}>
        {error && `* ${error}`}
      </Text>
    </View>
  );
};

export default RangeSlider;
