import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { Text } from '~components';
import { CrossSvg, DownArrowSvg, TickSvg } from '~assets';
import { horizontalSpacing, verticalSpacing } from '~utils';
import { DropDownMenuProps } from './types';
import { useTheme } from '~theme';
import createStyles from './styles';
import { useStyles } from '~hooks';

/**
 * Form-friendly dropdown/select component that displays a selectable input
 * field with a popup list of options and supports both single- and
 * multi-select workflows.
 *
 * Supports custom labels, icons, placeholder and selected-value styling,
 * configurable borders, validation errors, and theme-aware colors.
 *
 * Selected values are displayed horizontally and can be cleared at once using
 * the clear icon. In multi-select mode, selected items remain in the dropdown
 * and can be toggled individually; in single-select mode, selecting an item
 * closes the dropdown automatically.
 *
 * - `value`: array containing the currently selected item(s).
 * - `data`: list of option objects to render in the dropdown.
 * - `keyValue`: key in each option used as its unique identifier.
 * - `labelValue`: key in each option used as the displayed text.
 * - `multiSelect`: enables multiple item selection when true.
 * - `editable`: controls whether the dropdown can be opened.
 * - `placeHolder`: text shown when no item is selected.
 * - `onSelectValue`: callback receiving the updated selected item array.
 *
 * @example
 * ```tsx
 * <DropDownMenu
 *   label="Assign to"
 *   data={users}
 *   keyValue="id"
 *   labelValue="name"
 *   value={selectedUsers}
 *   multiSelect
 *   onSelectValue={setSelectedUsers}
 * />
 * ```
 */

const DropDownMenu = ({
  value,
  label,
  labelColor,
  labelSize = 15,
  placeholderTextColor,
  error = null,
  errorMessageSize = 12.5,
  errorMessageColor,
  keyValue = 'value',
  labelValue = 'label',
  data,
  editable = true,
  leftIcon = null,
  placeHolder = 'Select an option',
  multiSelect = false,
  containerStyle,
  inputContainerStyle,
  inputTextStyle,
  dataTextStyle,
  dropdownViewStyle,
  dropDownIconColor,
  valueTextColor,
  crossIconColor,
  highlitedBorderColor,
  textfieldBorderColor,
  dropdownBorderColor,
  onSelectValue,
}: DropDownMenuProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  const [showDropDown, setShowDropDown] = useState(false);
  const [labelPosition, setLabelPosition] = useState(0);
  const [inputPosition, setInputPosition] = useState(0);

  const labelColorTheme = labelColor || theme.labelTextColor;

  const placeholderTextColorTheme =
    placeholderTextColor || theme.placeholderTextColor;

  const highlitedBorderColorTheme =
    highlitedBorderColor ?? theme.dropDownHighlitedBorderColor;

  const errorMessageColorTheme = errorMessageColor || theme.errorMessageColor;

  const textfieldBorderColorTheme =
    textfieldBorderColor ?? theme.generalBorderColor;

  const inputTextColorTheme = valueTextColor ?? theme.inputTextColor;

  const handleItemClick = (item: any) => {
    if (multiSelect) {
      if (value.map(i => i?.[keyValue])?.includes(item?.[keyValue])) {
        onSelectValue(value?.filter(i => i?.[keyValue] !== item?.[keyValue]));
        return;
      } else {
        onSelectValue([...value, item]);
      }
    } else {
      onSelectValue([item]);
      setShowDropDown(false);
    }
  };

  const RenderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dropDownItem}
      onPress={() => handleItemClick(item)}>
      <Text
        variant="smallText"
        style={dataTextStyle}
        numberOfLines={1}
        containerStyle={{ flex: 1 }}>
        {item?.[labelValue]}
      </Text>
      {value?.map(i => i?.[keyValue])?.includes(item?.[keyValue]) && (
        <TickSvg color={theme.generalIconColor} width={15} height={13} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={containerStyle}>
      {label && (
        <Text
          variant="subTitle"
          color={labelColorTheme}
          size={labelSize}
          onLayout={e => {
            const { height } = e?.nativeEvent?.layout ?? { height: 0 };
            setLabelPosition(prev => prev + height);
          }}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        disabled={!editable}
        onPress={() => setShowDropDown(!showDropDown)}
        activeOpacity={1}
        onLayout={e => {
          const { height } = e?.nativeEvent?.layout ?? { height: 0 };
          setInputPosition(prev => prev + height);
        }}
        style={[
          styles.inputContainer,
          {
            borderColor: showDropDown
              ? highlitedBorderColorTheme
              : error
              ? errorMessageColorTheme
              : textfieldBorderColorTheme,
          },
          inputContainerStyle,
        ]}>
        {leftIcon}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginLeft: leftIcon ? horizontalSpacing(8) : 0,
          }}>
          <Text
            variant="bodyRegular"
            color={
              value?.length > 0
                ? inputTextColorTheme
                : placeholderTextColorTheme
            }
            numberOfLines={1}
            style={inputTextStyle}>
            {value?.length > 0
              ? value?.map(item => item?.[labelValue])?.join(', ')
              : placeHolder}
          </Text>
        </ScrollView>
        {value?.length > 0 ? (
          <TouchableOpacity onPress={() => onSelectValue([])}>
            <CrossSvg
              width={horizontalSpacing(20)}
              height={horizontalSpacing(20)}
              color={crossIconColor ?? theme.generalIconColor}
            />
          </TouchableOpacity>
        ) : (
          <DownArrowSvg
            width={horizontalSpacing(30)}
            height={horizontalSpacing(30)}
            color={dropDownIconColor ?? theme.generalIconColor}
          />
        )}
      </TouchableOpacity>
      <Text
        variant="smallText"
        color={errorMessageColorTheme}
        size={errorMessageSize}
        style={{ alignSelf: 'flex-end' }}>
        {error && `* ${error}`}
      </Text>
      {showDropDown && (
        <View
          style={[
            styles.dropDownView,
            {
              top: labelPosition + inputPosition + verticalSpacing(2),
              borderColor: dropdownBorderColor ?? highlitedBorderColorTheme,
            },
            dropdownViewStyle,
          ]}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={RenderItem}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            ItemSeparatorComponent={() => (
              <View style={styles.ItemSeparatorComponent} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default DropDownMenu;
