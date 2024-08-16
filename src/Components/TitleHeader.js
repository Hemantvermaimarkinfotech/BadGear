// // #This code is written by Hemant Verma
// import React, {useEffect, useState,useContext} from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import {useNavigation} from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from './AuthProvider';


// const TitleHeader = ({title, cartLength}) => {
//   const navigation = useNavigation();
//   const [userData, setUserData] = useState(null);
//   const {userToken, setUserToken} = useContext(AuthContext);
//   console.log("userToken",userToken?.token)


//   const goBack = () => {
//     navigation.goBack();
//   };

//   const tokenUse = (typeof userToken === 'string' && userToken) ? userToken : 'dummy-token';
//   console.log("tokenUseeeeeee", tokenUse);
  
  
//   const isDummyToken = () => {
//     return tokenUse === 'dummy-token';
//   };

//   const handleNavigation = (page) => {
//     if (isDummyToken()) {
//       Alert.alert('Access Denied', 'You are not logged in.');
//     } else {
//       navigation.navigate(page);
//     }
//   };

//   return (
//     <View
//       style={{
//         borderBottomWidth: 1,
//         borderBottomColor: '#DDD',
//         height: 60,
//         opacity: 1,
//         justifyContent: 'center',
//       }}>
//       <View style={styles.mainheader}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity onPress={goBack}>
//             <Image
//               source={require('../assets/next.png')}
//               style={[styles.headericon, {height: 15, width: 25}]}
//             />
//           </TouchableOpacity>
//           <Text style={{color: '#000000', fontSize: 20, fontFamily: "Gilroy-SemiBold"}}>
//             {title && title.length > 14 ? title.substring(0, 14) + "..." : title}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             width: '35%',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <TouchableOpacity onPress={() => handleNavigation('WishList')}>
//             <Image
//               source={require('../assets/heart2.png')}
//               style={styles.headericon}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => navigation.navigate("Search")}>
//             <Image source={require('../assets/search.png')} style={{height: 25, width: 25, tintColor: "#000000"}}/>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleNavigation('Cart')}>
//             <Image
//               source={require('../assets/Cart.png')}
//               style={styles.headericon}
//             />
//             {/* <View style={{height: 18, width: 18, backgroundColor: "#F10C18", borderRadius: 8, position: "absolute", top: -8, right: 10, justifyContent: "center", alignItems: "center"}}>
//               <Text style={{color: "#fff", fontSize: 12}}>0</Text>
//             </View> */}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default TitleHeader;

// const styles = StyleSheet.create({
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   headericon: {
//     height: 20,
//     width: 20,
//     tintColor: '#000',
//     marginHorizontal: 18,
//     resizeMode: 'contain',
//   },
// });








// import React, { useMemo, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   TextInput,
//   Button,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from './AuthProvider';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from "react-native-axios"
// import { useForm, Controller } from 'react-hook-form';


// const TitleHeader = ({ title, cartLength }) => {
//   const navigation = useNavigation();
//   const { userToken } = useContext(AuthContext);
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [modalContent, setModalContent] = useState(null);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const tokenUse = userToken || 'dummy-token';

//   const isDummyToken = () => {
//     return tokenUse === 'dummy-token';
//   };

//   const handleNavigation = (page) => {
//     if (isDummyToken()) {
//       setModalVisible(true);
//     } else {
//       navigation.navigate(page);
//     }
//   };

//   const handleLogin = () => {
//     // Implement your login logic here
//     console.log('Logging in with:', username, password);
//     // After successful login, close the modal
//     setModalVisible(false);
//   };
//   // Set snap points to 100% to cover the full screen
//   const snapPoints = useMemo(() => ['100%'], []);
//   const { setUserToken, setUserId } = useContext(AuthContext);

//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { control, handleSubmit, formState: { errors } } = useForm();


//   const onSubmit = async (data) => {
//     if (!data.email.trim() || !data.password.trim()) {
//       Alert.alert('Alert', 'Please fill in all fields');
//       return;
//     }
  
//     setLoading(true);
//     try {
//       const response = await axios.post('https://bad-gear.com/wp-json/login-api/v1/userLogin', {
//         email: data.email.trim(),
//         password: data.password.trim(),
//       });
  
//       console.log('Response data:', response.data);
  
//       if (response.data.status === "success") {
//         // Store user data in AsyncStorage
//         await AsyncStorage.setItem('userData', JSON.stringify(response.data));
        
//         // Update the Auth context with the user token and ID
//         setUserToken(response.data.token);
//         setUserId(response.data?.user_data?.data?.ID);
  
//         // Close the bottom sheet on successful login
//         closeSheet();
//       } else {
//         Alert.alert('Login Failed', response.data.errormsg || 'Incorrect email or password');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
      
//       if (error.message.includes('Network Error')) {
//         Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
//       } else {
//         Alert.alert('Unexpected Error', error.message || 'An unexpected error occurred. Please try again later.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const openModal = (content) => {
//     setModalContent(content);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setModalContent(null);
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.mainheader}>
//           <View style={styles.headerLeft}>
//             <TouchableOpacity onPress={closeModal} style={{position:"absolute",zIndex:10}}>
//               <Image
//                 source={require('../assets/next.png')}
//                 style={[styles.headericon, { height: 15, width: 25 }]}
//               />
//             </TouchableOpacity>
//             <Text style={styles.titleText}>
//               {title && title.length > 14 ? title.substring(0, 14) + '...' : title}
//             </Text>
//           </View>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={() => openModal('WishList')}>
//               <Image
//                 source={require('../assets/heart2.png')}
//                 style={styles.headericon}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate('Search')}>
//               <Image
//                 source={require('../assets/search.png')}
//                 style={styles.searchIcon}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => openModal('Cart')}>
//               <Image
//                 source={require('../assets/Cart.png')}
//                 style={styles.headericon}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
      
