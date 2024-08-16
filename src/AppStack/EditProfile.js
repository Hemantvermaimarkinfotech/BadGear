// This code is written by Hemant Verma
import React, {useContext, useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Alert, TextInput, ScrollView,StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';
import { AuthContext } from '../Components/AuthProvider';
import Loader from '../Components/Loader';
import axios from 'react-native-axios';

const EditProfile = ({route, navigation}) => {
  const {profileData} = route.params;
  console.log('profileDataaaaa', profileData);

  const [name, setName] = useState(
    profileData ? profileData[0]?.userName.charAt(0).toUpperCase() + profileData[0]?.userName.slice(1) : ''
  );
  const [email, setEmail] = useState(profileData ? profileData[0]?.userEmail : '');
  const [loading, setLoading] = useState(false);
  console.log(name)
  console.log(email)

  const {userToken} = useContext(AuthContext);
  console.log('userTokeeeee', userToken);

  const updateProfile = async () => {
    const token = userToken && userToken.token ? userToken.token : userToken;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);

      const response = await axios.post(
        'https://bad-gear.com/wp-json/edit-userProfile-api/v1/edit_userProfile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `${token}`,
          },
        }
      );

      const responseData = response.data;

      if (responseData.successmsg) {
        Alert.alert('Success', responseData.successmsg);
        console.log('Success', responseData.successmsg);
        navigation.goBack();
      } else {
        Alert.alert('Error', responseData.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.log('Error updating Profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'Edit Profile'} />
      <ScrollView>
        <View style={styles.textView}>
          <Text style={styles.text}>Full Name</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              placeholderTextColor="#999999"
              value={name}
              onChangeText={(text) => setName(text)} // Fixed onChangeText handler
            />
          </View>

          <Text style={[styles.text, {marginTop: 15}]}>Email</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.textInput}
              placeholder="Example@gmail.com"
              placeholderTextColor="#999999"
              value={email}
              onChangeText={(text) => setEmail(text)} // Fixed onChangeText handler
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
        {loading ? (
          <TouchableOpacity style={styles.button}>
            <Loader />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={updateProfile}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFCFC"
  },
  textView:{
    width:"90%",
    marginHorizontal:20,
    alignSelf:"center",
    marginTop:20
  },
  text:{
    fontSize:15,
    color:"#000000",
    fontFamily:"Gilroy",
    fontWeight:'600'
  },
  textInputView:{
    width:"100%",
    height:55,
    borderRadius:8,
    borderWidth:1,
    borderColor:"#DDD",
    alignSelf:"center",
    marginTop:10
  },
  textInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    color: "#000000", // Text color
    fontSize: 16, // Font size
    fontFamily: "Gilroy"
  },
  button: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#F10C18',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F10C18",
    bottom:20
},
buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
},
});