import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react';
import { TextInput, View } from 'react-native';
import { SearchSvg } from '~assets';
import { SearchInputProps } from './types';
import { useTheme } from '~theme';
import { useStyles } from '~hooks';
import createStyles from './styles';

/**
 * Search input component with a built-in search icon and internally managed
 * typing state.
 *
 * The component updates its local input value immediately as the user types,
 * while `onChangeText` is invoked only when editing ends. It supports a
 * forwarded `TextInput` ref, theme-aware placeholder and icon colors, custom
 * container/input styles, configurable input behavior, and standard
 * React Native `TextInput` props.
 *
 * The input defaults to a `Search...` placeholder, sentence capitalization,
 * and the `search` return key type. The initial displayed value is taken from
 * the provided `value` prop when the component mounts.
 *
 * - `value`: initial search text used to initialize the internal input state.
 * - `onChangeText`: callback invoked with the final text when editing ends.
 * - `placeholder`: placeholder text displayed when the input is empty.
 * - `placeholderTextColor`: custom placeholder and search icon color; falls
 *   back to the current theme's placeholder text color.
 * - `containerStyle`: custom styles applied to the outer container.
 * - `textInputStyle`: custom styles applied to the `TextInput`.
 * - `editable`: controls whether the input can be edited.
 * - `keyboardType`: specifies the keyboard type used by the input.
 * - `maxLength`: limits the maximum number of characters.
 * - `ref`: forwarded ref providing access to the underlying `TextInput`.
 * - `...rest`: additional React Native `TextInput` props.
 *
 * @example
 * ```tsx
 * const inputRef = useRef<TextInput>(null);
 *
 * <SearchInput
 *   ref={inputRef}
 *   value={search}
 *   placeholder="Search users..."
 *   onChangeText={setSearch}
 * />
 * ```
 *
 * @example
 * Custom styling and input configuration
 * ```tsx
 * <SearchInput
 *   value={search}
 *   placeholder="Search products..."
 *   maxLength={50}
 *   keyboardType="default"
 *   containerStyle={styles.searchContainer}
 *   textInputStyle={styles.searchInput}
 *   onChangeText={handleSearch}
 * />
 * ```
 *
 * @example
 * Notes:
 * 1. The component maintains its own typing state, so the displayed text is
 *    updated immediately through the internal `onChangeText` handler.
 * 2. The external `onChangeText` callback is triggered only when the user
 *    finishes editing through `onEndEditing`.
 * 3. Changes to the `value` prop after the component mounts do not automatically
 *    update the internally managed input value.
 */

const SearchInput: ForwardRefRenderFunction<TextInput, SearchInputProps> = (
  {
    value,
    onChangeText,
    placeholder = 'Search...',
    placeholderTextColor,
    containerStyle,
    textInputStyle,
    editable,
    keyboardType,
    maxLength,
    ...rest
  },
  ref,
) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const [searchQuery, setSearchQuery] = useState(value ?? '');

  const placeholderColor = placeholderTextColor || theme.placeholderTextColor;

  return (
    <View style={[styles.container, containerStyle]}>
      <SearchSvg color={placeholderColor} />
      <TextInput
        ref={ref}
        value={searchQuery}
        onEndEditing={e => {
          setSearchQuery(e.nativeEvent.text);
          onChangeText(e.nativeEvent.text);
        }}
        onChangeText={setSearchQuery}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        style={[styles.textInput, textInputStyle]}
        autoCapitalize="sentences"
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
        returnKeyType="search"
        {...rest}
      />
    </View>
  );
};

export default forwardRef<TextInput, SearchInputProps>(SearchInput);
