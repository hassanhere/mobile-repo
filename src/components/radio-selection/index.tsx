import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~components';
import { TickSvg } from '~assets';
import { RadioSelectionProps } from './types';
import { AppColors, useTheme } from '~theme';
import createStyles from './styles';
import { useStyles } from '~hooks';

/**
 * Form-friendly selection group that renders selectable options in a row or
 * grid and supports both single- and multi-selection.
 *
 * Displays each option with a selectable indicator and label, uses theme-aware
 * colors for selected and unselected states, and provides optional label and
 * validation error messaging.
 *
 * Supports custom option key/value fields, option container styling, option
 * text styling, and the ability to toggle multiple options independently.
 *
 * - `value`: array containing the currently selected item(s).
 * - `data`: list of option objects to render.
 * - `keyValue`: key in each option used as its unique identifier.
 * - `labelValue`: key in each option used as the displayed text.
 * - `multiSelect`: enables multiple option selection when true.
 * - `onSelectValue`: callback receiving the updated selected item array.
 * - `label`: optional label displayed above the options.
 * - `error`: optional validation error message displayed below the options.
 * - `containerStyle`: custom styles for the outer component container.
 * - `optionDisplayView`: custom styles for the options layout container.
 * - `optionTextStyle`: custom styles applied to each option's text.
 *
 * @example
 * ```tsx
 * <RadioSelection
 *   label="Gender"
 *   data={[
 *     { id: 'male', name: 'Male' },
 *     { id: 'female', name: 'Female' },
 *   ]}
 *   keyValue="id"
 *   labelValue="name"
 *   value={selected}
 *   multiSelect={false}
 *   onSelectValue={setSelected}
 * />
 * ```
 */

const RadioSelection = ({
  value,
  label,
  labelColor,
  labelSize = 15,
  error = null,
  errorMessageSize = 12.5,
  errorMessageColor,
  keyValue,
  labelValue,
  data,
  multiSelect = false,
  containerStyle,
  optionDisplayView,
  optionTextStyle,
  onSelectValue,
}: RadioSelectionProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const labelColorTheme = labelColor || theme.labelTextColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  const handleItemClick = (item: any) => {
    if (multiSelect) {
      if (value?.map(i => i?.[keyValue])?.includes(item?.[keyValue])) {
        onSelectValue(value?.filter(i => i?.[keyValue] !== item?.[keyValue]));
        return;
      } else {
        onSelectValue([...value, item]);
      }
    } else {
      onSelectValue([item]);
    }
  };

  const RenderCircleComponent = ({
    option,
    index,
  }: {
    option: any;
    index: number;
  }) => {
    const isSelected = value
      ?.map(i => i?.[keyValue])
      ?.includes(option?.[keyValue]);
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={index}
        style={styles.optionSubView}
        onPress={() => handleItemClick(option)}>
        <View
          style={[
            styles.option,
            {
              borderWidth: isSelected ? 0 : 2,
              backgroundColor: isSelected
                ? theme.secondaryBackgroundColor
                : theme.generalBackgroundColor,
            },
          ]}>
          {isSelected && (
            <TickSvg color={AppColors.White} width={12} height={10} />
          )}
        </View>
        <Text
          variant="bodyRegular"
          color={theme.blackColor}
          style={optionTextStyle}>
          {option?.[labelValue]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text variant="subTitle" color={labelColorTheme} size={labelSize}>
          {label}
        </Text>
      )}
      <View style={[styles.optionDisplayView, optionDisplayView]}>
        {data?.map((option, index) => (
          <RenderCircleComponent key={index} option={option} index={index} />
        ))}
      </View>
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

export default RadioSelection;
