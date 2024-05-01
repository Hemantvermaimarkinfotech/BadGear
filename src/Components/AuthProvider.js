import React, {useState, createContext, useEffect, } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AuthContext = createContext();
const AuthProvider = ({children}) => {
  const [userToken, setUserToken] = useState('');
  const [userData, setUserData] = useState(null);
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
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export {AuthProvider, AuthContext};