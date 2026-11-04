import { StyleSheet } from 'react-native';
import { height, horizontalSpacing, textSize, verticalSpacing } from '~utils';
import { AppFonts, AppTheme } from '~theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    textFieldContainer: {
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
    },
    textInput: {
      flex: 1,
      maxHeight: height(20),
      fontFamily: AppFonts.regular,
      fontSize: textSize(15),
      padding: 0,
      color: theme.inputTextColor,
    },
  });

export default createStyles;
