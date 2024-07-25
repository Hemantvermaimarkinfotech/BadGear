// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import OrderImage from '../assets/Arrival1.png';

// const OrderDetails = ({ route }) => {
//   // Dummy order data
//   const orderDetails = [
//     {
//       id: '1',
//       name: 'Brown Woman Shirts',
//       size: 'M',
//       quantity: 1,
//       price: 47.7,
//       status: 'Completed',
//       image: null, // Use default image if not provided
//     },
//     {
//       id: '2',
//       name: 'Black Jeans',
//       size: 'L',
//       quantity: 2,
//       price: 79.5,
//       status: 'Shipped',
//       image: null, // Use default image if not provided
//     },
//   ];

//   const orderInfo = {
//     address: '123 Fashion Street, Trendy City, TC 12345',
//     totalCost: orderDetails.reduce((sum, item) => sum + item.price * item.quantity, 0),
//   };

//   const renderProduct = ({ item }) => (
//     <View style={styles.productContainer}>
//       <Image source={item.image ? { uri: item.image } : OrderImage} style={styles.image} />
//       <View style={styles.detailsContainer}>
//         <Text style={styles.productName}>{item.name}</Text>
//         <Text style={styles.productSize}>Size: {item.size}</Text>
//         <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
//         <Text style={styles.productPrice}>Price: ${item.price}</Text>
//         <Text style={styles.productStatus}>Status: {item.status}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title={'Order Details'} />
//       </View>
//       {orderDetails.length === 0 ? (
//         <View style={styles.loader}>
//           <ActivityIndicator size="large" color="#F10207" />
//         </View>
//       ) : (
//         <FlatList
//           data={orderDetails}
//           renderItem={renderProduct}
//           keyExtractor={item => item.id}
//           contentContainerStyle={styles.listContainer}
//         />
//       )}
//       <View style={styles.orderSummary}>
//         <Text style={styles.summaryTitle}>Order Summary</Text>
//         <Text style={styles.summaryText}>Address: {orderInfo.address}</Text>
//         <Text style={styles.summaryText}>Total Cost: ${orderInfo.totalCost.toFixed(2)}</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FBFCFC',
//   },
//   header: {
//     paddingVertical: 8,
//     // borderBottomWidth: 1,
//     // borderBottomColor: '#ddd',
//   },
//   loader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 1,
//   },
//   listContainer: {
//     padding: 16,
//   },
//   productContainer: {
//     flexDirection: 'row',
//     marginBottom: 16,
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',

//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginRight: 16,
//   },
//   detailsContainer: {
//     flex: 1,
//   },
//   productName: {
//     fontSize: 16,
//   fontFamily:"Gilroy-SemiBold"
//   },
//   productSize: {
//     fontSize: 14,
//     color: '#555',
//     fontFamily:"Gilroy"

//   },
//   productQuantity: {
//     fontSize: 14,
//     color: '#555',
//   },
//   productPrice: {
//     fontSize: 14,
//     fontFamily:"Gilroy-SemiBold",
//     marginTop:5

//   },
//   productStatus: {
//     fontSize: 14,
//     color: '#555',
//     fontFamily:"Gilroy",
//   },
//   orderSummary: {
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#ddd',

//   },
//   summaryTitle: {
//     fontSize: 18,
//     marginBottom: 8,
//     fontFamily:"Gilroy-Bold",
//   },
//   summaryText: {
//     fontSize: 16,
//     color: '#000000',
//     fontFamily:"Gilroy"
//   },
// });

// export default OrderDetails;

// import React,{useState,useContext,useEffect}from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Linking,
//   ScrollView,
//   FlatList,
//   Image,
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from "react-native-axios"

// const OrderDetails = ({ route }) => {
//   const [orders, setOrders] = useState([]);
//   console.log("orders",orders[0].form_data.auth_code)
//   console.log(orders?.order_id)
//   const [loading, setLoading] = useState(true);
//   const { userToken } = useContext(AuthContext);

