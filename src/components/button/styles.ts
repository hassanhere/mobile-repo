import { StyleSheet } from 'react-native';
import { horizontalSpacing, verticalSpacing } from '~utils';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: horizontalSpacing(10),
    paddingVertical: verticalSpacing(10),
    paddingHorizontal: horizontalSpacing(10),
    alignItems: 'center',
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default styles;
