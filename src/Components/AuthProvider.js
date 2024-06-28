// import React, { useState, createContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [userToken, setUserToken] = useState('');
//   const [userID, setUserId] = useState(null);
//   const [cartLength, setCartLength] = useState(0);

//   const getToken = async () => {
//     try {
//       const value = await AsyncStorage.getItem('userData');
//       if (value !== null) {
//         setUserId(JSON.parse(value));
//         setUserToken(JSON.parse(value));
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };

//   useEffect(() => {
//     getToken();
//   }, []);

  

//   return (
//     <>
//       <AuthContext.Provider
//         value={{
//           userID,
//           userToken,
//           setUserToken,
//           cartLength,
//           setCartLength,
//           setUserId
//         }}>
//         {children}
//       </AuthContext.Provider>
//     </>
//   );
// };

// export { AuthProvider, AuthContext };


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
      console.error('Error retrieving user data:', error);
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
      console.error('Error fetching cart items from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getToken(); // Fetch user token on component mount
    fetchCartItems(); // Fetch cart items on component mount
  }, []);

  // Function to update cart items and length
  const updateCartItems = async (newCartItems) => {
    try {
      setCartItems(newCartItems);
      setCartLength(newCartItems.length);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } catch (error) {
      console.error('Error updating cart items:', error);
    }
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

