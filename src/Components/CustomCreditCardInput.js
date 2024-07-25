// import React, {useState} from 'react';
// import {
//   View,
//   TextInput,
//   Button,
//   StyleSheet,
//   Alert,
//   Text,
//   TouchableOpacity,
//   Image,
//   Dimensions,
// } from 'react-native';
// // import AuthorizeNet from 'react-native-authorize-net';

// const CustomCreditCardInput = () => {
//   const [cardName, setCardName] = useState();
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvv, setCvv] = useState('');

//    const handlePaymentt = async () => {
    
//   };


//   const screenWidth = Dimensions.get('window').width;
//   const marginRightForExpiry = screenWidth <= 360 ? 40 : 57;

//   return (
//     <View style={styles.container}>
         
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           width: '100%',
//         }}>
//         <Text
//           style={{color: '#000000', fontSize: 16, fontFamily: 'Gilroy-Medium'}}>
//           PaymentDetails
//         </Text>
//      <View>
        
//      </View>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 20,
//         }}>
//         <Text style={styles.cardheaderName}>Name on Card</Text>
//         <Text
//           style={{...styles.cardheaderName, marginRight: marginRightForExpiry}}>
//           Expiry
//         </Text>
//       </View>
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           marginTop: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <View style={[styles.InputView, {width: '65%'}]}>
//             <TextInput placeholder='Your Name' placeholderTextColor={"#000000"} style={{fontSize:13,marginLeft:5,opacity:0.5}} value={cardName}/>
//         </View>

//         <View style={styles.InputView}>

//         <TextInput placeholder='01 /2001' placeholderTextColor={"#000000"} style={{fontSize:13,marginLeft:5,opacity:0.5}}/>
//         </View>
//       </View>

//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           marginTop: 20,
//         }}>
//         <Text style={styles.cardheaderName}>CardNumber</Text>
//         <Text
//           style={{...styles.cardheaderName, marginRight: marginRightForExpiry}}>
//           CVV
//         </Text>
//       </View>
//       <View
//         style={{
//           width: '100%',
//           flexDirection: 'row',
//           marginTop: 10,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//         }}>
//         <View style={[styles.InputView1, {width: '65%',flexDirection:"row",alignItems:"center",paddingHorizontal:5}]}>

//             <View>
//                 <Image source={require("../assets/shopping.png")} style={{height:30,width:30}}/>
//             </View>
//             <TextInput placeholder='1234 5678 9012' placeholderTextColor={"#000000"} style={{fontSize:14,opacity:0.5,marginLeft:5}}/>
//         </View>

//         <View style={[styles.InputView,{justifyContent:"center"}]}>
//             <TextInput placeholder='****' placeholderTextColor={"#000000"} style={{marginLeft:5,fontSize:14,opacity:0.5}} value=''/>
//         </View>
//       </View>

//       <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
//       <Text style={styles.cardheaderName}>Subtotal</Text>
//       <Text style={styles.cardheaderName}>$106.3</Text>
//       </View>

//       <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
//       <Text style={styles.cardheaderName}>SalesTax</Text>
//       <Text style={styles.cardheaderName}>$16.3</Text>
//       </View>
//       <View style={{height:1,borderWidth:0.6,borderColor:"#E5E5E5",opacity:0.6,marginTop:20}}/>
     
//       <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
//       <Text style={[styles.cardheaderName,{fontFamily:"Gilroy-Bold"}]}>Total</Text>
//       <Text style={[styles.cardheaderName,{fontFamily:"Gilroy-Bold"}]}>$16.3</Text>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handlePaymentt} >
//         <Text style={styles.buttonText}>Place Your Order</Text>
//       </TouchableOpacity>


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },

//   InputView: {
//     height: 45,
//     width: '30%',
//     borderColor: '#E5E5E5',
//     borderWidth: 1,
//     borderRadius: 5,
//     justifyContent:"center"
//   },
//   InputView1: {
//     height: 45,
//     width: '30%',
//     borderColor: '#E5E5E5',
//     borderWidth: 1,
//     borderRadius: 5,
//     // justifyContent:"center"
//   },
//   cardheaderName: {
//     color: '#000000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Medium',
//   },
//   button: {
//     height: 50,
//     borderColor: '#F10C18',
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F10C18',
//     marginTop:40
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontFamily: 'Gilroy-Medium',
//   },
// });

