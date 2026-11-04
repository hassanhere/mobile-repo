import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing, width } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    waitingMessage: {
      backgroundColor: theme.networkMessageBackgroundColor,
      position: 'absolute',
      top: 0,
      zIndex: 1,
      width: width(100),
      paddingHorizontal: horizontalSpacing(10),
      paddingVertical: verticalSpacing(10),
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: horizontalSpacing(10),
    },
  });

export default createStyles;
