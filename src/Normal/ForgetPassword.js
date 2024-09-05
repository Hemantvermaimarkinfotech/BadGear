import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TitleHeader from '../Components/TitleHeader';
import Loader from '../Components/Loader';
import {AuthContext} from './AuthProvider';
import axios from 'react-native-axios';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = text => {
    setEmail(text);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
    setIsEmailValid(isValidEmail);
  };

  const forgotPassword = () => {
    if (!email || !isEmailValid) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    let data = JSON.stringify({
      email: email,
    });

    let config = {
      method: 'post',
      url: 'https://bad-gear.com/wp-json/forgot-password-api/v1/forgot_password_api',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
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
              keyboardType="email-address"
            />
            <TouchableOpacity>
              {isEmailValid ? (
                <Image
                  source={require('../assets/accept.png')}
                  style={{height: 20, width: 20}}
                />
              ) : null}
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              borderWidth: 1,
              alignItems: 'center',
              borderColor: '#F10C18',
              height: 55,
              borderRadius: 10,
              marginTop: 20,
            }}>
            <Loader />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={forgotPassword}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={styles.signupText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupLink}>Log In</Text>
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Gilroy-SemiBold',
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
    fontFamily: 'Gilroy',
  },
  signupText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    marginVertical: 20,
  },
  signupLink: {
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#F10C18',
    fontFamily: 'Gilroy-Bold',
  },
});
