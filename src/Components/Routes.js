import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';
import Splash from '../Normal/Splash';
import AppScreenStack from './AppScreensStack';

const Routes = () => {
  const { userToken } = useContext(AuthContext);
  const [splash, setSplash] = useState(true);


    return (
      <NavigationContainer>
        {userToken ? <AppScreenStack/> : <AppNavigator />}
      </NavigationContainer>
    );
  }


export default Routes;

const styles = StyleSheet.create({});