//       {/* Login Modal */}
//       <Modal
//         animationType="slide"
//         transparent={false}
//         visible={isModalVisible}
//         onRequestClose={closeModal}
//       >
//           <View style={styles.contentContainer}>
//         {/* Back Button */}
//         <TouchableOpacity style={styles.backButton}>
//           <Image source={require('../assets/next.png')} style={styles.backIcon} />
//         </TouchableOpacity>
        
//         <Text style={styles.title}>Login</Text>
//         <View style={styles.inputContainer}>
//           <Controller
//             control={control}
//             name="email"
//             rules={{
//               required: 'Email is required',
//               pattern: {
//                 value: /^\S+@\S+$/,
//                 message: 'Invalid email address',
//               },
//             }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <View style={styles.passwordContainer}>
//                 <TextInput
//                   placeholder="Email"
//                   style={styles.passwordInput}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   placeholderTextColor="#23233C"
//                 />
//                 <TouchableOpacity>
//                   {/* Display email validation icon */}
//                   {value && errors.email === undefined ? (
//                     <Image source={require("../assets/accept.png")} style={{ height: 20, width: 20 }} />
//                   ) : null}
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

//           <Controller
//             control={control}
//             name="password"
//             rules={{ required: 'Password is required' }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <View style={[styles.passwordContainer, { marginTop: 30 }]}>
//                 <TextInput
//                   placeholder="Password"
//                   secureTextEntry={!showPassword}
//                   style={styles.passwordInput}
//                   onBlur={onBlur}
//                   onChangeText={onChange}
//                   value={value}
//                   placeholderTextColor="#23233C"
//                 />
//                 <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                   <Image
//                     source={showPassword ? require('../assets/view.png') : require('../assets/eye.png')}
//                     style={styles.eyeIcon}
//                   />
//                 </TouchableOpacity>
//               </View>
//             )}
//           />
//           {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
//         </View>

//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="large" color="#F10C18" />
//           </View>
//         ) : (
//           <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
//             <Text style={styles.buttonText}>Log in</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//       </Modal>
//     </>
//   );
// };

// export default TitleHeader;

// const styles = StyleSheet.create({
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor:"#FBFCFC",
//     // backgroundColor:"red",
 
