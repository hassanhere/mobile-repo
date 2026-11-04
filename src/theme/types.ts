import { TextStyle } from 'react-native';

export interface AppTheme {
  shadowCardShadowColor: string;
  generalActivityIndicatorColor: string;
  labelTextColor: string;
  inputTextColor: string;
  disabledButtonTextColor: string;
  disabledButtonBackgroundColor: string;
  appHeaderBackgroundColor: string;
  avatarEditButtonBackgroundColor: string;
  blackColor: string;
  whiteColor: string;
  generalTextColor: string;
  generalIconColor: string;
  generalBackgroundColor: string;
  generalBlackBackgroundColor: string;
  generalModalBackgroundColor: string;
  generalModalSwipeHandlerColor: string;
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  placeholderTextColor: string;
  errorMessageColor: string;
  inputBorderColor: string;
  networkMessageBackgroundColor: string;
  generalBorderColor: string;
  inputBackGroundColor: string;
  focusedPinCodeBoxColor: string;
  dropDownHighlitedBorderColor: string;
  skeletonColor: string;
  skeletonBackgroundColor: string;
  buttonTextColor: string;
  networkMessageTextColor: string;
  switchEnabledTrackColor: string;
  switchDisabledTrackColor: string;
  switchEnabledThumbColor: string;
  switchDisabledThumbColor: string;
  tabSwitchBackgroundColor: string;
  tabSwitchSelectedBackgroundColor: string;
  tabSwitchTextColor: string;
  tabSwitchSelectedTextColor: string;
  imageVideoPickerDividingLineColor: string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppColorsTypes {
  White: string;
  Black: string;
  Red: string;
  Transparent: string;
  Grey: string;
  LightGrey: string;
  DarkGrey: string;
  Primary: string;
  Secondary: string;
  Warning: string;
  whiteGrey: string;
  white50: string;
  DarkBlue: string;
}

export type AppColorsNames = keyof AppColorsTypes;

export type AppFontsTypes = {
  [P in FontNames]: FontValues[P];
};

export type FontNames =
  | 'thin'
  | 'thinItalic'
  | 'extraLight'
  | 'extraLightItalic'
  | 'light'
  | 'lightItalic'
  | 'regular'
  | 'regularItalic'
  | 'medium'
  | 'mediumItalic'
  | 'semiBold'
  | 'semiBoldItalic'
  | 'bold'
  | 'boldItalic'
  | 'extraBold'
  | 'extraBoldItalic'
  | 'giant'
  | 'giantItalic';

type FontValues = {
  thin: 'RobotoCondensed-Thin';
  thinItalic: 'RobotoCondensed-ThinItalic';
  extraLight: 'RobotoCondensed-ExtraLight';
  extraLightItalic: 'RobotoCondensed-ExtraLightItalic';
  light: 'RobotoCondensed-Light';
  lightItalic: 'RobotoCondensed-LightItalic';
  regular: 'RobotoCondensed-Regular';
  regularItalic: 'RobotoCondensed-Italic';
  medium: 'RobotoCondensed-Medium';
  mediumItalic: 'RobotoCondensed-MediumItalic';
  semiBold: 'RobotoCondensed-SemiBold';
  semiBoldItalic: 'RobotoCondensed-SemiBoldItalic';
  bold: 'RobotoCondensed-Bold';
  boldItalic: 'RobotoCondensed-BoldItalic';
  extraBold: 'RobotoCondensed-ExtraBold';
  extraBoldItalic: 'RobotoCondensed-ExtraBoldItalic';
  giant: 'RobotoCondensed-Black';
  giantItalic: 'RobotoCondensed-BlackItalic';
};

export interface TextVariantsTypes {
  appHeader: TextStyle;
  header: TextStyle;
  title: TextStyle;
  subTitle: TextStyle;
  bodyMedium: TextStyle;
  bodyRegular: TextStyle;
  bodySemiBold: TextStyle;
  bodyBold: TextStyle;
  smallText: TextStyle;
  miniText: TextStyle;
}

export type TextVariant = keyof TextVariantsTypes;
