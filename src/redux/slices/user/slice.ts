import { createSlice } from '@reduxjs/toolkit';
import { InitialUserStateProps } from '../types';

const initialState: InitialUserStateProps = {
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  userMeta: {
    _id: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload?.token;
      state.refreshToken = action.payload?.refreshToken;
    },
    setUserMeta: (state, action) => {
      state.userMeta = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    clearUserData: state => {
      state.token = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.userMeta = {
        _id: '',
      };
    },
  },
});

export default userSlice;