//   },
//   backButton: {
//     position: 'absolute',
//     top: 30,
//     left: 20,
//     zIndex: 1,
//   },
//   backIcon: {
//     height: 24,
//     width: 24,
//     tintColor: "#000000",
//     resizeMode:"contain"
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     alignSelf: 'center',
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 55,
//     borderRadius: 5,
//     backgroundColor: '#FFFFFF',
//     elevation: 5,
//     paddingHorizontal: 20,
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   passwordInput: {
//     flex: 1,
//     fontSize: 12,
//   },
//   eyeIcon: {
//     height: 24,
//     width: 24,
//     tintColor: "#DEDEDE",
//   },
//   loginButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F10C18',
//     height: 55,
//     borderRadius: 10,
//     width: '100%',
//     marginTop: 30,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderColor: '#F10C18',
//     height: 55,
//     borderRadius: 10,
//     width: '100%',
//     marginTop: 30,
//     borderWidth: 1,
//   },
//   errorText: {
//     color: 'red',
//     // marginBottom: 10,
//     marginTop:5
//   },
//   container: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//     height: 60,
//     opacity: 1,
//     justifyContent: 'center',
//     zIndex: 1,
//   },
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   titleText: {
//     color: '#000000',
//     fontSize: 20,
//     fontFamily: "Gilroy-SemiBold",
//   },
//   headerRight: {
//     flexDirection: 'row',
//     width: '35%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headericon: {
//     height: 20,
//     width: 20,
//     tintColor: '#000',
//     marginHorizontal: 18,
//     resizeMode: 'contain',
//   },
//   searchIcon: {
//     height: 25,
//     width: 25,
//     tintColor: "#000000",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   modalTitle: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: '#F10C18',
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
// });




// import React, { useContext, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Modal,
//   Button,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from './AuthProvider';

// const TitleHeader = ({ title, cartLength }) => {
//   const navigation = useNavigation();
//   const { userToken } = useContext(AuthContext);
//   const [modalVisible, setModalVisible] = useState(false);

//   const goBack = () => {
//     navigation.goBack();
//   };

//   const tokenUse = userToken || 'dummy-token'; 
//   console.log("tokenuse", tokenUse);

//   const isDummyToken = () => {
//     return tokenUse === 'dummy-token';
//   };

//   const handleNavigation = (page) => {
//     if (isDummyToken()) {
//       setModalVisible(true); // Show the modal when dummy token is used
//     } else {
//       navigation.navigate(page);
//     }
//   };

//   const closeModal = () => {
//     setModalVisible(false); // Close the modal
//   };

//   return (
//     <>
//       <View style={styles.container}>
//         <View style={styles.mainheader}>
//           <View style={styles.headerLeft}>
//             <TouchableOpacity onPress={goBack}>
//               <Image
//                 source={require('../assets/next.png')}
//                 style={[styles.headericon, { height: 15, width: 25 }]}
//               />
//             </TouchableOpacity>
//             <Text style={styles.titleText}>
//               {title && title.length > 14 ? title.substring(0, 14) + "..." : title}
//             </Text>
//           </View>
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={() => handleNavigation('WishList')}>
//               <Image
//                 source={require('../assets/heart2.png')}
//                 style={styles.headericon}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => navigation.navigate("Search")}>
//               <Image 
//                 source={require('../assets/search.png')} 
//                 style={styles.searchIcon}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={() => handleNavigation('Cart')}>
//               <Image
//                 source={require('../assets/Cart.png')}
//                 style={styles.headericon}
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Full-screen Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         animationType="slide"
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text>Login Form</Text>
//             {/* Your login form components here */}
//             <Button title="Close" onPress={closeModal} />
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#DDD',
//     height: 60,
//     opacity: 1,
//     justifyContent: 'center',
//     zIndex: 1, // Ensure the header is above other content
//   },
//   mainheader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   headerLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   titleText: {
//     color: '#000000', 
//     fontSize: 20, 
//     fontFamily: "Gilroy-SemiBold",
//   },
//   headerRight: {
//     flexDirection: 'row',
//     width: '35%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headericon: {
//     height: 20,
//     width: 20,
//     tintColor: '#000',
//     marginHorizontal: 18,
//     resizeMode: 'contain',
//   },
//   searchIcon: {
//     height: 25,
//     width: 25,
//     tintColor: "#000000",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
//   },
//   modalContent: {
//     width: '90%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
// });

// export default TitleHeader;




import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './AuthProvider';
import { useForm, Controller } from 'react-hook-form';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TitleHeader = ({ title, cartLength }) => {
  const navigation = useNavigation();
  const { userToken, setUserToken, setUserId } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const goBack = () => {
    navigation.goBack();
  };

  const tokenUse = userToken || 'dummy-token'; 
  console.log("tokenuse", tokenUse);

  const isDummyToken = () => {
    return tokenUse === 'dummy-token';
  };

  const handleNavigation = (page) => {
    if (isDummyToken()) {
      setModalVisible(true); // Show the modal when dummy token is used
    } else {
      navigation.navigate(page);
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

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
  
        // Close the modal on successful login
        closeModal();
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
    <>
      <View style={styles.container}>
        <View style={styles.mainheader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={goBack} >
              <Image
                source={require('../assets/next.png')}
                style={[styles.headericon, { height: 15, width: 25 }]}
              />
            </TouchableOpacity>
            <Text style={styles.titleText}>
              {title && title.length > 14 ? title.substring(0, 14) + "..." : title}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={() => handleNavigation('WishList')}>
              <Image
                source={require('../assets/heart2.png')}
                style={styles.headericon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Image 
                source={require('../assets/search.png')} 
                style={styles.searchIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNavigation('Cart')}>
              <Image
                source={require('../assets/Cart.png')}
                style={styles.headericon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Full-screen Modal */}
      <Modal
        transparent={false}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
        <TouchableWithoutFeedback>
  <TouchableOpacity style={styles.backButton} onPress={closeModal}>
    <Image source={require('../assets/next.png')} style={styles.backIcon} />
  </TouchableOpacity>
</TouchableWithoutFeedback>
            {/* <Button title="Close" onPress={closeModal} /> */}
          <Text style={styles.modalTitle}>Login</Text>
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
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    height: 60,
    opacity: 1,
    justifyContent: 'center',
    zIndex: 1, // Ensure the header is above other content
  },
  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: '#000000', 
    fontSize: 20, 
    fontFamily: "Gilroy-SemiBold",
  },
  headerRight: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 18,
    resizeMode: 'contain',
  },
  searchIcon: {
    height: 25,
    width: 25,
    tintColor: "#000000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFCFC',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    
   
  },
  
  backIcon: {
    height: 24,
    width: 24,
    tintColor: "#000000",
    resizeMode: "contain",
  },
  
  modalTitle: {
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
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  eyeIcon: {
    height: 20,
    width: 20,
    tintColor: '#000000',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  loadingContainer: {
    width: '100%',
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginTop:30,
    borderColor:"#F10C18"
  },
  loginButton: {
    width: '100%',
    height: 55,
    backgroundColor: '#F10C18',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    marginTop:30
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default TitleHeader;
