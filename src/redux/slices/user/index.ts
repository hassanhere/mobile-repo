import { InitialUserStateProps } from '../types';
import userSlice from './slice';

export const userSliceReducer = userSlice.reducer;
export const { setIsLoggedIn, setUserMeta, setToken, clearUserData } =
  userSlice.actions;
export const selectToken = (state: { user: InitialUserStateProps }) =>
  state.user.token;
export const selectIsLoggedIn = (state: { user: InitialUserStateProps }) =>
  state.user.isLoggedIn;
export const selectUserMeta = (state: { user: InitialUserStateProps }) =>
  state.user.userMeta;
