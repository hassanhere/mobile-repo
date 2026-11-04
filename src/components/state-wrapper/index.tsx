import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styles from './styles';
import { Text } from '~components';
import { StateWrapperProps } from './types';

/**
 * Reusable wrapper that centralizes loading and error handling for child content.
 *
 * Shows either a default `ActivityIndicator` with optional loading text or a fully
 * custom loading component while `isLoading` is true. When `isError` is true it can
 * render a custom error component or a styled fallback message. In every other case
 * the wrapped children are rendered directly.
 *
 * @example
 * ```tsx
 * <StateWrapper
 *   isLoading={loading}
 *   loadingText="Loading details..."
 *   isError={!!error}
 *   errorText={error}
 * >
 *   <Content />
 * </StateWrapper>
 * ```
 */

const StateWrapper = ({
  isLoading,
  loadingText,
  showCustomLoadingComponent = false,
  loadingComponent,
  loaderColor,
  loaderSize = 'small',
  loadingTextVariant = 'bodyMedium',
  errorTextVariant = 'bodyMedium',
  isError,
  errorText = 'Error occurred while loading data',
  showCustomErrorComponent = false,
  errorComponent,
  children,
  containerStyle,
  loadingContainerStyle,
  loadingTextStyle,
  loadingTextContainerStyle,
  errorTextStyle,
  errorTextContainerStyle,
  errorContainerStyle,
}: StateWrapperProps) => {
  if (isLoading) {
    return (
      <View
        style={[
          containerStyle,
          !showCustomLoadingComponent && styles.loadingContainer,
          loadingContainerStyle,
        ]}>
        {showCustomLoadingComponent ? (
          loadingComponent
        ) : (
          <>
            <ActivityIndicator color={loaderColor} size={loaderSize} />
            {loadingText && (
              <Text
                variant={loadingTextVariant}
                style={loadingTextStyle}
                containerStyle={loadingTextContainerStyle}>
                {loadingText}
              </Text>
            )}
          </>
        )}
      </View>
    );
  } else if (isError) {
    return (
      <View style={[containerStyle, errorContainerStyle]}>
        {showCustomErrorComponent ? (
          errorComponent
        ) : (
          <Text
            variant={errorTextVariant}
            style={errorTextStyle}
            containerStyle={errorTextContainerStyle}>
            {errorText}
          </Text>
        )}
      </View>
    );
  } else return <View style={containerStyle}>{children}</View>;
};

export default StateWrapper;
