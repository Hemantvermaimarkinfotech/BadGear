// hooks/useAuth.js
// hooks/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';

export const useAuth = () => {
  const context = useContext(AuthContext);

  // Ensure context is not undefined and return userToken
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { userToken } = context;
  
  // Optionally log userToken for debugging
  console.log("userToken", userToken);

  return userToken;
};
