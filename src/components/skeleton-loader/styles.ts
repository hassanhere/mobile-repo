import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: verticalSpacing(20),
      borderRadius: horizontalSpacing(4),
      overflow: 'hidden',
      backgroundColor: theme.skeletonBackgroundColor,
    },
  });

export default createStyles;
