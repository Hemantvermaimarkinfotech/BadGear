import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MainHeader from '../Components/MainHeader';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'react-native-axios';
import {AuthContext} from '../Components/AuthProvider';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import he from 'he';
import {useFocusEffect} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import CustomCreditCardInput from '../Components/CustomCreditCardInput';
import AuthorizeNet from 'react-native-authorize-net';

const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  let modalHeight = screenHeight - 100; // Adjust as needed based on your layout
  let modalWidth = screenWidth - 40; // Adjust as needed based on your layout

  // Adjust modal height for medium and large devices
  if (screenWidth > 360) {
    modalHeight = screenHeight - 200;
  }
const Checkout = ({navigation, route}) => {
  const {totalAmount, selectedBillingAddress, selectedShippingAddress} =
    route.params;
  //   console.log("selectedBillingAddress",selectedBillingAddress)
  //   console.log("selectedShippingAddress",selectedShippingAddress)
  //   console.log('cartitmscheckoutpage', cartItems, totalAmount);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null); // State for storing billing address


  const [shippingAddress, setShippingAddress] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [totalAmountState, setTotalAmountState] = useState(null);
  const isFocused = useIsFocused();
  const [cardDetails, setCardDetails] = useState(null);
  const [isCardInputVisible, setIsCardInputVisible] = useState(false);

  const handlePayment = async () => {
    // Show the modal containing the credit card input
    setIsCardInputVisible(true);
  };

  
  const closeCardModal = () => {
    setIsCardInputVisible(false);
  };

  // const handlePayment = async () => {
  //   console.log("hello")
  //   // Implement payment processing logic here (communicate with backend)
  //   if (cardData) {
  //     // Send cardData (e.g., card number, expiration date, CVV) to your backend
  //     const response = await fetch('https://yourbackend.com/process_payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cardData }),
  //     });

  //     // Process the response from your backend as needed
  //     const result = await response.json();
  //     console.log('Payment Result:', result);
  //   }
  // };




  useEffect(() => {
    // Define the async function to fetch addresses
    async function getAddressData() {
      const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
      try {
        // First API call to get billing address
        let billingConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://bad-gear.com/wp-json/get-billing-address/v1/GetBillingAddress',
          headers: { 
            Authorization: `${tokenToUse}`,
            'Content-Type': 'application/json',
          }
        };

        const billingResponse = await axios(billingConfig);
        console.log('Billing Address Data:', billingResponse.data);

        // Update billing address state
        setBillingAddress(billingResponse.data);

        // Second API call to get shipping address
        let shippingConfig = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://bad-gear.com/wp-json/get-shipping-address/v1/GetShippingAddress',
          headers: { 
            Authorization: `${tokenToUse}`,
            'Content-Type': 'application/json',
          }
        };

        const shippingResponse = await axios(shippingConfig);
        console.log('Shipping Address Data:', shippingResponse.data);

        // Update shipping address state
        setShippingAddress(shippingResponse.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    }
    getAddressData();
  }, []); 





  const order = [
    {name: 'Kenworth Red Skull Hoodie', price: '2000'},
    {name: 'Kenworth Red Skull Hoodie', price: '2000'},
  ];
  const {userToken} = useContext(AuthContext);
  const calculateTotal = () => {
    let total = 0;

    if (Array.isArray(cartItems)) {
      cartItems.forEach(item => {
        const price = parseFloat(item.price);
        if (!isNaN(price)) {
          total += price * item.quantity;
        }
      });
    }

    return total.toFixed(2); // Format total amount to two decimal places
  };

  const continueShopping = () => {
    // Close the modal and navigate to home screen
    setShowModal(false);
    navigation.navigate('BottomTab'); // Navigate to your home screen route
  };

  useEffect(() => {
    
    const fetchAddressesAndCartItems = async () => {
      try {
        const billingAddress = await AsyncStorage.getItem('billingAddress');
        const shippingAddress = await AsyncStorage.getItem('shippingAddress');
        const cartItems = await AsyncStorage.getItem('cartItems');
        const totalAmount = await AsyncStorage.getItem('totalAmount');
        const [isCardInputVisible, setIsCardInputVisible] = useState(false);

        const handlePayment = async () => {
          // Show the modal containing the credit card input
          setIsCardInputVisible(true);
        };

        if (
          // billingAddress !== undefined &&
          // shippingAddress !== undefined &&
          cartItems !== undefined &&
          totalAmount !== undefined
        ) {
          // setBillingAddress(JSON.parse(billingAddress));
          // setShippingAddress(JSON.parse(shippingAddress));
          setCartItems(JSON.parse(cartItems));
          setTotalAmountState(parseFloat(totalAmount));

          // console.log('Billing Addresssss:', billingAddress);
          // console.log('Shipping Addresssss:', shippingAddress);
          console.log('Cart Itemssssss:', JSON.parse(cartItems));
          console.log('Total Amount:', totalAmount);
        } else {
          console.log('Some data is missing in AsyncStorage');
        }
      } catch (error) {
        console.log('Failed to fetch data from AsyncStorage:', error);
        // Handle error as needed
      }
    };

    fetchAddressesAndCartItems(); // Call the async function
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchAddressesAndCartItems = async () => {
        try {
          // const billingAddress = await AsyncStorage.getItem('billingAddress');
          // const shippingAddress = await AsyncStorage.getItem('shippingAddress');
          const cartItems = await AsyncStorage.getItem('cartItems');
          const totalAmount = await AsyncStorage.getItem('totalAmount');

          if (
            billingAddress !== undefined &&
            shippingAddress !== undefined &&
            cartItems !== undefined &&
            totalAmount !== undefined
          ) {
            // setBillingAddress(JSON.parse(billingAddress));
            // setShippingAddress(JSON.parse(shippingAddress));
            setCartItems(JSON.parse(cartItems));
            setTotalAmountState(parseFloat(totalAmount));

            // console.log('Billing Address:', billingAddress);
            // console.log('Shipping Address:', shippingAddress);
            console.log('Cart Items:', JSON.parse(cartItems));
            console.log('Total Amount:', totalAmount);
          } else {
            console.log('Some data is missing in AsyncStorage');
          }
        } catch (error) {
          console.log('Failed to fetch data from AsyncStorage:', error);
          // Handle error as needed
        }
      };

      fetchAddressesAndCartItems(); // Call the async function

      return () => {
        // Cleanup function if needed
      };
    }, []),
  );

  const handleOrderSubmission = async () => {
    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    setLoading(true);
    try {
      // Prepare data object with billing, shipping, and cart items data
      let data = {
        billing_first_name: billingAddress.firstName,
        billing_last_name: billingAddress.lastName,
        billing_company: billingAddress.company,
        billing_address_1: billingAddress.address1,
        billing_city: billingAddress.city,
        billing_state: billingAddress.state,
        billing_postcode: billingAddress.postcode,
        billing_country: billingAddress.country,
        billing_phone: billingAddress.phone,
        billing_email: billingAddress.email,
        shipping_first_name: shippingAddress.firstName,
        shipping_last_name: shippingAddress.lastName,
        shipping_company: shippingAddress.company,
        shipping_address_1: shippingAddress.address1,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state,
        shipping_postcode: shippingAddress.postcode,
        shipping_country: shippingAddress.country,
        shipping_phone: shippingAddress.phone,
        product_name: cartItems.name,
        quantity: cartItems.quantity,
        card_details: cardDetails,
        // Subtotal: totalAmount.subtotal,
        // total: totalAmount.total,
        // Shipping: totalAmount.shipping,
        payment_method: 'Stripe',
        status: 'DONE',
        order_id: '2123',
      };

      let config = {
        method: 'post',
        url: 'https://bad-gear.com/wp-json/get-CheckoutDetails/v1/get_CheckoutDetails',
        headers: {
          Authorization: `${tokenToUse}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      // Make API request using Axios
      const response = await axios(config);
      console.log('API Response:', response.data);

      // Example: Navigate to success screen upon successful response
      if (response.data.status === 'success') {
        setShowModal(true);
      } else {
        // Handle error cases
        console.log('API Error:', response.data.error);
        // Optionally, handle error state or show error message to user
      }
    } catch (error) {
      console.log('API Request Failed:', error);
      // Handle error as needed
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MainHeader title={'Checkout'} />

      <ScrollView style={{marginHorizontal: 10,marginBottom:100}} showsVerticalScrollIndicator={false}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={[styles.row,{paddingLeft:10}]}
            onPress={() => navigation.navigate('DeliveryAddress')}>
            <View style={{flexDirection: 'row',}}>
              <View
                style={{
                  backgroundColor: '#F10C18',
                  height: 55,
                  borderRadius: 8,
                  width: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                 
                }}>
                <Image
                  source={require('../assets/location.png')}
                  style={{height: 22, width: 22, tintColor: '#FFFFFF'}}
                />
              </View>

              <View style={{justifyContent: 'center', marginLeft: 10,}}>
                <Text style={{color: '#000000', fontSize: 15}}>
                  Delivery/Shipping Address
                </Text>
             
                    <Text style={styles.addressLabel}>Billing Address:</Text>
                    <View style={{width: '80%'}}>
                      <Text style={styles.addressText}>
                        {billingAddress?.data?.billing_first_name}{' '}
                        {billingAddress?.data?.billing_last_name},{' '}
                        {billingAddress?.data?.billing_address},{' '}
                        {billingAddress?.data?.billing_city},{' '}
                        {billingAddress?.data?.billing_state},{' '}
                        {billingAddress?.data?.billing_postcode},{' '}
                        {billingAddress?.data?.billing_country}
                      </Text>
                    </View>
                

                {/* Shipping Address */}
                {shippingAddress && (
                  <>
                    <Text style={styles.addressLabel}>Shipping Address:</Text>
                    <View style={{width: '80%'}}>
                      <Text style={styles.addressText}>
                        {shippingAddress.data?.shipping_first_name}{' '}
                        {shippingAddress.data?.shipping_last_name},{' '}
                        {shippingAddress?.data?.shipping_address},{' '}
                        {shippingAddress?.data?.shipping_city},{' '}
                        {shippingAddress?.data?.shipping_state},{' '}
                        {shippingAddress?.data?.shipping_postcode},{' '}
                        {shippingAddress?.data?.shipping_country}
                      </Text>
                    
                    </View>
                  </>
                )}
              </View>
            </View>

            <Image
              source={require('../assets/arrow-right.png')}
              style={{height: 22, width: 22, tintColor: '#000000'}}
            />
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

          <TouchableOpacity style={styles.row} onPress={handlePayment}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F10C18',
                  height: 55,
                  borderRadius: 8,
                  width: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 10,
                }}>
                <Image
                  source={require('../assets/credit-card.png')}
                  style={{height: 22, width: 22, tintColor: '#FFFFFF'}}
                />
              </View>

              <TouchableOpacity
                style={{justifyContent: 'center', marginLeft: 10}}
                >
                <Text style={{color: '#000000', fontSize: 15}}>Payment</Text>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 12,
                      fontFamily: 'Gilroy-Regular',
                      marginVertical: 5,
                    }}>
                    <Text> X X X X X X X X X X X X 3436</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            <Image
              source={require('../assets/arrow-right.png')}
              style={{height: 22, width: 22, tintColor: '#000000'}}
            />
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

          <View style={{marginTop: 20}}>
            {/* {order.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style={styles.orderText}>{item.name}</Text>
                <Text style={styles.orderText}>$ {item.price}</Text>
              </View>
            ))} */}

            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item, index) => {
                const undefinedRates = item.price;
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}>
                    <View style={{width: '70%'}}>
                      <Text style={styles.orderText}>
                        {he.decode(item?.product_name)}
                      </Text>
                    </View>
                    <Text style={styles.orderText}>
                      $
                      {item && undefinedRates !== undefined
                        ? item.price
                        : '0.00'}
                    </Text>
                  </View>
                );
              })
            ) : (
              <Text>No items in the cart</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.orderText}>Discount</Text>
            <Text style={styles.orderText}>$ 1699</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.orderText}>Shipping</Text>
            <Text style={[styles.orderText, {color: '#159e42'}]}>
              FREE Delivery{' '}
            </Text>
          </View>

          <View
            style={{
              height: 1,
              width: '100%',
              marginTop: 20,
              backgroundColor: '#707070',
              opacity: 1,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              
            }}>
            <Text
              style={[
                styles.orderText,
                {fontSize: 22, fontFamily: 'Gilroy-Bold'},
              ]}>
              My Order
            </Text>
            <Text
              style={[
                styles.orderText,
                {fontSize: 22, fontFamily: 'Gilroy-Bold'},
              ]}>
              $ {calculateTotal()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View></View>
      <View
        style={{
          height: 1,
          width: '100%',
          marginTop: 10,
          backgroundColor: '#707070',
          opacity: 0.3,
          position: 'absolute',
          bottom: 90,
        }}
      />
      {loading ? (
        <View
          style={{
            height: 80,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
            width: '90%',
            alignSelf: 'center',
          }}>
          <Loader style={{width: '90%'}} />
        </View>
      ) : (
        <View
          style={{
            height: 80,
            justifyContent: 'center',
            position: 'absolute',
            bottom: 10,
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOrderSubmission()}>
            <Text style={styles.buttonText}>Submit Order</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{color: '#000000', fontSize: 15}}>
              Your order has been successfully submitted!
            </Text>
            {/* <Button title="Close" onPress={toggleModal} /> */}

            <TouchableOpacity
              style={styles.continueShoppingButton}
              onPress={continueShopping}>
              <Text style={styles.continueShoppingText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isCardInputVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeCardModal}>
        <View style={styles.cardmodalContainer}>
          <View style={[styles.cardModalContent,{height: modalHeight, width: modalWidth}]}>
            <CustomCreditCardInput  />
            <TouchableOpacity style={{position:"absolute",top:25,right:20}}  onPress={closeCardModal}>
          <Image
            source={require('../assets/close.png')}
            style={{height: 14, width: 14, tintColor: '#000000',}}
          />
        </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
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
  mainView: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    alignItems: 'center',
  },
  orderText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  modalContent: {
    width: '90%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    justifyContent: 'center',
  },
  continueShoppingButton: {
    backgroundColor: '#F10C18',
    height: 55,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  continueShoppingText: {
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  addressLabel: {
    color: '#000000',
    fontSize: 15,
  },
  addressText: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    marginVertical: 5,
  },
  cardmodalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  cardModalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent:"center"
    
  },

  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 20,
  },
  cardModalCloseButton: {
    backgroundColor: '#F10C18',
    height: 55,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardModalCloseText: {
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  addCardButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#F10C18',
    height: 55,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 5,
  },
  addCardText: {
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  creditcard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  cardModalCloseButton: {
    backgroundColor: '#F10C18',
    height: 55,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  cardModalCloseText: {
    color: '#FFFFFF',
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
