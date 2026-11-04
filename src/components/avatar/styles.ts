import { StyleSheet } from 'react-native';
import { AppTheme } from '~theme';
import { horizontalSpacing, width } from '~utils';

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    containerStyle: {
      width: width(20),
      height: width(20),
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: horizontalSpacing(50),
    },
    editButton: {
      position: 'absolute',
      bottom: 0,
      right: -horizontalSpacing(10),
      borderRadius: horizontalSpacing(20),
      padding: horizontalSpacing(3),
      backgroundColor: theme.avatarEditButtonBackgroundColor,
    },
  });

export default createStyles;
