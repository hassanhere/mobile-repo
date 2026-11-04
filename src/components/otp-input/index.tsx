import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import { useTheme } from '~theme';
import { useStyles } from '~hooks';
import createStyles from './styles';
import { Text } from '~components';
import { OtpCodeInputProps, OtpCodeInputRef } from './types';

/**
 * Form-friendly OTP input that renders a 6-digit numeric code field with
 * optional label and validation error messaging.
 *
 * Centralizes OTP styling, respects the active theme, supports disabled and
 * focused states, and invokes `onComplete` when all six digits have been
 * entered.
 *
 * Exposes imperative helpers through a ref for programmatic OTP input control,
 * including focusing, blurring, clearing, and setting the current OTP value.
 *
 * Supports customizable label, error, border, input container, PIN box, text,
 * filled-state, and focused-state styling.
 *
 * - `disabled`: disables interaction with the OTP input.
 * - `onComplete`: callback invoked with the completed 6-digit OTP.
 * - `label`: optional label displayed above the OTP input.
 * - `error`: optional validation error message displayed below the input.
 * - `inputBorderColor`: custom border color for the PIN boxes.
 * - `focusedPinCodeBoxColor`: custom border color for the focused PIN box.
 * - `inputContainerStyle`: custom styles for the OTP input container.
 * - `pinCodeBoxContainerStyle`: custom styles for individual PIN boxes.
 * - `pinCodeTextStyle`: custom styles for the OTP text.
 * - `filledPinCodeBoxContainerStyle`: custom styles applied to filled PIN boxes.
 * - `mainContainerStyle`: custom styles for the component's outer container.
 * - `clear()`: clears the current OTP value.
 * - `focus()`: focuses the OTP input.
 * - `blur()`: removes focus from the OTP input.
 * - `setValue(text)`: programmatically sets the OTP input value.
 *
 * @example
 * ```tsx
 * const otpRef = useRef<OtpCodeInputRef>(null);
 *
 * <OtpCodeInput
 *   ref={otpRef}
 *   label="Verification Code"
 *   disabled={isVerifying}
 *   error={otpError}
 *   onComplete={code => handleVerify(code)}
 * />
 *
 * Programmatically control the OTP input
 * otpRef.current?.focus();
 * otpRef.current?.setValue('123456');
 * ```
 */

const OtpCodeInput: React.ForwardRefRenderFunction<
  OtpCodeInputRef,
  OtpCodeInputProps
> = (
  {
    label,
    labelColor,
    labelSize = 15,
    errorMessageColor,
    errorMessageSize = 12.5,
    error,
    inputBorderColor,
    inputContainerStyle,
    pinCodeBoxContainerStyle,
    pinCodeTextStyle,
    filledPinCodeBoxContainerStyle,
    focusedPinCodeBoxColor,
    disabled = false,
    onComplete,
    mainContainerStyle,
  },
  ref,
) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const labelColorTheme = labelColor || theme.labelTextColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  const inputBorderColorTheme = inputBorderColor ?? theme.inputBorderColor;

  const focusedPinCodeBoxColorTheme =
    focusedPinCodeBoxColor ?? theme.focusedPinCodeBoxColor;

  const otpInputRef = useRef<OtpInputRef>(null);

  useImperativeHandle(ref, () => ({
    clear: () => otpInputRef?.current?.clear(),
    focus: () => otpInputRef?.current?.focus(),
    blur: () => otpInputRef?.current?.blur(),
    setValue: (text: string) => otpInputRef?.current?.setValue(text),
  }));

  return (
    <View style={mainContainerStyle}>
      {label && (
        <Text variant="subTitle" color={labelColorTheme} size={labelSize}>
          {label}
        </Text>
      )}
      <OtpInput
        ref={otpInputRef}
        disabled={disabled}
        numberOfDigits={6}
        focusColor={focusedPinCodeBoxColorTheme}
        autoFocus={true}
        hideStick={true}
        blurOnFilled={true}
        type="numeric"
        onFilled={onComplete}
        theme={{
          containerStyle: { ...styles.containerStyle, ...inputContainerStyle },
          pinCodeContainerStyle: {
            ...styles.pinCodeContainer,
            borderColor: error ? errorMessageColorTheme : inputBorderColorTheme,
            ...pinCodeBoxContainerStyle,
          },
          pinCodeTextStyle: { ...styles.pinCodeTextStyle, ...pinCodeTextStyle },
          filledPinCodeContainerStyle: filledPinCodeBoxContainerStyle,
        }}
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

export default forwardRef<OtpCodeInputRef, OtpCodeInputProps>(OtpCodeInput);
export type { OtpCodeInputRef, OtpCodeInputProps };
