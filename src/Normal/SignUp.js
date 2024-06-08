import React, { useContext, useState } from 'react';
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
import { AuthContext } from '../Components/AuthProvider';
import axios from 'react-native-axios';
import Loader from '../Components/Loader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUserToken } = useContext(AuthContext);

  const handleEmailChange = text => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
  };

  const handleSignUp = async () => {
    // Validate input fields
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('ALert', 'Please fill in all fields');
      return;
    }

    if (!isEmailValid) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Prepare the form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      // Send the signup request to the server
      const response = await axios.post(
        'https://bad-gear.com/wp-json/signup-api/v1/user_signup',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('SignUp response:', response.data);

      await AsyncStorage.setItem('userData', JSON.stringify(response.data));

      setLoading(false);
      setUserToken(response.data.token);
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      if (error.response) {
        console.error('Server Error Response:', error.response.data);
        Alert.alert('Error', error.response.data.errormsg || 'An error occurred. Please try again.');
      } else if (error.request) {
        console.error('No Server Response:', error.request);
        Alert.alert('Network Error', 'No response from server. Please check your internet connection.');
      } else {
        console.error('Request Error:', error.message);
        Alert.alert('Unexpected Error', 'An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 80,width:"100%",paddingHorizontal:20 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.passwordContainer}
            onChangeText={text => setName(text)}
            placeholder="Name"
            placeholderTextColor="#23233C"
            color="#23233C"
          />
          <View style={[styles.passwordContainer, { marginVertical: 20 }]}>
            <TextInput
              style={styles.passwordInput}
              onChangeText={handleEmailChange}
              placeholder="Email"
              placeholderTextColor="#23233C"
              color="#23233C"
            />
            <TouchableOpacity>
              {isEmailValid ? (
                <AntDesign name="checkcircle" size={20} color="#6CC57C" />
              ) : (
                null
              )}
            </TouchableOpacity>
          </View>
          <View style={[styles.passwordContainer, { marginBottom: 30 }]}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              onChangeText={txt => setPassword(txt)}
              placeholder="Password"
              placeholderTextColor="#23233C"
              color="#23233C"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? require('../assets/eye.png') : require('../assets/view.png')}
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
        <View style={{ justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
          <Text style={styles.signupText}>
            Already have an account?  </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} >
            <Text style={styles.signupLink}>Log In</Text>
            </TouchableOpacity>
         
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFC"
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 29,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    fontFamily: "Gilroy-SemiBold"
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignSelf: "center",
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
    tintColor:"#DEDEDE"
  },
  forgotPasswordText: {
    fontSize: 15,
    textAlign: 'right',
    marginVertical: 20,
    color: '#000000',
    width: "90%",
    alignSelf: "center"
  },
  loginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    marginHorizontal: 70,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: "Gilroy"
  },
  signupText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginVertical:20,
    // fontWeight:"600",
    
  },
  signupLink: {
    fontWeight: '600',
    textDecorationLine: "underline",
    color: "#F10C18",
    fontFamily: "Gilroy-Bold"
  },
  inputContainer: {
    width: "100%"
  }
});
