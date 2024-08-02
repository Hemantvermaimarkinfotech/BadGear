// #This code is written by Hemant Verma

import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';
import AppScreenStack from './AppScreensStack';

const Routes = () => {
  
  const { userID, userToken } = useContext(AuthContext);

  // console.log("userTokeRoutes:", userToken);
  // console.log("userId:", userID);


  
  return (
    <NavigationContainer>
      {userToken && userID? <AppScreenStack /> : <AppNavigator />}
    </NavigationContainer>
  );
}

export default Routes;

const styles = StyleSheet.create({});

