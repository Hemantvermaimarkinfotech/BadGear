import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList,TextInput} from 'react-native';
import MainHeader from '../Components/MainHeader';
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { ScrollView } from 'react-native-gesture-handler';
// Dummy JSON data
const addressesData = [
  {
    id: '1',
    type: 'home',
    name: 'Home Address',
    address: '323 Main Street, Anytown, USA 12345',
    icon: 'home'
  },

  
];

const AddDeliveryAddress = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    // Load JSON data
    setAddresses(addressesData);
  }, []);

  

 

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={"Add Delivery Address"} />
      
     <ScrollView style={{marginBottom:100}}>
        <View style={{width:"100%",marginHorizontal:20,marginTop:20}}>
        <View>

        <Text style={{color:"#000000",fontSize:18,fontFamily:"Gilroy-Bold"}}>Contact Details</Text>
        <Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:10}}>Full Name</Text>
        <View style={styles.inputcontainer}>
        <TextInput/>
        </View>
        </View>

        <View>


<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:20}}>Mobile No</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>

<View>

<Text style={{color:"#000000",fontSize:18,fontFamily:"Gilroy-Bold",marginTop:20}}>Address </Text>
<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:10}}>Pin Code</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>

<View>


<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:20}}>Address</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>

<View>


<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:20}}>Loclity Town</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>

<View>


<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:20}}>City/District</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>

<View>


<Text style={{color:"#000000",fontSize:15,fontFamily:"Gilroy-Medium",marginTop:20}}>State</Text>
<View style={styles.inputcontainer}>
<TextInput/>
</View>
</View>


<View>

<Text style={{color:"#000000",fontSize:18,fontFamily:"Gilroy-Bold",marginTop:20}}>Save Address as </Text>
<View style={{height:1,width:"100%",backgroundColor:"#CCC",marginTop:10}}/>
<View style={{flexDirection:"row",marginTop:20,marginBottom:70}}>
<TouchableOpacity style={{justifyContent:"center",alignItems:"center",height:40,width:80,borderWidth:1,borderColor:"#CCC",borderRadius:8}}>
  <Text style={{color:"#000000",fontSize:15}}>Home</Text>
</TouchableOpacity>

<TouchableOpacity style={{justifyContent:"center",alignItems:"center",height:40,width:80,borderWidth:1,borderColor:"#CCC",borderRadius:8,marginLeft:10}}>
  <Text style={{color:"#000000",fontSize:15}}>Office</Text>
</TouchableOpacity>
</View>
</View>


        
        </View>

        
     </ScrollView>
      
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("DeliveryAddress")}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFC",
  },
  listContainer: {
    marginHorizontal: 10,
  },
  
  bottomButtonContainer: {
    height: 80,
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    width: "100%",
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
  inputcontainer:{
    height:50,
    borderColor:"#CCC",
    borderWidth:1,
    marginTop:10,
    borderRadius:8,
  width:"90%"
    
  }
  
});
