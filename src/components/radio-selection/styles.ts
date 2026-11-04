import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    optionDisplayView: {
      width: '100%',
      rowGap: verticalSpacing(5),
      marginVertical: verticalSpacing(2),
    },
    optionSubView: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: horizontalSpacing(8),
    },
    option: {
      width: horizontalSpacing(20),
      height: horizontalSpacing(20),
      borderRadius: horizontalSpacing(20) / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: theme.generalBorderColor,
    },
  });

export default createStyles;
