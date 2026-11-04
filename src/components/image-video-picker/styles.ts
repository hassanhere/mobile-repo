import { StyleSheet } from 'react-native';
import { AppColors, AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modalStyle: {
      justifyContent: 'flex-end',
    },
    contentContainerStyle: {
      marginHorizontal: 0,
      paddingHorizontal: 0,
      paddingVertical: 0,
      borderRadius: 0,
      overflow: 'hidden',
      backgroundColor: AppColors.Transparent,
    },
    modalContainer: {
      marginBottom: verticalSpacing(20),
      marginHorizontal: horizontalSpacing(20),
      borderRadius: horizontalSpacing(20),
      borderWidth: 1,
      backgroundColor: theme.generalBackgroundColor,
      borderColor: theme.generalBorderColor,
    },
    button: {
      alignSelf: 'center',
      alignItems: 'center',
      paddingVertical: verticalSpacing(15),
    },
    line: {
      width: '100%',
      height: 1,
      backgroundColor: theme.imageVideoPickerDividingLineColor,
    },
  });

export default createStyles;
