import React, {useState, createContext, useEffect, } from 'react';
// import {Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);


//   const openLink = () => {
//     const url =
//       'https://api.whatsapp.com/send?phone=918346000000&text=Hey%20Sprinters%20I%20Need%20ID'; // Replace with your desired URL
//     Linking.openURL(url)
//       .then(() => {
//         console.log(`Opened ${url} successfully`);
//       })
//       .catch(error => {
//         console.error(`Error opening ${url}: ${error}`);
//       });
//   };
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        setUserToken(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          userData,
          setUserData,
          userToken,
          setUserToken,
        //   openLink
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export {AuthProvider, AuthContext};