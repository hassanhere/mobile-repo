import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { height, horizontalSpacing, verticalSpacing } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    inputContainer: {
      backgroundColor: theme.inputBackGroundColor,
      height: verticalSpacing(48),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: horizontalSpacing(14),
      paddingHorizontal: horizontalSpacing(10),
      marginVertical: verticalSpacing(4),
    },
    dropDownView: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 1000,
      width: '100%',
      borderWidth: 1,
      borderRadius: horizontalSpacing(14),
      maxHeight: height(20),
      overflow: 'hidden',
      marginBottom: verticalSpacing(10),
      backgroundColor: theme.inputBackGroundColor,
    },
    ItemSeparatorComponent: {
      height: 1,
      backgroundColor: theme.placeholderTextColor,
    },
    dropDownItem: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: horizontalSpacing(10),
      paddingHorizontal: horizontalSpacing(10),
      height: verticalSpacing(48),
    },
  });

export default createStyles;
