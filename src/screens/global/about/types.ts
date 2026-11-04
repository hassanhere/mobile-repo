import {
  RootStackNavigationProp,
  RootStackRouteProp,
  ScreenNames,
} from '~routes/routes';

export type AboutScreenProps = {
  navigation: RootStackNavigationProp<ScreenNames.ABOUT>;
  route: RootStackRouteProp<ScreenNames.ABOUT>;
};
