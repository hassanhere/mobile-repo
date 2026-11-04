import { StyleSheet } from 'react-native';
import { horizontalSpacing } from '~utils';

const styles = StyleSheet.create({
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: horizontalSpacing(10),
  },
});

export default styles;