// export default CustomCreditCardInput;

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomCreditCardInput = ({ onSubmit, onClose }) => {
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const navigation = useNavigation();

  const validateCardNumber = () => {
    // Example validation: check if card number is exactly 16 digits
    return /^\d{16}$/.test(cardNumber);
  };

  const validateExpiryDate = () => {
    // Example validation: check if expiry date is in MM/YY format
    return /^\d{2}\/\d{2}$/.test(expiryDate);
  };

  const validateCvv = () => {
    // Example validation: check if CVV is exactly 3 digits
    return /^\d{3}$/.test(cvv);
  };

  const handlePayment = () => {
    // Validate inputs
    if (!validateCardNumber()) {
      Alert.alert('Invalid Card Number', 'Please enter a valid 16-digit card number.');
      return;
    }
    if (!validateExpiryDate()) {
      Alert.alert('Invalid Expiry Date', 'Please enter expiry date in MM/YY format.');
      return;
    }
    if (!validateCvv()) {
      Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV.');
      return;
    }

    // Start loading indicator
    setLoading(true);

    // Simulate a delay (e.g., API call, processing)
    setTimeout(() => {
      const paymentDetails = {
        cardName,
        cardNumber,
        expiryDate,
        cvv,
        subtotal: '106.3',
        salesTax: '16.3',
        total: '122.6',
      };
      onSubmit(paymentDetails);
      onClose();
      navigation.navigate('Checkout', { paymentDetails });
      setLoading(false); // Stop loading indicator
    }, 2000); // Simulate a 2-second delay, adjust as needed
  };

  const screenWidth = Dimensions.get('window').width;
  const marginRightForExpiry = screenWidth <= 360 ? 40 : 57;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text
          style={{ color: '#000000', fontSize: 16, fontFamily: 'Gilroy-Medium' }}>
          Payment Details
        </Text>

        <TouchableOpacity
          style={{}} onPress={onClose}
        >
          <Image
            source={require('../assets/close.png')}
            style={{ height: 14, width: 14, tintColor: '#000000' }}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>Name on Card</Text>
        <Text
          style={{ ...styles.cardheaderName, marginRight: marginRightForExpiry }}>
          Expiry
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={[styles.InputView, { width: '65%' }]}>
          <TextInput
            placeholder="Your Name"
            placeholderTextColor={'#000000'}
            style={{ fontSize: 13, marginLeft: 5, opacity: 0.5 }}
            value={cardName}
            onChangeText={setCardName}
          />
        </View>

        <View style={styles.InputView}>
          <TextInput
            placeholder="01/25"
            placeholderTextColor={'#000000'}
            style={{ fontSize: 13, marginLeft: 5, opacity: 0.5 }}
            value={expiryDate}
            onChangeText={setExpiryDate}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>Card Number</Text>
        <Text
          style={{ ...styles.cardheaderName, marginRight: marginRightForExpiry }}>
          CVV
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View
          style={[
            styles.InputView1,
            {
              width: '65%',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 5,
            },
          ]}>
          <Image
            source={require('../assets/shopping.png')}
            style={{ height: 30, width: 30 }}
          />
          <TextInput
            placeholder="1234 5678 9012 3456"
            placeholderTextColor={'#000000'}
            style={{ fontSize: 14, opacity: 0.5, marginLeft: 5 }}
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>

        <View style={[styles.InputView, { justifyContent: 'center' }]}>
          <TextInput
            placeholder="***"
            placeholderTextColor={'#000000'}
            style={{ marginLeft: 5, fontSize: 14, opacity: 0.5 }}
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>Subtotal</Text>
        <Text style={styles.cardheaderName}>$106.3</Text>
      </View> */}

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>Sales Tax</Text>
        <Text style={styles.cardheaderName}>$16.3</Text>
      </View> */}
      <View
        style={{
          height: 1,
          borderWidth: 0.6,
          borderColor: '#E5E5E5',
          opacity: 0.6,
          marginTop: 40,
        }}
      />

      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={[styles.cardheaderName, { fontFamily: 'Gilroy-Bold' }]}>
          Total
        </Text>
        <Text style={[styles.cardheaderName, { fontFamily: 'Gilroy-Bold' }]}>
          $122.6
        </Text>
      </View> */}

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#F10C18'} />
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Place Your Order</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  InputView: {
    height: 45,
    width: '30%',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
  },
  InputView1: {
    height: 45,
    width: '30%',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
  },
  cardheaderName: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Gilroy-Medium',
  },
  button: {
    height: 50,
    borderColor: '#F10C18',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  loadingContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: '#F10C18',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 40,
  },
});

export default CustomCreditCardInput;
