import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { TextInput, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { Text } from '~components';
import { InputProps } from './types';
import { useTheme } from '~theme';
import createStyles from './styles';
import { useStyles } from '~hooks';

/**
 * Form-friendly text input integrated with `react-hook-form` through
 * `Controller`, providing a consistent labeled field with optional icons and
 * inline validation messaging.
 *
 * Supports forwarded `TextInput` refs, customizable placeholder and label
 * styling, keyboard and return-key configuration, text length limits,
 * multiline input, secure text entry, capitalization behavior, editability,
 * context menu visibility, and custom input/container styling.
 *
 * The input value and change/blur handling are managed by `react-hook-form`,
 * while additional `TextInput` properties can be passed through via
 * `restProps`.
 *
 * - `control`: `react-hook-form` control instance used to manage the field.
 * - `name`: field name registered with `react-hook-form`.
 * - `label`: optional label displayed above the input.
 * - `leftIcon`: optional content rendered before the text input.
 * - `rightIcon`: optional content rendered after the text input.
 * - `error`: optional validation error message displayed below the input.
 * - `editable`: controls whether the input can be edited.
 * - `secureTextEntry`: enables secure text entry for sensitive values.
 * - `multiline`: enables multiline text input.
 * - `contextMenuHidden`: controls whether the native text context menu is hidden.
 *
 * @example
 * ```tsx
 * <InputField
 *   control={control}
 *   name="email"
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 *   error={errors.email?.message}
 * />
 * ```
 */

const InputField: ForwardRefRenderFunction<TextInput, InputProps> = (
  {
    control,
    name,
    placeholder = 'Enter Value',
    placeholderTextColor,
    label,
    labelColor,
    labelSize = 15,
    error = null,
    errorMessageColor,
    errorMessageSize = 12.5,
    inputBorderColor,
    keyType,
    keyboardType,
    onSubmit,
    maxLength,
    rightIcon = null,
    leftIcon = null,
    textAlignVertical = 'center',
    multiline = false,
    editable = true,
    secureTextEntry = false,
    autoCapitalize = 'none',
    containerStyles = {},
    textInputStyle = {},
    textFieldContainer,
    contextMenuHidden = false,
    ...restProps
  },
  ref,
) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const labelColorTheme = labelColor || theme.labelTextColor;

  const placeholderTextColorTheme =
    placeholderTextColor || theme.placeholderTextColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  const inputBorderColorTheme = inputBorderColor ?? theme.inputBorderColor;

  return (
    <View style={containerStyles}>
      {label && (
        <Text variant="subTitle" color={labelColorTheme} size={labelSize}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.textFieldContainer,
          {
            borderColor: error ? errorMessageColorTheme : inputBorderColorTheme,
          },
          textFieldContainer,
        ]}>
        {leftIcon}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={ref}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColorTheme}
              autoCapitalize={autoCapitalize}
              editable={editable}
              value={value}
              keyboardType={keyboardType}
              onSubmitEditing={onSubmit}
              maxLength={maxLength}
              multiline={multiline}
              style={[styles.textInput, textInputStyle]}
              returnKeyType={keyType}
              onChangeText={onChange}
              textAlignVertical={multiline ? 'top' : textAlignVertical}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              contextMenuHidden={contextMenuHidden}
              {...restProps}
            />
          )}
        />
        {rightIcon}
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

export default forwardRef<TextInput, InputProps>(InputField);
