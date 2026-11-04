import React from 'react';
import { AppHeader, Text, ScreenWrapper } from '~components';
import { AboutScreenProps } from './types';

const About = ({ navigation, route }: AboutScreenProps) => {
  return (
    <ScreenWrapper>
      <AppHeader title={'About'} />
      <Text variant="appHeader">Welcome to the About screen!</Text>
    </ScreenWrapper>
  );
};

export default About;