//   // Custom unserialize function
//   const unserialize = (data) => {
//     let offset = 0;
  
//     const readLength = (str) => {
//       let length = '';
//       while (str[offset] !== ':') {
//         length += str[offset++];
//       }
//       offset++;
//       return parseInt(length, 10);
//     };
  
//     const readString = (str) => {
//       const length = readLength(str);
//       offset++;
//       const result = str.substr(offset, length);
//       offset += length + 2; // +2 to skip the closing quote and semicolon
//       return result;
//     };
  
//     const readArray = (str) => {
//       const length = readLength(str);
//       offset++;
//       const result = {};
//       for (let i = 0; i < length; i++) {
//         const key = unserialize(str);
//         const value = unserialize(str);
//         result[key] = value;
//       }
//       offset++;
//       return result;
//     };
  
//     const unserialize = (str) => {
//       const type = str[offset++];
//       switch (type) {
//         case 's':
//           offset++;
//           return readString(str);
//         case 'a':
//           offset++;
//           return readArray(str);
//         case 'i':
//           const intEnd = str.indexOf(';', offset);
//           const intValue = parseInt(str.slice(offset, intEnd), 10);
//           offset = intEnd + 1;
//           return intValue;
//         case 'd':
//           const floatEnd = str.indexOf(';', offset);
//           const floatValue = parseFloat(str.slice(offset, floatEnd));
//           offset = floatEnd + 1;
//           return floatValue;
//         case 'b':
//           const boolEnd = str.indexOf(';', offset);
//           const boolValue = str.slice(offset, boolEnd) === '1';
//           offset = boolEnd + 1;
//           return boolValue;
//         case 'N':
//           return null;
//         default:
//           throw new Error(`Unknown / unsupported data type(s): ${type}`);
//       }
//     };
  
//     return unserialize(data);
//   };
  

//   const fetchOrder = () => {
//     const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
//     const config = {
//       method: 'get',
//       url: 'https://bad-gear.com/wp-json/orders/v1/all_orders',
//       headers: {
//         Authorization: `${tokenToUse}`,
//       },
//     };

//     axios
//       .request(config)
//       .then(response => {
//         const orders = response?.data?.data.map(order => ({
//           ...order,
//           form_data: unserialize(order.form_data),
//         }));

//         setOrders(orders);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);
  
//   const products = [
//     {
//       id: '1',
//       name: 'El Nino Pro Stock T-Shirt - XL',
//       variationId: '2776',
//       size: 'XL',
//       price: '$27.95',
//       quantity: 1,
//       image: require('../assets/cat3.png'),
//     },
//     {
//       id: '2',
//       name: 'El Nino Pro Stock T-Shirt - L',
//       variationId: '2777',
//       size: 'L',
//       price: '$27.95',
//       quantity: 2,
//       image: require('../assets/cat3.png'),
//     },
//     {
//       id: '3',
//       name: 'El Nino Pro Stock T-Shirt - M',
//       variationId: '2778',
//       size: 'M',
//       price: '$27.95',
//       quantity: 4,
//       image: require('../assets/cat3.png'),
//     },
//   ];

//   const handleEmailPress = () => {
//     Linking.openURL('mailto:horse_luver_10154@yahoo.com');
//   };

//   const handlePhonePress = () => {
//     Linking.openURL('tel:5672319588');
//   };

//   const renderProductItem = ({ item }) => (
//     <View style={styles.productContainer}>
//       <View style={styles.productInfo}>
//         <View style={styles.productImageContainer}>
//           <Image source={item.image} style={styles.productImage} />
//         </View>
//         <View style={styles.productDetails}>
//           <Text style={styles.productName}>{item.name}</Text>
//           <Text style={styles.productVariation}>
//             Variation ID: {item.variationId}
//           </Text>
//           <Text style={styles.productSize}>Size: {item.size}</Text>
//         </View>
//       </View>
//       <View style={styles.productPriceQty}>
//         <Text style={styles.productCost}>{item.price}</Text>
//         <Text style={styles.productQuantity}>× {item.quantity}</Text>
//       </View>
//       <View style={styles.productSeparator} />
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title="Order Details" />
//       </View>

