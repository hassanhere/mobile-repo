import React from 'react';
import { Switch, View } from 'react-native';
import styles from './styles';
import { Text } from '~components';
import SwitchButtonProps from './types';
import { useTheme } from '~theme';

/**
 * Form-friendly boolean toggle that pairs a text label with a themed
 * `Switch`, useful for simple on/off settings.
 *
 * - `label`: text displayed alongside the switch.
 * - `enabled`: current boolean value of the switch.
 * - `onChangeSetting`: callback invoked with the new boolean value when the
 *   switch is toggled.
 * - `labelColor`: custom color for the label; defaults to the active theme's
 *   label text color.
 * - `labelSize`: font size of the label. Defaults to `15`.
 * - `labelTextStyle`: optional custom styles applied to the label.
 * - `containerStyle`: optional style applied to the outer container.
 *
 * @example
 * ```tsx
 * <SwitchButton
 *   label="Enable notifications"
 *   enabled={notificationsEnabled}
 *   onChangeSetting={setNotificationsEnabled}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <SwitchButton
 *   label="Dark mode"
 *   enabled={isDarkMode}
 *   labelColor={theme.labelTextColor}
 *   labelSize={16}
 *   containerStyle={{ marginVertical: 10 }}
 *   onChangeSetting={setIsDarkMode}
 * />
 * ```
 */

const SwitchButton = ({
  label,
  enabled,
  labelColor,
  labelSize = 15,
  labelTextStyle,
  containerStyle,
  onChangeSetting,
}: SwitchButtonProps) => {
  const { theme } = useTheme();

  const labelColorTheme = labelColor || theme.labelTextColor;

  return (
    <View style={[styles.optionView, containerStyle]}>
      <Text
        variant="bodyRegular"
        color={labelColorTheme}
        size={labelSize}
        style={labelTextStyle}>
        {label}
      </Text>
      <View
        style={[
          styles.switchMainView,
          {
            backgroundColor: enabled
              ? theme.switchEnabledTrackColor
              : theme.switchDisabledTrackColor,
          },
        ]}>
        <Switch
          onValueChange={onChangeSetting}
          value={enabled}
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
          trackColor={{
            false: theme.switchDisabledTrackColor,
            true: theme.switchEnabledTrackColor,
          }}
          thumbColor={theme.switchEnabledThumbColor}
        />
      </View>
    </View>
  );
};

export default SwitchButton;
