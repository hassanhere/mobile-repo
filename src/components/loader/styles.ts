import { StyleSheet } from 'react-native';
import { horizontalSpacing, verticalSpacing, width } from '~utils';

const styles = StyleSheet.create({
  container: {
    width: width(50),
    paddingVertical: verticalSpacing(20),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: horizontalSpacing(15),
    flexDirection: 'row',
    columnGap: horizontalSpacing(15),
  },
});

export default styles;
