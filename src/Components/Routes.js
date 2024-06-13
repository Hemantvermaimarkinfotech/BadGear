// import { StyleSheet } from 'react-native';
// import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from './AuthProvider';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from '../AppNavigator';
// import Splash from '../Normal/Splash';
// import AppScreenStack from './AppScreensStack';

// const Routes = () => {
//   const { userToken } = useContext(AuthContext);
// console.log("userToken",userToken)
//     return (
//       <NavigationContainer>
//         {userToken ? <AppScreenStack/> : <AppNavigator />}
//         {/* <AppScreenStack/> */}
//       </NavigationContainer>
//     );
//   }


// export default Routes;

// const styles = StyleSheet.create({});



import { StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from '../AppNavigator';
import AppScreenStack from './AppScreensStack';

const Routes = () => {
  
  const { userID, userToken } = useContext(AuthContext);

  // Extracting userID from userData


  console.log("userTokeRoutes:", userToken);
  console.log("userId:", userID);


  
  return (
    <NavigationContainer>
      {userToken && userID? <AppScreenStack /> : <AppNavigator />}
    </NavigationContainer>
  );
}

export default Routes;

const styles = StyleSheet.create({});

