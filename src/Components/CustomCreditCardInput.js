import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
// import AuthorizeNet from 'react-native-authorize-net';

const CustomCreditCardInput = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

   const handlePaymentt = async () => {
    const apiLoginID = 'YOUR_API_LOGIN_ID';
    const transactionKey = 'YOUR_TRANSACTION_KEY';

    const client = new AuthorizeNet({
      apiLoginID,
      transactionKey,
      environment: 'sandbox', // or 'production' for live transactions
    });

    const transactionRequest = {
      amount: '10.00',
      creditCard: {
        cardNumber: '4111111111111111',
        expirationDate: '1223',
        cardCode: '123',
      },
    };

    try {
      const response = await client.createTransaction(transactionRequest);
      console.log('Transaction response:', response);
      // Handle success response
    } catch (error) {
      console.error('Transaction error:', error);
      // Handle error
    }
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
          style={{color: '#000000', fontSize: 16, fontFamily: 'Gilroy-Medium'}}>
          PaymentDetails
        </Text>
     <View>
        
     </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>Name on Card</Text>
        <Text
          style={{...styles.cardheaderName, marginRight: marginRightForExpiry}}>
          Expiry
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.InputView, {width: '65%'}]}>
            <TextInput placeholder='Your Name' placeholderTextColor={"#000000"} style={{fontSize:13,marginLeft:5,opacity:0.5}}/>
        </View>

        <View style={styles.InputView}>

        <TextInput placeholder='01 /2001' placeholderTextColor={"#000000"} style={{fontSize:13,marginLeft:5,opacity:0.5}}/>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
        }}>
        <Text style={styles.cardheaderName}>CardNumber</Text>
        <Text
          style={{...styles.cardheaderName, marginRight: marginRightForExpiry}}>
          CVV
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.InputView1, {width: '65%',flexDirection:"row",alignItems:"center",paddingHorizontal:5}]}>

            <View>
                <Image source={require("../assets/shopping.png")} style={{height:30,width:30}}/>
            </View>
            <TextInput placeholder='1234 5678 9012' placeholderTextColor={"#000000"} style={{fontSize:14,opacity:0.5,marginLeft:5}}/>
        </View>

        <View style={[styles.InputView,{justifyContent:"center"}]}>
            <TextInput placeholder='****' placeholderTextColor={"#000000"} style={{marginLeft:5,fontSize:14,opacity:0.5}}/>
        </View>
      </View>

      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
      <Text style={styles.cardheaderName}>Subtotal</Text>
      <Text style={styles.cardheaderName}>$106.3</Text>
      </View>

      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
      <Text style={styles.cardheaderName}>SalesTax</Text>
      <Text style={styles.cardheaderName}>$16.3</Text>
      </View>
      <View style={{height:1,borderWidth:0.6,borderColor:"#E5E5E5",opacity:0.6,marginTop:20}}/>
     
      <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:20}}>
      <Text style={[styles.cardheaderName,{fontFamily:"Gilroy-Bold"}]}>Total</Text>
      <Text style={[styles.cardheaderName,{fontFamily:"Gilroy-Bold"}]}>$16.3</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePaymentt} >
        <Text style={styles.buttonText}>Place Your Order</Text>
      </TouchableOpacity>


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
    justifyContent:"center"
  },
  InputView1: {
    height: 45,
    width: '30%',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    // justifyContent:"center"
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
    marginTop:40
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
});

export default CustomCreditCardInput;
