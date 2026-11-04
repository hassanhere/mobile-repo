import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    card: {
      borderRadius: horizontalSpacing(14),
      paddingHorizontal: horizontalSpacing(20),
      paddingVertical: verticalSpacing(10),
      marginBottom: verticalSpacing(20),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      shadowColor: theme.shadowCardShadowColor,
      backgroundColor: theme.generalBackgroundColor,
    },
  });

export default createStyles;
