import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert
} from 'react-native';
import MainHeader from '../Components/MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {ScrollView} from 'react-native-gesture-handler';
import { AuthContext } from '../Components/AuthProvider';
import Loader from '../Components/Loader';
import axios from "react-native-axios"

// Dummy JSON data
const addressesData = [
  {
    id: '1',
    type: 'home',
    name: 'Home Address',
    address: '323 Main Street, Anytown, USA 12345',
    icon: 'home',
  },
];



const AddDeliveryAddress = ({navigation}) => {
  const [addresses, setAddresses] = useState([]);
  const [firstName, setFirstName] = useState("ntitn");
  const [lastName, setLastName] = useState("verma");
  const [company, setCompanyy] = useState("imark");
  const [country, setCountry] = useState("india");
  const [streetaddress, setStreetAddress] = useState("house no. 12");
  const [city, setCity] = useState("hisar");
  const [state, setState] = useState("haryana");
  const [zipcode, setZipCode] = useState("123121");
  const [phone, setphone] = useState("7956746576");
  const [email, setEmail] = useState("nitin12@gmail.com");
  const [addressType, setAddressType] = useState(1);
  const {userToken}=useContext(AuthContext)
  const [loading,setLoading]=useState(false)

  useEffect(() => {
    // Load JSON data
    setAddresses(addressesData);
  }, []);



  // Function to check if any field is filled
  const isAnyFieldFilled = () => {
    return !!(
      firstName ||
      lastName ||
      company ||
      country ||
      streetaddress ||
      city ||
      state ||
      zipcode ||
      phone ||
      email
    );
  };

  // const AddBillingAddress = async () => {
  //   setLoading(true);
  
  //   try {
  //     const formData = new FormData();
  //     formData.append('first_name', firstName);
  //     formData.append('last_name', lastName);
  //     formData.append('company', company);
  //     formData.append('country', country);
  //     formData.append('street_address', streetaddress);
  //     formData.append('city', city);
  //     formData.append('state', state);
  //     formData.append('zipcode', zipcode);
  //     formData.append('phone', phone);
  //     formData.append('email', email);
  
  //     console.log('FormData:', formData); // Check formData for debugging
  
  //     const response = await axios.post(
  //       'https://bad-gear.com/wp-json/add-billing-address/v1/BillingAddress',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //           Authorization: `Bearer ${userToken.token}`,
  //         },
  //       }
  //     );
  
  //     console.log('Response Billing updated:', response?.data);
  //     navigation.goBack();
  //   } catch (error) {
  //     console.error('Error updating Billing address:', error);
  //     if (error.response) {
  //       console.error('Response Data:', error.response.data);
  //       console.error('Response Status:', error.response.status);
  //     }
  //     // Handle specific error cases here
  //     if (error.response && error.response.status === 403) {
  //       Alert.alert('Access Denied', 'You do not have permission to perform this action.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };




  
  const AddBillingAddress = async () => {
    setLoading(true); // Assuming setLoading is a function that sets loading state
  
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('company', company);
      formData.append('country', country);
      formData.append('street_address', streetaddress);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipcode', zipcode);
      formData.append('phone', phone);
      formData.append('email', email);
  
      console.log('FormData:', formData); // Check formData for debugging
  
      // Replace with your actual token retrieval logic
      const token = userToken?.token
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
       
      };
  
      console.log('Headers:', headers); // Check headers for debugging
  
      const response = await axios.post(
        'https://bad-gear.com/wp-json/add-billing-address/v1/BillingAddress',
        formData,
        { headers }
      );
  
      console.log('Response Billing updated:', response?.data);
      // navigation.goBack(); // Uncomment this if you're using navigation
      navigation.goBack()
  
    } catch (error) {
      console.error('Error updating Billing address:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        if (error.response.status === 403) {
          // Alert.alert('Access Denied', 'You do not have permission to perform this action.');
          console.log('Access Denied: You do not have permission to perform this action.');
        }
      }
    } finally {
      setLoading(false); // Assuming setLoading is a function that sets loading state
    }
  };
  

  
  
  
  




  const AddShippingAddress = async () => {
    setLoading(true); // Assuming setLoading is a function that sets loading state
  
    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('company', company);
      formData.append('country', country);
      formData.append('street_address', streetaddress);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('zipcode', zipcode);
      formData.append('phone', phone);
      formData.append('email', email);
  
      console.log('FormData:', formData); // Check formData for debugging
  
      // Replace with your actual token retrieval logic
      const token = userToken?.token
  
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: `${token}`,
       
      };
  
      console.log('Headers:', headers); // Check headers for debugging
  
      const response = await axios.post(
        'https://bad-gear.com/wp-json/add-shipping-address/v1/ShippingAddress',
        formData,
        { headers }
      );
  
      console.log('Response Billing updated:', response?.data);
      // navigation.goBack(); // Uncomment this if you're using navigation
  navigation.goBack()
    } catch (error) {
      console.error('Error updating Billing address:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
        if (error.response.status === 403) {
          // Alert.alert('Access Denied', 'You do not have permission to perform this action.');
          console.log('Access Denied: You do not have permission to perform this action.');
        }
      }
    } finally {
      setLoading(false); // Assuming setLoading is a function that sets loading state
    }
  };
  
  

  

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={'Add Delivery Address'} />

      <ScrollView style={{marginBottom: 100}}>
      {/* Delivery address */}
      {addressType === 1 && (
      <View style={{width: '100%', marginHorizontal: 20, marginTop: 20}}>
          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontFamily: 'Gilroy-Bold',
              }}>
              Contact Details
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 10,
              }}>
              First Name
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
              onChangeText={(text)=>setFirstName(text)}
              value={firstName}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              Last Name
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput
              style={styles.textform} 
                onChangeText={(text)=>setLastName(text)} 
                value={lastName}/>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontFamily: 'Gilroy-Bold',
                marginTop: 20,
              }}>
              Address{' '}
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 10,
              }}>
              Company
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setCompanyy(text)}
                value={company}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              Country
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setCountry(text)}
                value={country}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              Street Address
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setStreetAddress(text)}
                value={streetaddress}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              City/District
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setCity(text)}
                value={city}
              />
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              State
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform}
              
              onChangeText={(text)=>setState(text)}
              value={state}/>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              zipcode
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setZipCode(text)}
                value={zipcode}
              />
            </View>

            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              phone
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput 
              style={styles.textform} 
                onChangeText={(text)=>setphone(text)}
                value={phone}
              />
            </View>

            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontFamily: 'Gilroy-Medium',
                marginTop: 20,
              }}>
              Email
            </Text>
            <View style={styles.inputcontainer}>
              <TextInput
              style={styles.textform} 
                onChangeText={(text)=>setEmail(text)}
                value={email}
              />
            </View>
          </View>

          <View style={{marginBottom:100}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontFamily: 'Gilroy-Bold',
                marginTop: 20,
              }}>
              Save Shipping  Address as Delivery
            </Text>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#CCC',
                marginTop: 10,
              }}
            />
          
          </View>
        </View>
         )}
        {/* End Delivery Address */}

        {/* shipping Address */}
        {addressType === 2 && (
           <View style={{width: '100%', marginHorizontal: 20, marginTop: 20}}>
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 18,
                 fontFamily: 'Gilroy-Bold',
               }}>
               Contact Details
             </Text>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 10,
               }}>
               First Name
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
               onChangeText={(text)=>setFirstName(text)}
               />
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               Last Name
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput
               style={styles.textform} 
                 onChangeText={(text)=>setLastName(text)} 
                 value={lastName}/>
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 18,
                 fontFamily: 'Gilroy-Bold',
                 marginTop: 20,
               }}>
               Address{' '}
             </Text>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 10,
               }}>
               Company
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setCompanyy(text)}
               />
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               Country
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setCountry(text)}
               />
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               Street Address
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setStreetAddress(text)}
               />
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               City/District
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setCity(text)}
               />
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               State
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform}
               
               onChangeText={(text)=>setState(text)}/>
             </View>
           </View>
 
           <View>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               zipcode
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setZipCode(text)}
               />
             </View>
 
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               phone
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput 
               style={styles.textform} 
                 onChangeText={(text)=>setphone(text)}
               />
             </View>
 
             <Text
               style={{
                 color: '#000000',
                 fontSize: 15,
                 fontFamily: 'Gilroy-Medium',
                 marginTop: 20,
               }}>
               Email
             </Text>
             <View style={styles.inputcontainer}>
               <TextInput
               style={styles.textform} 
                 onChangeText={(text)=>setEmail(text)}
               />
             </View>
           </View>
 
           <View style={{marginBottom:100}}>
             <Text
               style={{
                 color: '#000000',
                 fontSize: 18,
                 fontFamily: 'Gilroy-Bold',
                 marginTop: 20,
               }}>
               Save Shipping as Delivery
             </Text>
             <View
               style={{
                 height: 1,
                 width: '100%',
                 backgroundColor: '#CCC',
                 marginTop: 10,
               }}
             />
           
           </View>
         </View>
         )}
        {/* End Shipping Address */}

        
      </ScrollView>

     
   

      <View style={styles.bottomButtonContainer}>

      <View
              style={{flexDirection:"row",paddingLeft:20,bottom:20}}>
              <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 150,
            borderWidth: 1,
            borderColor: addressType === 1 ? 'transparent' : '#CCC',
            borderRadius: 8,
            backgroundColor: addressType === 1 ? '#F10C18' : '#FFF',
          }}
          onPress={() => {
            setAddressType(1);
             // Call AddBillingAddress function
          }}
        >
          <Text style={{ color: addressType === 1 ? '#FFF' : '#000', fontSize: 15 }}>Delivery Address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            width: 150,
            borderWidth: 1,
            borderColor: addressType === 2 ? 'transparent' : '#CCC',
            borderRadius: 8,
            marginLeft: 10,
            backgroundColor: addressType === 2 ? '#F10C18' : '#FFF',
          }}
          onPress={() => {
            setAddressType(2);
            // Call AddShippingAddress function
          }}
        >
          <Text style={{ color: addressType === 2 ? '#FFF' : '#000', fontSize: 15 }}>Shipping Address</Text>
        </TouchableOpacity>
            </View>
            {addressType === 1 && (
  <>
    {loading ? (
      <Loader />
    ) : (
      <TouchableOpacity
        style={styles.button}
        onPress={() => AddBillingAddress()}>
        <Text style={styles.buttonText}>Save Delivery Address</Text>
      </TouchableOpacity>
    )}
  </>
)}

{addressType === 2 && (
  <>
    {loading ? (
      <Loader />
    ) : (
      <TouchableOpacity
        style={styles.button}
        onPress={() => AddShippingAddress()}>
        <Text style={styles.buttonText}>Save Shipping Address</Text>
      </TouchableOpacity>
    )}
  </>
)}

      </View>
    </SafeAreaView>
  );
};

export default AddDeliveryAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  listContainer: {
    marginHorizontal: 10,
  },

  bottomButtonContainer: {
    height: 80,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  button: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#F10C18',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  inputcontainer: {
    height: 50,
    borderColor: '#CCC',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 8,
    width: '90%',
  },
  bottomSelectButton:{
    height: 100,
    position: 'absolute',
    bottom: 80,
    width: '100%',
    flexDirection:"row",
    width:"100%",
    paddingLeft:20,
    alignItems:"center"
    
  },
  textform:{
    color: '#000000',fontSize:15 
  }
});
