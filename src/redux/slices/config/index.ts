import { InitialConfigStateProps } from '../types';
import configSlice from './slice';

export const configSliceReducer = configSlice.reducer;
export const {
  setAppLoader,
  setUpdater,
  setIsInternetReachable,
  setTheme,
  setResetConfig,
} = configSlice.actions;
export const selectLoader = (state: { config: InitialConfigStateProps }) =>
  state.config.appLoader;
export const selectUpdater = (state: { config: InitialConfigStateProps }) =>
  state.config.updater;
export const selectIsInternetReachable = (state: {
  config: InitialConfigStateProps;
}) => state.config.isInternetReachable;
export const selectedMode = (state: { config: InitialConfigStateProps }) =>
  state.config.selectedMode;
