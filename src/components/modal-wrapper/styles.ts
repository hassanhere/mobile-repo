import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    modal: {
      margin: 0,
      padding: 0,
      justifyContent: 'center',
    },
    contentContainer: {
      marginHorizontal: horizontalSpacing(15),
      paddingHorizontal: horizontalSpacing(10),
      paddingVertical: verticalSpacing(10),
      borderRadius: horizontalSpacing(10),
      overflow: 'hidden',
      backgroundColor: theme.generalModalBackgroundColor,
    },
    swipeHandle: {
      width: horizontalSpacing(80),
      height: verticalSpacing(3),
      borderRadius: horizontalSpacing(20),
      alignSelf: 'center',
      marginBottom: verticalSpacing(10),
      backgroundColor: theme.generalModalSwipeHandlerColor,
    },
    headerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

export default createStyles;
