import { userMetaProps } from '~types/ApiResponses';
import { SELECTED_MODE } from '~utils';

export type InitialUserStateProps = {
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  userMeta: userMetaProps;
};

export type InitialConfigStateProps = {
  appLoader: boolean;
  updater: boolean;
  isInternetReachable: boolean;
  selectedMode: SELECTED_MODE;
};
