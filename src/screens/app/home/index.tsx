import React from 'react';
import { AppHeader, ScreenWrapper } from '~components';
import { HomeScreenProps } from './types';

const Home = ({ navigation, route }: HomeScreenProps) => {
  return (
    <ScreenWrapper
      headerUnScrollable={() => <AppHeader title={'Home'} />}></ScreenWrapper>
  );
};

export default Home;
