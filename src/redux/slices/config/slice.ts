import { createSlice } from '@reduxjs/toolkit';
import { InitialConfigStateProps } from '../types';
import { SELECTED_MODE } from '~utils';

const initialState: InitialConfigStateProps = {
  appLoader: false,
  updater: false,
  isInternetReachable: true,
  selectedMode: SELECTED_MODE.LIGHT,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setAppLoader: (state, action) => {
      state.appLoader = action.payload;
    },
    setUpdater: (state, action) => {
      state.updater = action.payload;
    },
    setIsInternetReachable: (state, action) => {
      state.isInternetReachable = action.payload;
    },
    setTheme: (state, action) => {
      state.selectedMode = action.payload;
    },
    setResetConfig: state => {
      state.appLoader = false;
      state.updater = false;
      state.isInternetReachable = true;
      state.selectedMode = SELECTED_MODE.LIGHT;
    },
  },
});

export default configSlice;
