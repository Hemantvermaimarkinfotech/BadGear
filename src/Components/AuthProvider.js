
import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState('');
  const [userID, setUserId] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  // Function to fetch user token and ID from AsyncStorage
  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) {
        const userData = JSON.parse(value);
        setUserId(userData);
        setUserToken(userData);
      }
    } catch (error) {
      console.log('Error retrieving user data:', error);
    }
  };

  // Function to fetch cart items from AsyncStorage
  const fetchCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem('cartItems');
      if (storedCartItems) {
        const parsedCartItems = JSON.parse(storedCartItems);
        setCartItems(parsedCartItems);
        setCartLength(parsedCartItems.length); // Update cartLength based on cartItems length
      }
    } catch (error) {
      console.log('Error fetching cart items from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getToken(); 
    fetchCartItems(); 
  }, []);

  // Function to update cart items and length
  const updateCartItems = async (newCartItems) => {
    try {
      setCartItems(newCartItems);
      setCartLength(newCartItems.length);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } catch (error) {
      console.log('Error updating cart items:', error);
    }
  };
 // Function to handle skip action
 const skipLogin = () => {
  setUserToken('dummy-token'); // Set a dummy token to indicate skip
  setUserId('dummy-id'); // Set a dummy ID to indicate skip
};
  return (
    <AuthContext.Provider
      value={{
        userID,
        userToken,
        setUserToken,
        cartItems,
        setCartItems: updateCartItems, // Expose updateCartItems as setCartItems
        cartLength,
        setCartLength,
        setUserId,
        skipLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };




