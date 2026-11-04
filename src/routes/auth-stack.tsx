import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from './routes';
import { Login, About } from '~screens';

const Auth = createStackNavigator();

const AuthStack = () => {
  return (
    <Auth.Navigator
      initialRouteName={ScreenNames.LOGIN}
      screenOptions={{
        headerShown: false,
      }}>
      <Auth.Screen name={ScreenNames.LOGIN} component={Login} />
      <Auth.Screen name={ScreenNames.ABOUT} component={About} />
    </Auth.Navigator>
  );
};

export default AuthStack;
