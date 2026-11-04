import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainViewContainer: {
      flex: 1,
    },
    screenBackgroundColor: {
      backgroundColor: theme.generalBackgroundColor,
    },
  });

export default createStyles;
