import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, textSize, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    containerStyle: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginVertical: verticalSpacing(4),
    },
    pinCodeContainer: {
      width: horizontalSpacing(52),
      height: verticalSpacing(52),
      borderRadius: horizontalSpacing(15),
      backgroundColor: theme.inputBackGroundColor,
    },
    pinCodeTextStyle: {
      fontSize: textSize(20),
      fontWeight: 'bold',
      color: theme.inputTextColor,
    },
  });

export default createStyles;
