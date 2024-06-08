import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const EditProfile = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={"Edit Profile"}/>
     <ScrollView>
        <View style={styles.textView}>
        <Text style={styles.text}>Full Name</Text>
        <View style={styles.textInputView}>
        <TextInput 
              style={styles.textInput} 
              placeholder="Enter your full name"
              placeholderTextColor="#999999" // Change placeholder color
            />
        </View>

        <Text style={[styles.text,{marginTop:15}]}>Email</Text>
        <View style={styles.textInputView}>
        <TextInput 
              style={styles.textInput} 
              placeholder="Example@gmail.com"
              placeholderTextColor="#999999" // Change placeholder color
            />
        </View>


        <Text style={[styles.text,{marginTop:15}]}>Location</Text>
        <View style={styles.textInputView}>
        <TextInput 
              style={styles.textInput} 
              placeholder="LH-12, East Wally USA"
              placeholderTextColor="#999999" // Change placeholder color
            />
        </View>
        </View>
     </ScrollView>

     <View style={{ height: 1, width: "100%", marginTop: 10, backgroundColor: "#707070", opacity: 0.3, position: "absolute", bottom: 90 }} />
            <View style={{ height: 80, justifyContent: "center", position: "absolute", bottom: 10, width: "100%" }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
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
    width:"95%",
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
},
buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
},
});