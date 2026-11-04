import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~components';
import { BackSvg } from '~assets';
import { horizontalSpacing } from '~utils';
import createStyles from './styles';
import { HeaderProps } from './types';
import { useStyles } from '~hooks';
import { useTheme } from '~theme';

/**
 * Configurable top app bar with optional leading/back control, centered title,
 * and trailing action slot.
 *
 * Supports a custom left icon, custom right icon, optional left control
 * visibility, customizable title typography, and custom container/title styles.
 *
 * When no custom left icon is provided, a themed back icon is rendered by
 * default. The left and right controls expose callbacks for handling their
 * respective press actions.
 *
 * @example
 * ```tsx
 * <AppHeader
 *   title="Details"
 *   onPressLeftIcon={navigation.goBack}
 *   rightIcon={<SettingsIcon />}
 *   onPressRightIcon={() => setShowSettings(true)}
 * />
 * ```
 */

const AppHeader = ({
  title = '',
  textVariant = 'appHeader',
  titleTextStyle = {},
  containerStyle = {},
  leftIcon,
  rightIcon = null,
  leftIconDisplay = true,
  onPressLeftIcon,
  onPressRightIcon,
}: HeaderProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIconDisplay ? (
        <TouchableOpacity
          onPress={onPressLeftIcon}
          style={styles.leftIconContainer}>
          {leftIcon ?? (
            <BackSvg
              color={theme.generalIconColor}
              width={horizontalSpacing(23)}
              height={horizontalSpacing(23)}
            />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIconContainer} />
      )}
      <View style={styles.titleContainer}>
        <Text variant={textVariant} style={titleTextStyle}>
          {title}
        </Text>
      </View>
      {rightIcon ? (
        <TouchableOpacity
          onPress={onPressRightIcon}
          style={styles.rightIconContainer}>
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIconContainer} />
      )}
    </View>
  );
};

export default AppHeader;
