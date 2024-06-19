import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import MainHeader from '../Components/MainHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {AuthContext} from '../Components/AuthProvider';
import axios from 'react-native-axios';
import {useIsFocused} from '@react-navigation/native'; // Import useIsFocused hook
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
  const isFocused = useIsFocused(); // useIsFocused hook to track screen focus
  const [selectedAddress, setselectedAddress] = useState('billingaddress');

  const handleBillingPress = (addressId) => {
   setSelectedBilling(!selectedBilling)
  };
  
  const handleShippingPress = () => {
    setSelectedShipping(!selectedShipping); // Toggle selectedShipping state
  };
  
  

  const billingaddress = `${billling?.billing_address},${billling?.billing_city},${billling?.billing_company},${billling?.billing_country},${billling?.billing_last_name},${billling?.billing_first_name}, 
  ${billling?.billing_phone},${billling?.billing_email},${billling?.billing_postcode},${billling?.billing_state}`;

  console.log('billignaddress', billingaddress);
  const shippingaddress = `${shipping?.shipping_address},${shipping?.shipping_city},${shipping?.shipping_company},${shipping?.shipping_country},${shipping?.shipping_company},${shipping?.shipping_last_name},${shipping?.shipping_first_name}, 
  ${shipping?.shipping_phone},${shipping?.shipping_email},${shipping?.shipping_postcode},${shipping?.shipping_state}`;

  const getAddressData = async (token, addressType) => {
    try {
      if (!token) {
        console.error('User token is not available');
        return;
      }
  
      let url;
      if (addressType === 'billing') {
        url = 'https://bad-gear.com/wp-json/get-billing-address/v1/GetBillingAddress';
      } else if (addressType === 'shipping') {
        url = 'https://bad-gear.com/wp-json/get-shipping-address/v1/GetShippingAddress';
      }
  
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
  
      const responseData = response.data.data;
      console.log(`${addressType} Response Data:`, responseData);
  
      if (addressType === 'billing') {
        setBilling(responseData);
        await AsyncStorage.setItem('billingAddress', JSON.stringify(responseData));
      } else if (addressType === 'shipping') {
        setShipping(responseData);
        await AsyncStorage.setItem('shippingAddress', JSON.stringify(responseData));
      }
    } catch (error) {
      console.error(`Error fetching ${addressType} Profile:`, error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (userToken && userToken.token) {
      getAddressData(userToken.token, 'billing');
      getAddressData(userToken.token, 'shipping');
    }
  }, [userToken]);

  useEffect(() => {
    console.log('hello');
    if (isFocused && userToken && userToken.token) {
      getAddressData(userToken.token, 'billing');
      getAddressData(userToken.token, 'shipping');
    }
  }, [isFocused, userToken]); // useEffect depends on isFocused

  const handleRadioPress = id => {
    setSelectedId(id);
  };

  const renderItem = ({item}) => {
    return (
      <View key={item.id}>
        <TouchableOpacity
          style={styles.row}
          onPress={() => handleRadioPress(item.id)}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={[styles.iconContainer, selectedId === item.id]}>
              <Entypo name={item.icon} size={22} color={'#fff'} />
            </View>
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <Text style={{color: '#000000', fontSize: 15}}>
                Biilling Address
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontFamily: 'Gilroy-Regular',
                  marginVertical: 5,
                }}>
                {item?.address}
              </Text>
            </View>
          </View>
          <View style={{marginLeft: 10}}>
            {selectedId === item.id ? (
              <MaterialIcons
                name="radio-button-checked"
                size={24}
                color={'red'}
                onPress={() => setselectedAddress('billingaddress')}
              />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color={'red'}
              />
            )}
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            width: '100%',
            marginTop: 15,
            backgroundColor: '#707070',
            opacity: 0.3,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={'Delivery Address'} />

      <View>
        {loading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        ) : (
          <View>
            <View style={{width: '95%', alignSelf: 'center'}}>
              {billingaddress ? (
             <TouchableOpacity
             style={styles.row}
             onPress={handleBillingPress}
           >
             <View style={{ flexDirection: 'row', width: '90%' }}>
               <View style={[styles.iconContainer]}>
                 <Entypo name="home" size={30} color={'#fff'} />
               </View>
               <View style={{ justifyContent: 'center', marginLeft: 10 }}>
                 <Text style={{ color: '#000000', fontSize: 15 }}>
                   Billing Address
                 </Text>
                 <Text
                   style={{
                     color: '#000000',
                     fontSize: 12,
                     fontFamily: 'Gilroy-Regular',
                     marginVertical: 5,
                     lineHeight: 15,
                   }}
                 >
                   {billingaddress}
                 </Text>
               </View>
             </View>
             <View style={{ marginLeft: 10, width: '10%' }}>
               {selectedBilling && (
                 <MaterialIcons
                   name="radio-button-checked"
                   size={24}
                   color={'red'}
                   onPress={() => setselectedAddress('selectedBilling')}
                 />
               )}
             </View>
           </TouchableOpacity>
           
              ) : (
                <Text
                  style={{
                    color: '#808080',
                    fontSize: 12,
                    fontFamily: 'Gilroy-Regular',
                    marginVertical: 5,
                    lineHeight: 15,
                    textAlign: 'center',
                  }}>
                  No billing address found
                </Text>
              )}
              <View
                style={{
                  height: 1,
                  width: '100%',
                  marginTop: 15,
                  backgroundColor: '#707070',
                  opacity: 0.3,
                }}
              />
            </View>

            <View style={{width: '95%', alignSelf: 'center'}}>
            <TouchableOpacity
  style={styles.row}
  onPress={handleShippingPress}
>
  <View style={{ flexDirection: 'row', width: '90%' }}>
    <View style={[styles.iconContainer]}>
      <Entypo name="location-pin" size={30} color={'#fff'} />
    </View>
    <View style={{ justifyContent: 'center', marginLeft: 10 }}>
      <Text style={{ color: '#000000', fontSize: 15 }}>
        Shipping Address
      </Text>
      {shippingaddress ? (
        <Text
          style={{
            color: '#000000',
            fontSize: 12,
            fontFamily: 'Gilroy-Regular',
            marginVertical: 5,
            lineHeight: 15,
          }}
        >
          {shippingaddress}
        </Text>
      ) : (
        <Text
          style={{
            color: '#808080',
            fontSize: 12,
            fontFamily: 'Gilroy-Regular',
            marginVertical: 5,
            lineHeight: 15,
          }}
        >
          No shipping address found
        </Text>
      )}
    </View>
  </View>
  <View style={{ marginLeft: 10, width: '10%' }}>
    {selectedShipping && (
      <MaterialIcons
        name="radio-button-checked"
        size={24}
        color={'red'}
      />
    )}
  </View>
</TouchableOpacity>

              <View
                style={{
                  height: 1,
                  width: '100%',
                  marginTop: 15,
                  backgroundColor: '#707070',
                  opacity: 0.3,
                }}
              />
            </View>
          </View>
        )}

        {/* Add Address Button */}
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => navigation.navigate('AddDeliveryAddress')}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <EvilIcons name="plus" size={24} color={'#000000'} />
            <Text style={styles.addAddressButtonText}>Add Address</Text>
          </View>

          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color={'#000000'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomButtonContainer}>
      <TouchableOpacity
  style={styles.button}
  onPress={() => {
    const selectedBillingAddress = selectedBilling ? billingaddress : null;
    const selectedShippingAddress = selectedShipping ? shippingaddress : null;

    navigation.navigate('Checkout', { 
      selectedBillingAddress,
      selectedShippingAddress
    });
  }}
>
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
});
