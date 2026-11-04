import { StyleSheet } from 'react-native';
import { width } from '~utils';

const styles = StyleSheet.create({
  optionView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchMainView: {
    borderRadius: width(100),
  },
});

export default styles;
