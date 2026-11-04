import AppColors from './app-colors';
import { AppTheme } from './types';

export const DarkTheme: AppTheme = {
  // General Color
  generalTextColor: AppColors.White,
  blackColor: AppColors.Black,
  whiteColor: AppColors.White,
  generalBackgroundColor: AppColors.DarkBlue,
  generalBlackBackgroundColor: AppColors.Black,
  generalBorderColor: AppColors.Secondary,

  // * General Modal Colors
  // General Modal Background Color
  generalModalBackgroundColor: AppColors.Primary,
  // General Modal Swipe Handler Color
  generalModalSwipeHandlerColor: AppColors.White,

  // App Header Background Color
  appHeaderBackgroundColor: AppColors.DarkBlue,

  // General Icon Color
  generalIconColor: AppColors.White,

  // Avatar Edit Button Background Color
  avatarEditButtonBackgroundColor: AppColors.DarkBlue,

  // * Button Colors
  // Disabled Button Text Color
  disabledButtonTextColor: AppColors.LightGrey,
  // Button Text Color
  buttonTextColor: AppColors.White,
  // Disabled Button Background Color
  disabledButtonBackgroundColor: AppColors.DarkGrey,

  // Primary Background Color
  primaryBackgroundColor: AppColors.Primary,

  // Secondary Background Color
  secondaryBackgroundColor: AppColors.Secondary,

  // * Input Colors
  // Label Text Color
  labelTextColor: AppColors.White,
  // Input Text Color
  inputTextColor: AppColors.White,
  // Placeholder Text Color
  placeholderTextColor: AppColors.DarkGrey,
  // Error Message Color
  errorMessageColor: AppColors.Red,
  // Input Border Color
  inputBorderColor: AppColors.Secondary,
  // Input BackGround Color
  inputBackGroundColor: AppColors.DarkBlue,

  // DropDown highlited border color
  dropDownHighlitedBorderColor: AppColors.White,

  // Activity Indicator Color
  generalActivityIndicatorColor: AppColors.White,

  // Focused Pin Code Box Color
  focusedPinCodeBoxColor: AppColors.Primary,

  // Shadow Card shadow color
  shadowCardShadowColor: AppColors.White,

  // * Skeleton Colors
  // Skeleton Background Color
  skeletonBackgroundColor: 'rgba(255,255,255,0.06)',
  // Skeleton Color
  skeletonColor: 'rgba(255,255,255,0.12)',

  // * Network Message Colors
  // Network Message Text Color
  networkMessageTextColor: AppColors.White,
  // Network Message Background Color
  networkMessageBackgroundColor: AppColors.Warning,

  // * Switch Colors
  // Switch Enabled Track Color
  switchEnabledTrackColor: AppColors.Secondary,
  // Switch Disabled Track Color
  switchDisabledTrackColor: AppColors.Grey,
  // Switch Enabled Thumb Color
  switchEnabledThumbColor: AppColors.White,
  // Switch Disabled Thumb Color
  switchDisabledThumbColor: AppColors.White,

  // * Tab Switch Colors
  // Tab Switch Background Color
  tabSwitchBackgroundColor: AppColors.Primary,
  // Tab Switch Selected Background Color
  tabSwitchSelectedBackgroundColor: AppColors.Secondary,
  // Tab Switch Text Color
  tabSwitchTextColor: AppColors.White,
  // Tab Switch Selected Text Color
  tabSwitchSelectedTextColor: AppColors.White,

  // Image Video Picker dividing line Color
  imageVideoPickerDividingLineColor: AppColors.Secondary,
};
