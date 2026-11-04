import React, { useState } from 'react';
import { Keyboard, TouchableOpacity, View } from 'react-native';
import { Text } from '~components';
import DatePicker from 'react-native-date-picker';
import { CalenderInputProps } from './types';
import { useTheme } from '~theme';
import createStyles from './styles';
import { useStyles } from '~hooks';

/**
 * Labeled date/time picker that displays a readonly text field and opens a
 * modal `react-native-date-picker` when pressed.
 *
 * Supports date or time selection, editable/disabled states, configurable
 * minimum and maximum dates, custom label, text, placeholder, border, and
 * error styling, as well as optional left and right icon slots.
 *
 * Dismisses the keyboard before opening the picker and provides inline error
 * messaging below the input when an error is present.
 *
 * @example
 * ```tsx
 * <CalenderInput
 *   label="Appointment"
 *   value={selectedDate}
 *   mode="date"
 *   minimumDate={new Date()}
 *   maximumDate={maxDate}
 *   onChange={setSelectedDate}
 *   error={errors.appointment?.message}
 * />
 * ```
 */

const CalenderInput = ({
  containerStyles = {},
  label,
  labelColor,
  labelSize = 15,
  editable = true,
  textFieldContainer = {},
  textColor,
  textSize = 15,
  textInputStyle = {},
  value,
  placeholder = 'Enter date',
  placeholderTextColor,
  mode = 'time',
  maximumDate,
  minimumDate,
  onChange,
  errorMessageColor,
  errorMessageSize = 12.5,
  error,
  borderColor,
  rightIcon = null,
  leftIcon = null,
}: CalenderInputProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const [isVisible, setIsVisible] = useState(false);

  const labelColorTheme = labelColor || theme.labelTextColor;

  const textColorTheme = textColor || theme.inputTextColor;

  const placeholderTextColorTheme =
    placeholderTextColor || theme.placeholderTextColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  const borderColorTheme = borderColor ?? theme.inputBorderColor;

  return (
    <View style={containerStyles}>
      {label && (
        <Text variant="subTitle" color={labelColorTheme} size={labelSize}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={1}
        style={[
          styles.textFieldContainer,
          {
            borderColor: error ? errorMessageColorTheme : borderColorTheme,
          },
          textFieldContainer,
        ]}
        disabled={!editable}
        onPress={() => {
          Keyboard.dismiss();
          setIsVisible(true);
        }}>
        {rightIcon}
        <Text
          variant="bodyRegular"
          color={value ? textColorTheme : placeholderTextColorTheme}
          size={textSize}
          style={textInputStyle}
          containerStyle={{ flex: 1 }}>
          {value ?? placeholder}
        </Text>
        {leftIcon}
      </TouchableOpacity>
      {isVisible && (
        <DatePicker
          style={{ position: 'absolute' }}
          date={new Date()}
          mode={mode}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onDateChange={val => onChange(val)}
          modal
          open={isVisible}
          onConfirm={val => {
            onChange(val);
            setIsVisible(false);
          }}
          onCancel={() => setIsVisible(false)}
        />
      )}
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

export default CalenderInput;
