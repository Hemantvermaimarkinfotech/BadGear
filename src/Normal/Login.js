import React, {useEffect,useContext,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Components/Loader';
import axios from "react-native-axios"

const Login = ({navigation}) => {
  const {userToken, setUserToken} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleContinue = () => {
      navigation.replace('DrawerNavigator'); 
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp'); // Assuming 'SignUp' is the name of your SignUp screen
  };

  const handleLogin = async () => {
    setLoading(true);
  
    const userData = {
      email: email,
      password: password,
    };
  
    try {
      const response = await axios.post(
        'http://sledpullcentral.com/wp-json/login-api/v1/userLogin',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      console.log('Login response:', response.data);
      setUserToken(response?.data);
      await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Login error', error.response);
      alert(error?.response?.data?.error || 'An error occurred during login.');
    }
  };
  

  // const handleLogin=()=>{
  //   setUserToken('userToken');
  //   navigation.navigate('Home');
  // }
 
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={{marginTop:80}}>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 25,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          Log In
        </Text>
      </View>
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextInput
          style={styles.input}
          onChangeText={txt=>setEmail(txt)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={txt=>setPassword(txt)} 
          placeholder="Password"
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginTop: 10,
        }}>
        <View></View>
        <TouchableOpacity onPress={()=>navigation.navigate("ForgetPassword")}>
        <Text style={[styles.forgettext,{color: '#000000', fontSize: 15,fontWeight: "400"}]}>
          Forgot password?
        </Text>
        </TouchableOpacity>
      </TouchableOpacity>
          {loading?
          <Loader/>:(
            <TouchableOpacity style={styles.loginbutton} onPress={()=>handleLogin()} >
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '600',
                textAlign: 'center',
              }}>
              Log in
            </Text>
          </TouchableOpacity>
          )}
        
        <TouchableOpacity style={styles.signup} onPress={()=>navigation.navigate("SignUp")}>
        <Text style={{color:"#000000",fontSize:15,marginLeft:30}}>Don't have an account? </Text>
        <Text style={{color:"#000000",fontSize:15,fontWeight:'600',textAlign:"center"}}>sign up</Text>
        </TouchableOpacity>
      </View>

        <Text style={{textDecorationLine:"underline",fontSize:20,textAlign:"center",color:"#000000",position:"absolute",bottom:100,left:"45%"}}>Skip</Text>
     
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    width: '95%',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: '#fff',
    elevation: 1,
    color: '#23233C',
    fontSize: 12,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    
  },
  loginbutton: {
    width: '86%',
    marginTop: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    elevation: 1,
    color: '#23233C',
    fontSize: 12,
    
  },
  signup:{
    flexDirection:"row",
    width:"70%",
    alignSelf:"center",
    alignItems:"center",
    marginTop:20,
   
  },

});
