import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~components';
import TabSwitchProps from './types';
import { useTheme } from '~theme';
import { useStyles } from '~hooks';
import createStyles from './styles';

/**
 * Themed tab switcher that renders a row of selectable tabs and visually
 * highlights the currently selected tab.
 *
 * - `tabData`: array of tab labels to render.
 * - `selectedTab`: value of the currently selected tab.
 * - `setSelectedTab`: callback invoked with the selected tab value when a tab
 *   is pressed.
 * - `containerStyle`: optional style override for the tab row container.
 * - `tabStyle`: optional style override applied to each tab button.
 * - `tabTextStyle`: optional style override applied to each tab label.
 *
 * @example
 * ```tsx
 * <TabSwitch
 *   tabData={['Details', 'Reviews']}
 *   selectedTab={selectedTab}
 *   setSelectedTab={setSelectedTab}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TabSwitch
 *   tabData={['All', 'Active', 'Completed']}
 *   selectedTab={selectedTab}
 *   setSelectedTab={setSelectedTab}
 *   containerStyle={{ marginVertical: 12 }}
 *   tabStyle={{ paddingHorizontal: 20 }}
 * />
 * ```
 */

const TabSwitch = ({
  tabData,
  selectedTab,
  setSelectedTab,
  containerStyle,
  tabStyle,
  tabTextStyle,
}: TabSwitchProps) => {
  const { theme } = useTheme();

  const styles = useStyles(createStyles);

  return (
    <View style={[styles.methodSwitch, containerStyle]}>
      {tabData?.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.methodButton,
            tab === selectedTab && {
              backgroundColor: theme.tabSwitchSelectedBackgroundColor,
            },
            tabStyle,
          ]}
          onPress={() => setSelectedTab(tab)}>
          <Text
            variant="bodyMedium"
            color={theme.tabSwitchSelectedTextColor}
            style={tabTextStyle}>
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TabSwitch;
