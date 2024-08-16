// import React, { useMemo } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
// import { useForm, Controller } from 'react-hook-form';
// import axios from 'react-native-axios';

// const LoginBottomSheet = ({ bottomSheetRef, closeSheet }) => {
//   const snapPoints = useMemo(() => ['50%'], []);

//   // Initialize react-hook-form
//   const { control, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post('https://bad-gear.com/wp-json/login-api/v1/userLogin', data);
//       console.log(response.data);
//       // Handle successful login (e.g., save token, navigate)
//       closeSheet();  // Close the bottom sheet on successful login
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Login Error', 'An error occurred while logging in.');
//     }
//   };

//   return (
//     <BottomSheet
//       ref={bottomSheetRef}
//       index={-1}
//       snapPoints={snapPoints}
//       enablePanDownToClose={true}
//       onClose={closeSheet}
//     >
//       <View style={styles.contentContainer}>
//         <Text style={styles.title}>Login</Text>
//         <Controller
//           control={control}
//           name="email"
//           rules={{
//             required: 'Email is required',
//             pattern: {
//               value: /^\S+@\S+$/,
//               message: 'Invalid email address',
//             },
//           }}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               placeholder="Email"
//               style={styles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//         <Controller
//           control={control}
//           name="password"
//           rules={{ required: 'Password is required' }}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               placeholder="Password"
//               secureTextEntry
//               style={styles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

//         <Button title="Login" onPress={handleSubmit(onSubmit)} />
//       </View>
//     </BottomSheet>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingLeft: 10,
//     borderRadius: 5,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

// export default LoginBottomSheet;

import React, { useMemo, useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useForm, Controller } from 'react-hook-form';
import axios from 'react-native-axios';
import { AuthContext } from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginBottomSheet = ({ bottomSheetRef, closeSheet }) => {
  // Set snap points to 100% to cover the full screen
  const snapPoints = useMemo(() => ['100%'], []);
  const { setUserToken, setUserId } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();


  const onSubmit = async (data) => {
    if (!data.email.trim() || !data.password.trim()) {
      Alert.alert('Alert', 'Please fill in all fields');
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post('https://bad-gear.com/wp-json/login-api/v1/userLogin', {
        email: data.email.trim(),
        password: data.password.trim(),
      });
  
      console.log('Response data:', response.data);
  
      if (response.data.status === "success") {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        
        // Update the Auth context with the user token and ID
        setUserToken(response.data.token);
        setUserId(response.data?.user_data?.data?.ID);
  
        // Close the bottom sheet on successful login
        closeSheet();
      } else {
        Alert.alert('Login Failed', response.data.errormsg || 'Incorrect email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.message.includes('Network Error')) {
        Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
      } else {
        Alert.alert('Unexpected Error', error.message || 'An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={closeSheet}
    >
      <View style={styles.contentContainer}>
        {/* Back Button */}
        <TouchableOpacity onPress={closeSheet} style={styles.backButton}>
          <Image source={require('../assets/next.png')} style={styles.backIcon} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Email"
                  style={styles.passwordInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#23233C"
                />
                <TouchableOpacity>
                  {/* Display email validation icon */}
                  {value && errors.email === undefined ? (
                    <Image source={require("../assets/accept.png")} style={{ height: 20, width: 20 }} />
                  ) : null}
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={[styles.passwordContainer, { marginTop: 30 }]}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  style={styles.passwordInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholderTextColor="#23233C"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Image
                    source={showPassword ? require('../assets/view.png') : require('../assets/eye.png')}
                    style={styles.eyeIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F10C18" />
          </View>
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
        )}
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
    backgroundColor:"#FBFCFC",
    // backgroundColor:"red",
 
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    height: 24,
    width: 24,
    tintColor: "#000000",
    resizeMode:"contain"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    paddingHorizontal: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  passwordInput: {
    flex: 1,
    fontSize: 12,
  },
  eyeIcon: {
    height: 24,
    width: 24,
    tintColor: "#DEDEDE",
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    width: '100%',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    width: '100%',
    marginTop: 30,
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    // marginBottom: 10,
    marginTop:5
  },
});

export default LoginBottomSheet;
