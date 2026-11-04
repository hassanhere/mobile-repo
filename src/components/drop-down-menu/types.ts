import { ReactNode } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export interface DropDownMenuProps {
  value: any[];
  label?: string;
  labelColor?: string;
  labelSize?: number;
  error?: string | null;
  errorMessageColor?: string;
  errorMessageSize?: number;
  placeholderTextColor?: string;
  editable?: boolean;
  keyValue?: string;
  labelValue?: string;
  leftIcon?: ReactNode;
  data: any[];
  placeHolder?: string;
  multiSelect?: boolean;
  containerStyle?: ViewStyle;
  inputContainerStyle?: Omit<
    ViewStyle,
    | 'borderColor'
    | 'borderBlockColor'
    | 'borderBlockEndColor'
    | 'borderBlockStartColor'
    | 'borderBottomColor'
    | 'borderEndColor'
    | 'borderLeftColor'
    | 'borderRightColor'
    | 'borderStartColor'
    | 'borderTopColor'
  >;
  inputTextStyle?: TextStyle;
  dataTextStyle?: TextStyle;
  dropdownViewStyle?: Omit<
    ViewStyle,
    | 'borderColor'
    | 'borderBlockColor'
    | 'borderBlockEndColor'
    | 'borderBlockStartColor'
    | 'borderBottomColor'
    | 'borderEndColor'
    | 'borderLeftColor'
    | 'borderRightColor'
    | 'borderStartColor'
    | 'borderTopColor'
  >;
  dropDownIconColor?: string;
  valueTextColor?: string;
  showCrossIcon?: boolean;
  crossIconColor?: string;
  highlitedBorderColor?: string;
  textfieldBorderColor?: string;
  dropdownBorderColor?: string;
  onSelectValue: (data: any) => void;
}
