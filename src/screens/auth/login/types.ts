import {
  RootStackNavigationProp,
  RootStackRouteProp,
  ScreenNames,
} from '~routes/routes';

export type LoginScreenProps = {
  navigation: RootStackNavigationProp<ScreenNames.LOGIN>;
  route: RootStackRouteProp<ScreenNames.LOGIN>;
};
