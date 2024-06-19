import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../Components/Loader';
import axios from "react-native-axios"

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [data,setdata]=useState()


  const handleEmailChange = (text) => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
  };





  const handleForgotPassword = async () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Please enter your email.');
      valid = false;
    } else if (!isEmailValid) {
      setEmailError('Please enter a valid email.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    const Data = JSON.stringify({
      email: email,
    });



    try {
      const response = await axios.post(
        'https://bad-gear.com/wp-json/forgot-password-api/v1/forgot_password_api',
        Data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Forgot response:', response.data);

      if (response.data ) {
        setdata(response.data);
        setLoading(false);
        navigation.navigate("Login")
      } else {
        setLoading(false);

      }
    } catch (error) {
      setLoading(false);
      console.log(error?.response);
      

    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        
        <Text style={styles.title}>Forgot Password?</Text>
        <View style={styles.inputContainer}>
          <View style={styles.passwordContainer}>
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
        </View>
    
    {loading ?
    (<View style={{marginTop:20}}>
    <Loader/>
    </View>):(
      <TouchableOpacity style={styles.submitButton} onPress={()=>handleForgotPassword()}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
    )}
    
        <TouchableOpacity  style={{ justifyContent: "center", alignItems: "center",flexDirection:"row" }}>
          <Text style={styles.signupText}>
            Already have an account?   </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.signupLink}>Log In</Text></TouchableOpacity>
        
        </TouchableOpacity>
      
      </View>
     
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
  },
  formContainer: {
    paddingHorizontal: 20,
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
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    elevation: 5,
    marginTop: 20,
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
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily:"Gilroy",
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

});
