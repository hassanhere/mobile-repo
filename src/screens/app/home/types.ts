import { ICountry } from 'rn-international-phone-number';
import {
  RootStackNavigationProp,
  RootStackRouteProp,
  ScreenNames,
} from '~routes/routes';

export type HomeScreenProps = {
  navigation: RootStackNavigationProp<ScreenNames.HOME>;
  route: RootStackRouteProp<ScreenNames.HOME>;
};

export interface formValidationTypes {
  Title: string;
  pNumber: string;
  selectedCountry: ICountry;
}
