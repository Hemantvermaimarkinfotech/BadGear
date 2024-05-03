import React, {useEffect,useState} from 'react';
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
import axios from "react-native-axios"
import Loader from '../Components/Loader';


const SignUp = ({navigation}) => {
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
const [loading,setLoading]=useState(false)

const handleSignUp = async () => {
  console.log("hello")
      setLoading(true);
    
      let Data = JSON.stringify({
        name: `${name}`,
        email: `${email}`,
        password: `${password}`,
      });
      try {
        const response = await axios.post(
          'http://sledpullcentral.com/wp-json/signup-api/v1/user_signup',
          Data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log('SignUp response:', response.data); 
        setUserToken(response?.data);
        await AsyncStorage.setItem('userData', JSON.stringify(response?.data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error-response",error?.response);
        alert(error?.response?.data?.error);
      }
    };
  
  
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
            fontWeight: 700,
            textAlign: 'center',
          }}>
         Sign Up
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
          // value={name}
          onChangeText={text=>setName(text)}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          // value={email}
          onChangeText={text=>setEmail(text)}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          // value={password}
          onChangeText={text=>setPassword(text)}
          placeholder="Password"
        />
      </View>
     
        {loading?
        <Loader/>:(
          <TouchableOpacity style={styles.loginbutton} onPress={()=>handleSignUp()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 700,
              textAlign: 'center',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        )}

{/* <TouchableOpacity style={styles.loginbutton} onPress={()=>handleSignUp()}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 700,
              textAlign: 'center',
            }}>
            Sign Up
          </Text>
        </TouchableOpacity> */}
        
        <TouchableOpacity style={styles.signup} onPress={()=>navigation.navigate("Login")}>
        <Text style={{color:"#000000",fontSize:15,marginLeft:30}}>Already have an account?</Text>
        <Text style={{color:"#000000",fontSize:15,fontWeight:600,textAlign:"center"}}>Sign In</Text>
        </TouchableOpacity>
    </View>

        <Text style={{textDecorationLine:"underline",fontSize:20,textAlign:"center",marginTop:20,color:"#000000",position:"absolute",bottom:100,left:"45%"}}>Skip</Text>
     
    </SafeAreaView>
  );
};

export default SignUp;

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
   
  }
});