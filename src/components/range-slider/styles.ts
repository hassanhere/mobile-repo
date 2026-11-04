import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    // Range Slider component style

    slider: {
      width: '100%',
      marginTop: verticalSpacing(2),
      height: verticalSpacing(28),
      justifyContent: 'center',
      alignSelf: 'center',
    },
    track: {
      position: 'absolute',
      height: verticalSpacing(8),
      borderRadius: horizontalSpacing(5),
      width: '100%',
      top: verticalSpacing(9),
      backgroundColor: theme.inputBackGroundColor,
    },
    fill: {
      position: 'absolute',
      height: verticalSpacing(8),
      borderRadius: horizontalSpacing(5),
      top: verticalSpacing(9),
      backgroundColor: theme.secondaryBackgroundColor,
    },
    // If the thumb size is updated in here then update the size in range slider component too, the variable is named THUMB_SIZE
    thumb: {
      position: 'absolute',
      width: horizontalSpacing(26),
      height: horizontalSpacing(26),
      borderRadius: horizontalSpacing(26) / 2,
      borderWidth: horizontalSpacing(3),
      top: 0,
      borderColor: theme.secondaryBackgroundColor,
      backgroundColor: theme.generalBackgroundColor,
    },
    rangeText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: verticalSpacing(2),
    },
  });

export default createStyles;
