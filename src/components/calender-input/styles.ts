import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    textFieldContainer: {
      backgroundColor: theme.inputBackGroundColor,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: verticalSpacing(4),
      paddingVertical: verticalSpacing(13),
      columnGap: horizontalSpacing(10),
      borderRadius: horizontalSpacing(14),
      paddingHorizontal: horizontalSpacing(10),
      borderWidth: 1,
    },
  });

export default createStyles;
