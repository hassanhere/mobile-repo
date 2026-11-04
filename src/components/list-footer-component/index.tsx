import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from '~components';
import styles from './styles';
import { ListFooterComponentProps } from './types';
import { useTheme } from '~theme';

/**
 * Reusable footer component for `FlatList`/`SectionList` that displays
 * loading, error, empty, or custom footer content in a consistent layout.
 *
 * Prioritizes the provided states in the following order: loading, error,
 * empty, and custom footer text. When none of these states apply, the footer
 * renders without content.
 *
 * Supports customizable error and empty messages, optional footer text,
 * container styling, and text styling. The loading indicator uses the active
 * theme's activity indicator color.
 *
 * - `loader`: displays a loading indicator when true.
 * - `error`: displays the configured error message when true and loading is false.
 * - `errorText`: custom message displayed for the error state.
 * - `empty`: displays the configured empty message when true and no error or
 *   loading state is active.
 * - `emptyText`: custom message displayed for the empty state.
 * - `footerText`: optional custom text displayed when no other state is active.
 * - `containerStyle`: custom styles applied to the footer container.
 * - `textStyle`: custom styles applied to displayed text.
 *
 * @example
 * ```tsx
 * <FlatList
 *   data={items}
 *   ListFooterComponent={
 *     <ListFooterComponent
 *       loader={isFetchingMore}
 *       error={Boolean(fetchError)}
 *       empty={!items.length && !isFetchingMore}
 *       footerText="You've reached the end"
 *     />
 *   }
 * />
 * ```
 */

const ListFooterComponent = ({
  loader = false,
  error = false,
  errorText = 'An Error Occurred While Loading Data',
  empty = false,
  emptyText = 'No Data Found',
  footerText = '',
  containerStyle,
  textStyle,
}: ListFooterComponentProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.footer, containerStyle]}>
      {loader ? (
        <ActivityIndicator
          size="large"
          color={theme.generalActivityIndicatorColor}
        />
      ) : error ? (
        <Text variant="smallText" style={[{ textAlign: 'center' }, textStyle]}>
          {errorText}
        </Text>
      ) : empty ? (
        <Text variant="smallText" style={[{ textAlign: 'center' }, textStyle]}>
          {emptyText}
        </Text>
      ) : footerText ? (
        <Text variant="smallText" style={[{ textAlign: 'center' }, textStyle]}>
          {footerText}
        </Text>
      ) : null}
    </View>
  );
};

export default ListFooterComponent;
