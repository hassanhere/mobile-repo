import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenNames } from './routes';
import { About, Home } from '~screens';

const App = createStackNavigator();

const AppStack = () => {

  // useEffect(() => {
  //   if (isLoggedIn && !Socket.connected) {
  //     try {
  //       Socket.connect();
  //     } catch (error) {
  //       console.log('SOCKET CONNECTION ERROR...', error);
  //     }
  //   }
  // }, [isLoggedIn]);

  // useEffect(() => {
  //   Socket.on('connect', () => {
  //     console.log(`===== SOCKET CONNECTED ====== ${userData?._id}`);
  //     Socket.emit('join', userData?._id);
  //   });
  //   return () => {
  //     Socket.off('connect');
  //   };
  // }, [userData, isLoggedIn]);

  // useEffect(() => {
  //   Socket.on('connect_error', error => {
  //     console.error(
  //       `Socket connection error with user: ${userData?._id}`,
  //       error,
  //     );
  //   });
  //   return () => {
  //     Socket.off('connect_error');
  //   };
  // }, []);

  // useEffect(() => {
  //   Socket.on('disconnect', () => {
  //     console.log(`===== SOCKET DISCONNECTED ====== ${userData?._id}`);
  //   });
  //   return () => {
  //     Socket.off('disconnect');
  //   };
  // }, []);

  return (
    <App.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={{
        headerShown: false,
      }}>
      <App.Screen name={ScreenNames.HOME} component={Home} />
      <App.Screen name={ScreenNames.ABOUT} component={About} />
    </App.Navigator>
  );
};

export default AppStack;
