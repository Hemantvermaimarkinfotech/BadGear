// #This code is written by Hemant Verma

import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import MainHeader from '../Components/MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {AuthContext} from '../Components/AuthProvider';
import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
// Dummy JSON data

const DeliveryAddress = ({navigation}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const {userToken, setUserToken} = useContext(AuthContext);
  const [billling, setBilling] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(false);

  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); 
  const [selectedAddress, setselectedAddress] = useState('billingaddress');

  const handleBillingPress = addressId => {
    setSelectedBilling(!selectedBilling);
  };

  const handleShippingPress = () => {
    setSelectedShipping(!selectedShipping);
  };

  const billingaddress = `${billling?.billing_address},${billling?.billing_city},${billling?.billing_company},${billling?.billing_country},${billling?.billing_first_name},${billling?.billing_last_name},, 
  ${billling?.billing_phone},${billling?.billing_email},${billling?.billing_postcode},${billling?.billing_state}`;

  console.log('billignaddress', billingaddress);
  const shippingaddress = `${shipping?.shipping_address},${shipping?.shipping_city},${shipping?.shipping_company},${shipping?.shipping_country},${shipping?.shipping_company},${shipping?.shipping_last_name},${shipping?.shipping_first_name}, 
  ${shipping?.shipping_phone},${shipping?.shipping_email},${shipping?.shipping_postcode},${shipping?.shipping_state}`;

  const getAddressData = async addressType => {
    setLoading(true);
    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    try {
      let url;
      if (addressType === 'billing') {
        url =
          'https://bad-gear.com/wp-json/get-billing-address/v1/GetBillingAddress';
      } else if (addressType === 'shipping') {
        url =
          'https://bad-gear.com/wp-json/get-shipping-address/v1/GetShippingAddress';
      }

      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenToUse}`,
        },
      });

      const responseData = response.data.data;
      console.log(`${addressType} Response Data:`, responseData);

      if (addressType === 'billing') {
        setBilling(responseData);
        await AsyncStorage.setItem(
          'billingAddress',
          JSON.stringify(responseData),
        );
      } else if (addressType === 'shipping') {
        setShipping(responseData);
        await AsyncStorage.setItem(
          'shippingAddress',
          JSON.stringify(responseData),
        );
      }
    } catch (error) {
      console.log(`Error fetching ${addressType} Profile:`, error);
      setLoading(false);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        getAddressData('billing');
        getAddressData('shipping');
      }
    };

    fetchData();
  }, [isFocused]);

  const handleRadioPress = id => {
    setSelectedId(id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={'Delivery Address'} />

     {loading ?
     (<View style={{justifyContent:"center",alignItems:"center",flex:1}}>
      <ActivityIndicator size={"large"} color={"#F10C18"}/>
     </View>):(
       <View>
       
    
       <View style={styles.addressContainer}>
        {billingaddress ? (
          <TouchableOpacity
            style={styles.addressRow}
            onPress={handleBillingPress}
          >
            <View style={styles.addressContent}>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../assets/home.png')}
                  style={styles.icon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.addressTitle}>Billing Address</Text>
                <Text style={styles.addressText}>{billingaddress}</Text>
              </View>
            </View>
            <View style={styles.radioContainer}>
              {selectedBilling && (
                <TouchableOpacity
                  onPress={() => setselectedAddress('selectedBilling')}
                >
                  <Image
                    source={require('../assets/round.png')}
                    style={styles.radioIcon}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noAddressText}>No billing address found</Text>
        )}
        <View style={styles.separator} />
      </View>

      {/* Shipping Address Section */}
      <View style={styles.addressContainer}>
        <TouchableOpacity
          style={styles.addressRow}
          onPress={handleShippingPress}
        >
          <View style={styles.addressContent}>
            <View style={styles.iconContainer}>
              <Image
                source={require('../assets/location.png')}
                style={styles.icon}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.addressTitle}>Shipping Address</Text>
              {shippingaddress ? (
                <Text style={styles.addressText}>{shippingaddress}</Text>
              ) : (
                <Text style={styles.noAddressText}>No shipping address found</Text>
              )}
            </View>
          </View>
          <View style={styles.radioContainer}>
            {selectedShipping && (
              <TouchableOpacity
                onPress={() => setselectedAddress('selectedShipping')}
              >
                <Image
                  source={require('../assets/round.png')}
                  style={styles.radioIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.separator} />
      </View>


     {/* Add Address Button */}
     <TouchableOpacity
       style={styles.addAddressButton}
       onPress={() => navigation.navigate('AddDeliveryAddress')}>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
         <Image
           source={require('../assets/plus.png')}
           style={{height: 20, width: 20, tintColor: '#000000'}}
         />
         <Text style={styles.addAddressButtonText}>Add Address</Text>
       </View>

       <Image
         source={require('../assets/arrow-right.png')}
         style={{height: 20, width: 20, tintColor: '#000000'}}
       />
     </TouchableOpacity>
   </View>
     )}

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            const selectedBillingAddress = selectedBilling
              ? billingaddress
              : null;
            const selectedShippingAddress = selectedShipping
              ? shippingaddress
              : null;

            navigation.navigate('Checkout', {
              selectedBillingAddress,
              selectedShippingAddress,
            });
          }}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DeliveryAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  listContainer: {
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',

    width: '100%',
  },
  iconContainer: {
    backgroundColor: '#F10C18',
    height: 70,
    borderRadius: 8,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
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
  addAddressButton: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#707070',
    borderWidth: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  addAddressButtonText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
    marginLeft: 10,
  },
  addressContainer: {
    width: '95%',
    alignSelf: 'center',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,

  },
  addressContent: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#F10C18', // Adjust to match your design
    borderRadius: 5,
    padding: 5,
    height:50,width:50,
    justifyContent:"center",
    alignItems:"center"
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: '#ffffff',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    paddingRight:20
  },
  addressTitle: {
    color: '#000000',
    fontSize: 15,
  },
  addressText: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    marginVertical: 5,
    lineHeight: 15,
  },
  noAddressText: {
    color: '#808080',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    marginVertical: 5,
    lineHeight: 15,
    textAlign: 'center',
  },
  radioContainer: {
    marginLeft: 10,
    width: '10%',
    alignItems: 'center',
  },
  radioIcon: {
    height: 20,
    width: 20,
    tintColor: '#F10C18',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#707070',
    opacity: 0.3,
  },
});
