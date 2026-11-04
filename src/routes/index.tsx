import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '~redux/slices/user';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './app-stack';
import AuthStack from './auth-stack';
import { Loader } from '~components';
import { addEventListener } from '@react-native-community/netinfo';
import { setIsInternetReachable } from '~redux/slices/config';
import { hideSplash } from 'react-native-splash-view';
import { Linking } from 'react-native';
import { navigationRef } from './navigation-ref';

const MainNavigator = () => {
  const isLogin = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    hideSplash();
    const unsubscribe = addEventListener(state => {
      dispatch(setIsInternetReachable(state.isInternetReachable));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Handle app opened from a killed state
    Linking.getInitialURL().then(url => {
      console.log('Linking url: ', url);
    });
    // Handle app opened while running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Linking url: ', url);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Loader />
      {isLogin ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