//       <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
//         <View style={styles.firstTable}>
//           <Text style={styles.orderDetailsText}>Order #{orders[0]?.order_id} details</Text>
//           <Text style={[styles.paymentInfoText]}>
//             Payment via Credit card (80546037406). Paid on July 23, 2024 @ 11:17 pm. Customer IP: 208.78.205.179
//           </Text>
//           <View style={styles.addressContainer}>
//             <View style={styles.addressBlock}>
//               <Text style={styles.addressTitle}>Billing</Text>
//               <Text style={styles.addressText}>
//                 Taylor Pearce 3217 Township Road 155 Cardington, OH 43315
//               </Text>
//               <Text style={[styles.addressTitle, { marginTop: 10 }]}>Email address</Text>
//               <TouchableOpacity onPress={handleEmailPress} style={styles.emailPhoneTouchable}>
//                 <Text style={[styles.addressText, styles.clickableText]}>
//                   horse_luver_10154@yahoo.com
//                 </Text>
//               </TouchableOpacity>
//               <Text style={[styles.addressTitle, { marginTop: 10 }]}>Phone</Text>
//               <TouchableOpacity onPress={handlePhonePress}>
//                 <Text style={[styles.addressText, styles.clickableText]}>
//                   5672319588
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View style={styles.addressBlock}>
//               <Text style={styles.addressTitle}>Shipping</Text>
//               <Text style={styles.addressText}>
//                 Taylor Pearce 3217 Township Road 155 Cardington, OH 43315
//               </Text>
//               <Text style={[styles.addressTitle, { marginTop: 10 }]}>Phone</Text>
//               <TouchableOpacity onPress={handlePhonePress}>
//                 <Text style={[styles.addressText, styles.clickableText]}>
//                   5672319588
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.secondTable}>
//           <View style={styles.tableHeader}>
//             <View style={styles.tableHeaderItem}>
//               <Text style={styles.tableHeaderText}>Item</Text>
//             </View>
//             <View style={styles.tableHeaderRow}>
//               <Text style={styles.tableHeaderText}>Cost</Text>
//               <Text style={styles.tableHeaderText}>Qty</Text>
//             </View>
//           </View>
//           <FlatList
//             data={products}
//             renderItem={renderProductItem}
//             keyExtractor={(item) => item.id}
//             style={styles.productList}
//             contentContainerStyle={styles.productListContainer}
//           />
//         </View>

//         <View style={[styles.thirdTable]}>
//           <View style={[styles.thirdTableRow,{}]}>
//             <View style={[styles.thirdTableItem,{width:"25%"}]}>
//               <Text style={styles.thirdTableText}>Free shipping items:</Text>
//             </View>
//             <View style={[styles.thirdTableItem,{width:"55%"}]}>
//               <Text style={styles.thirdTableText}>
//                 El Nino Pro Stock T-Shirt - XL × 1, Masterson Farms Tractor T-Shirt - XL × 1
//               </Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>$0.00</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableRow}>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>Items Subtotal:</Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>$55.00</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableRow}>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>Shipping:</Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>$0.00</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableRow}>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>Order total:</Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>$45.00</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableSeparator} />

//           <View style={styles.thirdTableRow}>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>Paid:</Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>$45.00</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableRow}>
//             <View style={[styles.thirdTableItem,{width:"100%"}]}>
//               <Text style={styles.thirdTableText}>July 23, 2024 via Credit card</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };


