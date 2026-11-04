import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export default interface TabSwitchProps {
  tabData: Array<string>;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
}
