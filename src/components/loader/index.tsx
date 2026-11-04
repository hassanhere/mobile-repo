import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text, ModalWrapper } from '~components';
import { useSelector } from 'react-redux';
import { selectLoader } from '~redux/slices/config';
import { useTheme } from '~theme';
import styles from './styles';

/**
 * App-wide loading overlay powered by Redux that displays a modal with a
 * themed activity indicator and "Loading" text whenever `selectLoader` is true.
 *
 * Uses `ModalWrapper` to present the loader above the application content and
 * block user interaction while a global operation is in progress.
 *
 * The loader state is managed centrally through Redux, making the component
 * suitable for application-wide operations such as API requests, app
 * initialization, or other asynchronous processes that require temporary
 * interaction blocking.
 */

const Loader = () => {
  const appLoader = useSelector(selectLoader);

  const { theme } = useTheme();

  return (
    <ModalWrapper
      animationIn={'lightSpeedIn'}
      animationOut={'lightSpeedOut'}
      animationInTiming={500}
      isVisible={appLoader}
      backdropOpacity={0.4}
      showSwipeHandler={false}
      showHeader={false}>
      <View style={styles.container}>
        <ActivityIndicator size="small" color={theme.generalIconColor} />
        <Text variant="subTitle">Loading</Text>
      </View>
    </ModalWrapper>
  );
};

export default Loader;
