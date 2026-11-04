import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { selectIsInternetReachable } from '~redux/slices/config';
import { Text } from '~components';
import { WifiSvg } from '~assets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import createStyles from './styles';
import { useStyles } from '~hooks';
import { useTheme } from '~theme';

/**
 * Banner component that listens to connectivity state and shows a warning when
 * the device appears offline or has poor connectivity.
 *
 * Uses Redux selectors so it can live high in the tree and automatically
 * disappears once the network stabilizes.
 */
const SlowNetWorkMessage = () => {
  const isInternetReachable = useSelector(selectIsInternetReachable);

  const { top } = useSafeAreaInsets();

  const styles = useStyles(createStyles);

  const { theme } = useTheme();

  if (!isInternetReachable) {
    return (
      <View
        style={[
          styles.waitingMessage,
          {
            paddingTop: top,
          },
        ]}>
        <WifiSvg />
        <Text variant="bodyRegular" color={theme.networkMessageTextColor}>
          Poor connection detected. Please ensure a stable connection for
          optimal app performance
        </Text>
      </View>
    );
  }
};

export default SlowNetWorkMessage;
