import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { height, width } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    methodSwitch: {
      flexDirection: 'row',
      borderRadius: width(5),
      padding: width(1),
      backgroundColor: theme.tabSwitchBackgroundColor,
    },
    methodButton: {
      flex: 1,
      paddingVertical: height(1.5),
      alignItems: 'center',
      borderRadius: width(4.5),
    },
  });

export default createStyles;
