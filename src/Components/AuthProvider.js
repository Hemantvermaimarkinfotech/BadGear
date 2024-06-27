import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [userID, setUserId] = useState(null);
  const [cartLength, setCartLength] = useState(0);

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        setUserId(JSON.parse(value));
        setUserToken(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  

  return (
    <>
      <AuthContext.Provider
        value={{
          userID,
          userToken,
          setUserToken,
          cartLength,
          setCartLength,
          setUserId
        }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export { AuthProvider, AuthContext };