import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Linking,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import { AuthContext } from '../Components/AuthProvider';
import axios from 'react-native-axios';

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  // Custom unserialize function
  const unserialize = (data) => {
    let offset = 0;

    const readLength = (str) => {
      let length = '';
      while (str[offset] !== ':') {
        length += str[offset++];
      }
      offset++;
      return parseInt(length, 10);
    };

    const readString = (str) => {
      const length = readLength(str);
      offset++;
      const result = str.substr(offset, length);
      offset += length + 2; // +2 to skip the closing quote and semicolon
      return result;
    };

    const readArray = (str) => {
      const length = readLength(str);
      offset++;
      const result = {};
      for (let i = 0; i < length; i++) {
        const key = unserialize(str);
        const value = unserialize(str);
        result[key] = value;
      }
      offset++;
      return result;
    };

    const unserialize = (str) => {
      const type = str[offset++];
      switch (type) {
        case 's':
          offset++;
          return readString(str);
        case 'a':
          offset++;
          return readArray(str);
        case 'i':
          const intEnd = str.indexOf(';', offset);
          const intValue = parseInt(str.slice(offset, intEnd), 10);
          offset = intEnd + 1;
          return intValue;
        case 'd':
          const floatEnd = str.indexOf(';', offset);
          const floatValue = parseFloat(str.slice(offset, floatEnd));
          offset = floatEnd + 1;
          return floatValue;
        case 'b':
          const boolEnd = str.indexOf(';', offset);
          const boolValue = str.slice(offset, boolEnd) === '1';
          offset = boolEnd + 1;
          return boolValue;
        case 'N':
          return null;
        default:
          throw new Error(`Unknown / unsupported data type(s): ${type}`);
      }
    };

    return unserialize(data);
  };

  const fetchOrder = () => {
    const tokenToUse = userToken?.token || userToken;
    const config = {
      method: 'get',
      url: 'https://bad-gear.com/wp-json/orders/v1/all_orders',
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        const orders = response?.data?.data.map(order => ({
          ...order,
          form_data: unserialize(order.form_data),
        }));

        setOrders(orders);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <View style={styles.productInfo}>
        <View style={styles.productImageContainer}>
          <Image source={item.image} style={styles.productImage} />
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productVariation}>
            Variation ID: {item.variationId}
          </Text>
          <Text style={styles.productSize}>Size: {item.size}</Text>
        </View>
      </View>
      <View style={styles.productPriceQty}>
        <Text style={styles.productCost}>{item.price}</Text>
        <Text style={styles.productQuantity}>× {item.quantity}</Text>
      </View>
      <View style={styles.productSeparator} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TitleHeader title="Order Details" />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        {orders.length > 0 && orders[0] && (
          <>
            <View style={styles.firstTable}>
              <Text style={styles.orderDetailsText}>Order #{orders[0]?.order_id} details</Text>
              <Text style={styles.paymentInfoText}>
                Payment via Credit card (************4343). Paid on {orders[0]?.date}.
              </Text>
              <View style={styles.addressContainer}>
                <View style={styles.addressBlock}>
                  <Text style={styles.addressTitle}>Billing</Text>
                  <Text style={styles.addressText}>
                    {orders[0]?.form_data?.billing_address_1} {orders[0]?.form_data?.billing_address_2}
                    {orders[0]?.form_data?.billing_city}, {orders[0]?.form_data?.billing_state} {orders[0]?.form_data?.billing_zip}
                  </Text>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>Email address</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`mailto:${orders[0]?.form_data?.billing_email}`)} style={styles.emailPhoneTouchable}>
                    <Text style={[styles.addressText, styles.clickableText]}>
                      {orders[0]?.form_data?.billing_email}
                    </Text>
                  </TouchableOpacity>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>Phone</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${orders[0]?.form_data?.billing_phone}`)}>
                    <Text style={[styles.addressText, styles.clickableText]}>
                      {orders[0]?.form_data?.billing_phone}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.addressBlock}>
                  <Text style={styles.addressTitle}>Shipping</Text>
                  <Text style={styles.addressText}>
                    {orders[0]?.form_data?.shipping_address_1} {orders[0]?.form_data?.shipping_address_2}
                    {orders[0]?.form_data?.shipping_city}, {orders[0]?.form_data?.shipping_state} {orders[0]?.form_data?.shipping_zip}
                  </Text>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>Phone</Text>
                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${orders[0]?.form_data?.shipping_phone}`)}>
                    <Text style={[styles.addressText, styles.clickableText]}>
                      {orders[0]?.form_data?.shipping_phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.secondTable}>
              <View style={styles.tableHeader}>
                <View style={styles.tableHeaderItem}>
                  <Text style={styles.tableHeaderText}>Item</Text>
                </View>
                <View style={styles.tableHeaderRow}>
                  <Text style={styles.tableHeaderText}>Cost</Text>
                  <Text style={styles.tableHeaderText}>Qty</Text>
                </View>
              </View>
              <FlatList
                data={orders[0]?.form_data?.product_name || []}
                renderItem={({ item, index }) => (
                  <View style={styles.productContainer}>
                    <View style={styles.productInfo}>
                      <View style={styles.productImageContainer}>
                        <Image source={require('../assets/cat3.png')} style={styles.productImage} />
                      </View>
                      <View style={styles.productDetails}>
                        <Text style={styles.productName}>{item}</Text>
                        <Text style={styles.productVariation}>
                          Variation ID: {orders[0]?.form_data?.product_id[index]}
                        </Text>
                        <Text style={styles.productSize}>Size: {orders[0]?.form_data?.size[index]}</Text>
                      </View>
                    </View>
                    <View style={styles.productPriceQty}>
                      <Text style={styles.productCost}>${orders[0]?.form_data?.product_price[index]}</Text>
                      <Text style={styles.productQuantity}>× {orders[0]?.form_data?.quantity[index]}</Text>
                    </View>
                    <View style={styles.productSeparator} />
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={styles.productList}
                contentContainerStyle={styles.productListContainer}
              />
            </View>

            <View style={styles.thirdTable}>
              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Order total:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>${orders[0]?.total_amount}</Text>
                </View>
              </View>

              <View style={styles.thirdTableSeparator} />

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Paid:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>${orders[0]?.total_amount}</Text>
                </View>
              </View>

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Paid on {orders[0]?.date} via Credit card</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};








const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  header: {
    paddingVertical: 8,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  firstTable: {
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#55555578',
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  orderDetailsText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    marginBottom: 5,
  },
  paymentInfoText: {
    color: '#555',
    fontSize: 15,
    fontFamily: 'Gilroy-Regular',
    lineHeight: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  addressBlock: {
    width: '50%',
  },
  addressTitle: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Gilroy-SemiBold',
  },
  addressText: {
    color: '#555',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
    marginTop: 5,
  },
  clickableText: {
    textDecorationLine: 'underline',

  },
  emailPhoneTouchable: {
    width: '95%',
  },
  secondTable: {
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#55555578',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  tableHeader: {
    height: 50,
    height: 50,
    width: '100%',
    backgroundColor: '#f0f0f1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tableHeaderItem: {
    width: '60%',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '28%',
  },
  tableHeaderText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
  },
  productList: {
    width: '100%',
  },
  productListContainer: {
    paddingVertical: 10,
  },
  productContainer: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  productInfo: {
    width: '66%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productImageContainer: {
    height: 60,
    width: 60,
    backgroundColor: '#ebebeb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    height: 50,
    width: 40,
  },
  productDetails: {
    width: '60%',
  },
  productName: {
    fontSize: 15,
    fontFamily: 'Gilroy-Regular',
  },
  productVariation: {
    fontSize: 13,
    fontFamily: 'Gilroy-Regular',
    marginTop: 5,
  },
  productSize: {
    fontSize: 13,
    fontFamily: 'Gilroy-Regular',
    marginTop: 5,
  },
  productPriceQty: {
    width: '34%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCost: {
    color: '#000',
    fontSize: 15,
  },
  productQuantity: {
    color: '#000',
    fontSize: 15,
  },
  productSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  thirdTable: {
    width: '90%',
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#55555578',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  thirdTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
   
  },
  thirdTableItem: {
    width: '20%',
  },
  thirdTableText: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'Gilroy-Regular',
  },
  thirdTableSeparator: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#000',
    opacity: 0.5,
    marginVertical: 10,
  },
});

export default OrderDetails;

