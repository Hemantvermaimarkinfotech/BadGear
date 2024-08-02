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
  ActivityIndicator,
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
import {getProductDetails} from '../Components/ApiService';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
let modalHeight = screenHeight - 90;
let modalWidth = screenWidth - 40;

// Adjust modal height for medium and large devices
if (screenWidth > 360) {
  modalHeight = screenHeight - 280;
}
const Checkout = ({navigation, route}) => {
  const isFocused = useIsFocused();
  const {paymentDetails} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitloading, setsubmitLoading] = useState(false);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  console.log('checkoutcartitmes', cartItems);
  const [pageloading, setPageloading] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + parseInt(item.quantity),
    0,
  );

  const lastFourDigits = paymentDetails?.cardNumber
    ? paymentDetails.cardNumber.slice(-4)
    : null;

  const handleFormSubmit = data => {
    console.log('Form Data:', data); // Process the form data as needed
    setModalVisible2(false); // Close the modal upon form submission
  };

  const closeModal = () => {
    setModalVisible2(false);
  };

  // useEffect(() => {
  //   // Define the async function to fetch addresses
  //   async function getAddressData() {
  //     const tokenToUse =
  //       userToken && userToken.token ? userToken.token : userToken;
  //     try {
  //       setPageloading(true);
  //       // First API call to get billing address
  //       let billingConfig = {
  //         method: 'get',
  //         maxBodyLength: Infinity,
  //         url: 'https://bad-gear.com/wp-json/get-billing-address/v1/GetBillingAddress',
  //         headers: {
  //           Authorization: `${tokenToUse}`,
  //           'Content-Type': 'application/json',
  //         },
  //       };

  //       const billingResponse = await axios(billingConfig);
  //       console.log('Billing Address Data:', billingResponse.data);

  //       // Update billing address state
  //       setBillingAddress(billingResponse.data);

  //       // Second API call to get shipping address
  //       let shippingConfig = {
  //         method: 'get',
  //         maxBodyLength: Infinity,
  //         url: 'https://bad-gear.com/wp-json/get-shipping-address/v1/GetShippingAddress',
  //         headers: {
  //           Authorization: `${tokenToUse}`,
  //           'Content-Type': 'application/json',
  //         },
  //       };

  //       const shippingResponse = await axios(shippingConfig);
  //       console.log('Shipping Address Data:', shippingResponse.data);

  //       // Update shipping address state
  //       setShippingAddress(shippingResponse.data);
  //     } catch (error) {
  //       console.log('Error fetching addresses:', error);
  //     } finally {
  //       setPageloading(false);
  //     }
  //   }
  //   getAddressData();
  // }, []);

  const order = [
    {name: 'Kenworth Red Skull Hoodie', price: '2000'},
    {name: 'Kenworth Red Skull Hoodie', price: '2000'},
  ];
  const {userToken} = useContext(AuthContext);
  const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
  console.log('tokenuser', tokenToUse);
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
    setShowModal(false);
    navigation.navigate('BottomTab');
  };

  // const getCart = () => {
  //   const tokenToUse =
  //     userToken && userToken.token ? userToken.token : userToken;

  //   let config = {
  //     method: 'get',
  //     url: 'https://bad-gear.com/wp-json/get-cart-items/v1/GetCartItems',
  //     headers: {
  //       Authorization: `${tokenToUse}`, // Ensure the token format matches the server's expectations
  //     },
  //   };

  //   axios
  //     .request(config)
  //     .then(response => {
  //       console.log(JSON.stringify(response.data));
  //       setCartItems(response.data?.data);
  //     })
  //     .catch(error => {
  //       console.log('Error fetching cart items:', error);
  //     });
  // };

  // useEffect(() => {
  //   console
  //   getCart();
  // }, []);
  // Define fetchData function
  const fetchData = async () => {
    setPageloading(true);
    // const tokenToUse = userToken && userToken.token ? userToken.token : userToken;

    try {
      // Fetch billing address
      const billingConfig = {
        method: 'get',
        url: 'https://bad-gear.com/wp-json/get-billing-address/v1/GetBillingAddress',
        headers: {
          Authorization: `${tokenToUse}`, // Added "Bearer " for better token format
          'Content-Type': 'application/json',
        },
      };
      const billingResponse = await axios(billingConfig);
      console.log('Billing Address Data:', billingResponse.data);
      setBillingAddress(billingResponse.data);

      // Fetch shipping address
      const shippingConfig = {
        method: 'get',
        url: 'https://bad-gear.com/wp-json/get-shipping-address/v1/GetShippingAddress',
        headers: {
          Authorization: `${tokenToUse}`, // Added "Bearer " for better token format
          'Content-Type': 'application/json',
        },
      };
      const shippingResponse = await axios(shippingConfig);
      console.log('Shipping Address Data:', shippingResponse.data);
      setShippingAddress(shippingResponse.data);

      // Fetch cart items
      const cartConfig = {
        method: 'get',
        url: 'https://bad-gear.com/wp-json/get-cart-items/v1/GetCartItems',
        headers: {
          Authorization: `${tokenToUse}`, // Added "Bearer " for better token format
        },
      };
      const cartResponse = await axios(cartConfig);
      console.log('Cart Items Data:', cartResponse.data);
      setCartItems(cartResponse.data?.data);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setPageloading(false);
    }
  };

  useEffect(() => {
    console.log('helllooo');
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, tokenToUse]);

  const productIdsString = cartItems.map(item => item.product_id).join(',');
  const productNamesString = cartItems.map(item => item.product_name).join(',');
  const productprice = cartItems.map(item => item.price).join(',');

  //   const tokenToUse = userToken?.token || userToken;

  //   // Check for required fields and handle validation
  //   const requiredFields = [
  //     productIdsString,
  //     totalQuantity.toString(),
  //     paymentDetails?.cardName,
  //     billingAddress?.data?.billing_email,
  //     productNamesString,
  //     paymentDetails?.cardNumber,
  //     paymentDetails?.expiryDate,
  //     paymentDetails?.cvv,
  //     billingAddress?.data?.billing_first_name,
  //     billingAddress?.data?.billing_last_name,
  //     billingAddress?.data?.billing_email,
  //     billingAddress?.data?.billing_phone,
  //     billingAddress?.data?.billing_company,
  //     billingAddress?.data?.billing_address,
  //     billingAddress?.data?.billing_city,
  //     billingAddress?.data?.billing_state,
  //     billingAddress?.data?.billing_postcode,
  //     billingAddress?.data?.billing_country,
  //     calculateTotal().toString(),
  //   ];

  //   console.log("requirfield",requiredFields)

  //   const isFormValid = requiredFields.every(field => field && field.trim() !== '');

  //   if (!isFormValid) {
  //     console.log('Please fill all required fields.');
  //     setsubmitLoading(false); // Ensure loading is stopped if form is invalid
  //     return; // Stop execution if form is invalid
  //   }

  //   console.log('tokenToUse:', tokenToUse);
  //   setsubmitLoading(true);
  //   let data = new FormData();

  //   // Append fields to FormData
  //   data.append('product_ids', productIdsString || '');
  //   data.append('quantities', totalQuantity.toString() || '');
  //   data.append('product_price', productprice || ''); // Ensure productprice is a comma-separated string
  //   data.append('card_holder_name', paymentDetails?.cardName || '');
  //   data.append('customer_email', billingAddress?.data?.billing_email || '');
  //   data.append('item_name', productNamesString || '');
  //   data.append('card_number', paymentDetails?.cardNumber || '');
  //   data.append('card_exp_date', paymentDetails?.expiryDate || '');
  //   data.append('card_cvc', paymentDetails?.cvv || '');
  //   data.append('billing_first_name', billingAddress?.data?.billing_first_name || '');
  //   data.append('billing_last_name', billingAddress?.data?.billing_last_name || '');
  //   data.append('billing_email', billingAddress?.data?.billing_email || '');
  //   data.append('billing_phone', billingAddress?.data?.billing_phone || '');
  //   data.append('billing_company', billingAddress?.data?.billing_company || '');
  //   data.append('billing_address_1', billingAddress?.data?.billing_address || ''); // Use billing_address_1
  //   data.append('billing_address_2', billingAddress?.data?.billing_address || ''); // Ensure this field exists
  //   data.append('billing_city', billingAddress?.data?.billing_city || '');
  //   data.append('billing_state', billingAddress?.data?.billing_state || '');
  //   data.append('billing_zip', billingAddress?.data?.billing_postcode || '');
  //   data.append('billing_country', billingAddress?.data?.billing_country || '');
  //   data.append('total_amount', calculateTotal().toString() || '');

  //   console.log('Total Quantity:', totalQuantity);
  //   console.log('dataaaaa', data);

  //   let config = {
  //     method: 'post',
  //     url: 'https://bad-gear.com/wp-json/payment_process/v1/payment',
  //     headers: {
  //       Authorization: `${tokenToUse}`, // Ensure proper format
  //     },
  //     data: data,
  //   };

  //   try {
  //     const response = await axios(config);
  //     console.log('API Response:', response.data);
  //     setShowModal(true);
  //   } catch (error) {
  //     console.log('API Error:', error);
  //     // Handle error cases, e.g., show error message
  //   } finally {
  //     setsubmitLoading(false); // Ensure loading state is set to false in all cases
  //   }
  // };

  const handleOrderSubmission = async () => {
    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;

    // Form validation
    const requiredFields = [
      productIdsString,
      totalQuantity.toString(),
      productprice,
      paymentDetails?.cardName,
      billingAddress?.data?.billing_email,
      productNamesString,
      paymentDetails?.cardNumber,
      paymentDetails?.expiryDate,
      paymentDetails?.cvv,
      billingAddress?.data?.billing_first_name,
      billingAddress?.data?.billing_last_name,
      billingAddress?.data?.billing_email,
      billingAddress?.data?.billing_phone,
      billingAddress?.data?.billing_company,
      billingAddress?.data?.billing_address,
      billingAddress?.data?.billing_city,
      billingAddress?.data?.billing_state,
      billingAddress?.data?.billing_postcode,
      billingAddress?.data?.billing_country,
      calculateTotal().toString(),
    ];

    const isFormValid = requiredFields.every(
      field => field && field.trim() !== '',
    );

    if (!isFormValid) {
      console.log('Please fill all required fields.');
      setLoading(false);
      return;
    }

    setLoading(true);

    let data = new FormData();

    // Append fields to FormData
    data.append('product_ids', productIdsString || '');
    data.append('quantities', totalQuantity.toString() || '');
    data.append('product_price', productprice || '');
    data.append('card_holder_name', paymentDetails?.cardName || '');
    data.append('customer_email', billingAddress?.data?.billing_email || '');
    data.append('item_name', productNamesString || '');
    data.append('card_number', paymentDetails?.cardNumber || '');
    data.append('card_exp_date', paymentDetails?.expiryDate || '');
    data.append('card_cvc', paymentDetails?.cvv || '');
    data.append(
      'billing_first_name',
      billingAddress?.data?.billing_first_name || '',
    );
    data.append(
      'billing_last_name',
      billingAddress?.data?.billing_last_name || '',
    );
    data.append('billing_email', billingAddress?.data?.billing_email || '');
    data.append('billing_phone', billingAddress?.data?.billing_phone || '');
    data.append('billing_company', billingAddress?.data?.billing_company || '');
    data.append(
      'billing_address_1',
      billingAddress?.data?.billing_address || '',
    );
    data.append(
      'billing_address_2',
      billingAddress?.data?.billing_address || '',
    );
    data.append('billing_city', billingAddress?.data?.billing_city || '');
    data.append('billing_state', billingAddress?.data?.billing_state || '');
    data.append('billing_zip', billingAddress?.data?.billing_postcode || '');
    data.append('billing_country', billingAddress?.data?.billing_country || '');
    data.append('total_amount', calculateTotal().toString() || '');

    console.log('FormData:', data);

    // Fetch request
    try {
      const response = await fetch(
        'https://bad-gear.com/wp-json/payment_process/v1/payment',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${tokenToUse}`,
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const responseData = await response?.data;
      console.log('API Response:', responseData);
      setShowModal(true);
    } catch (error) {
      console.error('API Error:', error.message);
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

      {pageloading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color={'#F10C18'} size={'large'} />
        </View>
      ) : (
        <ScrollView
          style={{marginHorizontal: 10, marginBottom: 100}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainView}>
            <TouchableOpacity
              style={[styles.row, {}]}
              onPress={() => navigation.navigate('DeliveryAddress')}>
              <View style={{flexDirection: 'row'}}>
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

                <View style={{justifyContent: 'center', marginLeft: 10}}>
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

            <TouchableOpacity
              style={styles.row}
              onPress={() => setModalVisible2(true)}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                    source={require('../assets/credit-card.png')}
                    style={{height: 22, width: 22, tintColor: '#FFFFFF'}}
                  />
                </View>

                <TouchableOpacity
                  style={{justifyContent: 'center', marginLeft: 10}}>
                  <Text style={{color: '#000000', fontSize: 15}}>Payment</Text>
                  <View>
                    {lastFourDigits ? (
                      <Text style={styles.cardNumber}>
                        XXXX XXXX XXXX {lastFourDigits}
                      </Text>
                    ) : (
                      <Text style={styles.noCardDetails}>
                        No card details present
                      </Text>
                    )}
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
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  const price = parseFloat(item.price);
                  const quantity = parseInt(item.quantity);
                  const totalPrice = price * quantity;
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
                        ${totalPrice.toFixed(2)}
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
              <Text style={styles.orderText}>$ 0.00</Text>
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
                  {fontSize: 22, fontFamily: 'Gilroy-SemiBold'},
                ]}>
                My Order
              </Text>
              <Text
                style={[
                  styles.orderText,
                  {fontSize: 22, fontFamily: 'Gilroy-SemiBold'},
                ]}>
                $ {calculateTotal()}
              </Text>
            </View>
          </View>
        </ScrollView>
      )}

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
        visible={modalVisible2}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible2(false)}>
        <View style={styles.cardmodalContainer}>
          <View
            style={[
              styles.cardModalContent,
              {height: modalHeight, width: modalWidth},
            ]}>
            <CustomCreditCardInput
              onSubmit={handleFormSubmit}
              onClose={closeModal}
            />
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
    justifyContent: 'center',
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
  cardNumber: {
    color: '#000000',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    marginVertical: 5,
  },
  noCardDetails: {
    color: '#F10C18',
    fontSize: 12,
    fontFamily: 'Gilroy-Regular',
    marginVertical: 5,
  },
});
