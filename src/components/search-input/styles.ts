import { StyleSheet } from 'react-native';
import { AppFonts, AppTheme } from '~theme';
import { horizontalSpacing, textSize, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: verticalSpacing(2),
      paddingVertical: verticalSpacing(13),
      columnGap: horizontalSpacing(10),
      borderRadius: horizontalSpacing(14),
      paddingHorizontal: horizontalSpacing(10),
      borderWidth: 1,
      backgroundColor: theme.inputBackGroundColor,
      borderColor: theme.inputBorderColor,
    },
    textInput: {
      fontFamily: AppFonts.regular,
      fontSize: textSize(14),
      padding: 0,
      width: '93%',
      color: theme.inputTextColor,
    },
  });

export default createStyles;
