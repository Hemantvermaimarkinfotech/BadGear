import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import axios from 'react-native-axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUserToken ,setUserId} = useContext(AuthContext);
  console.log("setuserID",setUserId)
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleEmailChange = text => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
  };

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Alert', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('email', email.trim());
    formData.append('password', password.trim());
    console.log("formData",formData)
    try {
  
      const response = await fetch('https://bad-gear.com/wp-json/login-api/v1/userLogin', {
        method: 'POST',
        body: formData,
      });

      console.log('Response received:', response);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();

      console.log('Login response data:', responseData);

      if (responseData.status === "success") {
        await AsyncStorage.setItem('userData', JSON.stringify(responseData));
  
        setUserToken(responseData.token);
        setUserId(responseData?.user_data?.data?.ID)
        
      } else {
        Alert.alert('Login Failed', responseData.errormsg || 'Incorrect email or password');
      }
  
      setLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setLoading(false);
  
      if (error.message === 'Network request failed') {
        Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
      } else {
        Alert.alert('Unexpected Error', error.message || 'An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
     <View style={{marginTop:80,width:"100%",paddingHorizontal:20,alignSelf:"center",}}>
     <View style={styles.header}>
        <Text style={styles.title}>Log In</Text>
      </View>
      
      <View style={styles.inputContainer}>
      <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            onChangeText={handleEmailChange}
            placeholder="Email"
            placeholderTextColor="#23233C"
            color="#23233C"
            value={email}
          />
          <TouchableOpacity>
          {isEmailValid ? (
            <Image source={require("../assets/accept.png")} style={{height:20,width:20}}/>
          ) : (
            null
          )}
          
          </TouchableOpacity>
        </View>
        <View style={[styles.passwordContainer,{marginTop:30}]}>
          <TextInput
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
            onChangeText={txt => setPassword(txt)}
            placeholder="Password"
            placeholderTextColor="#23233C"
            color="#23233C"
            value={password}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
               source={showPassword ? require('../assets/view.png') : require('../assets/eye.png')}
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>
      {loading ? (
        <Loader />
      ) : (
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
      )}
   <View  style={{ justifyContent: "center", alignItems: "center" ,flexDirection:"row"}}>
  <Text style={styles.signupText}>
    Don't have an account? </Text>
    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}><Text style={[styles.signupLink,{  fontFamily:"Gilroy-Bold",}]}>Sign up</Text></TouchableOpacity>
  
</View>


     </View>
      {/* <TouchableOpacity >
      <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity> */}
     
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
 
    flex:1,
    backgroundColor:"#FBFCFC"
    
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    fontFamily:"Gilroy-SemiBold"
  },
 
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf:"center",
    paddingHorizontal:20,
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
    tintColor:"#DEDEDE"
  },
  forgotPasswordText: {
    fontSize: 16,
    textAlign: 'right',
    marginVertical: 20,
    color: '#000000',
    width:"90%",
    alignSelf:"center",
    fontWeight:"600",
    fontFamily:"Gilroy-Medium"

    
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    width:"100%",
    alignSelf:"center",
    
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily:"Gilroy"
  },
  signupText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginVertical:20,
    // fontWeight:"600",
   

  },
  inputContainer:{
    marginHorizontal:20,
    width:"100%",
    alignSelf:"center"
  },
  signupLink: {
    fontWeight: '600',
    fontSize:16,
    color:"#000000",
   
  },
  skipText: {
    textDecorationLine:"underline",
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    fontFamily:"Gilroy-Medium",
  },
});
