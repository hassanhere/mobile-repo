import { configureStore } from '@reduxjs/toolkit';
import { configSliceReducer } from './slices/config';
import { persistStore, persistReducer } from 'redux-persist';
import { userSliceReducer } from './slices/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true, // collapse logs in console
  diff: true, // show diff between prev and next state
  predicate: (getState, action) => {
    // Only log actions that affect user or beam slices
    return action.type.startsWith('user/') || action.type.startsWith('config/');
  },
  stateTransformer: (state: RootState) => ({
    user: state.user,
    config: state.config,
  }),
});

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['isLoggedIn', 'token', 'userMeta'],
};

// const configPersistConfig = {
//   key: 'config',
//   storage: AsyncStorage,
//   whitelist: ['selectedTheme', 'selectedMode'],
// };

const persistedUserSliceReducer = persistReducer(
  userPersistConfig,
  userSliceReducer,
);

// const persistedConfigSliceReducer = persistReducer(
//   configPersistConfig,
//   configSliceReducer,
// );

export const store = configureStore({
  reducer: {
    user: persistedUserSliceReducer,
    config: configSliceReducer, // Replace it with persistedConfigSliceReducer in production to persist the config states
    //RTK
    // [authApi.reducerPath]: authApi.reducer,    uncomment it when implementing auth rtk query
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      // authApi.middleware,
      ...(__DEV__ ? [logger] : []),
    ),
});

// setupListeners(store.dispatch); uncomment this code when implementing rtk query to achieve refetchOnMount and refetchOnReconnect behaviors
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
