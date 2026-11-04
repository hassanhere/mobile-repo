import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { height, verticalSpacing, width } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: width(100),
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      backgroundColor: theme.appHeaderBackgroundColor,
    },
    leftIconContainer: {
      width: width(10),
      paddingVertical: verticalSpacing(8),
      alignItems: 'flex-end',
    },
    titleContainer: {
      width: width(80),
      alignItems: 'center',
    },
    rightIconContainer: {
      width: width(10),
      height: height(3),
    },
  });

export default createStyles;
