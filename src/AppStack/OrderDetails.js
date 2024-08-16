// // #This code is written by Hemant Verma
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   FlatList
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from 'react-native-axios';
// import { ScrollView } from 'react-native-virtualized-view';

// const OrderDetails = ({route}) => {
//   const [orders, setOrders] = useState([]);
//   const { orderId, formData } = route.params;
//   console.log("ordersssss",orders)
//   const [loading, setLoading] = useState(true);
//   const { userToken } = useContext(AuthContext);

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
//       if (offset >= str.length) {
//         throw new Error('Unexpected end of data');
//       }
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

//     try {
//       return unserialize(data);
//     } catch (error) {
//       console.log('Unserialize Error:', error);
//       return {};
//     }
//   };

//   useEffect(() => {
//     // Unserialize the formData
//     if (formData) {
//       try {
//         const unserializedData = unserialize(formData);
//         setOrders(unserializedData);
//       } catch (error) {
//         console.error('Error unserializing data:', error);
//       }
//     }
//   }, [formData]);

//   const fetchOrder = () => {
//     const tokenToUse = userToken?.token || userToken;

//     const config = {
//       method: 'get',
//       url: `https://bad-gear.com/wp-json/order_detail/v1/order_detail?order_id=${orderId}`,
//       headers: {
//         Authorization: `${tokenToUse}`, // Ensure proper format
//       },
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log('Raw Response Data:', response.data);
//         const orders = response?.data?.data.map((order) => {
//           try {
//             const formData = unserialize(order.form_data);
//             formData.product_image = Array.isArray(formData.product_image[0])
//               ? formData.product_image[0]
//               : [formData.product_image];
//             return {
//               ...order,
//               form_data: formData,
//             };
//           } catch (error) {
//             console.log('Error unserializing form_data:', error);
//             return order;
//           }
//         });
//         console.log('Parsed Orders:', orders);
//         setOrders(orders);
//       })
//       .catch((error) => {
//         console.log('Error fetching orders:', error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);

// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   FlatList,
//   ScrollView
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from 'react-native-axios';
// import { unserialize } from 'php-unserialize';

// const OrderDetails = ({ route }) => {
//   const [orderDetails, setOrderDetails] = useState(null);
//   console.log("orderDetails",orderDetails)
//   const [loading, setLoading] = useState(true);
//   const { userToken } = useContext(AuthContext);
//   const { orderId } = route.params;

//   const fetchOrder = async () => {
//     try {
//       const tokenToUse = userToken?.token || userToken;
//       const response = await axios.get(`https://bad-gear.com/wp-json/order_detail/v1/order_detail?order_id=${orderId}`, {
//         headers: {
//           Authorization: `${tokenToUse}`,
//         },
//       });

//       // Unserialize PHP data
//       const orderData = response.data.data[0];
//       const formData = unserialize(orderData.form_data);

//       setOrderDetails({
//         ...orderData,
//         formData
//       });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   if (loading) {
//     return <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
//       <ActivityIndicator size={"large"} color={"#F10C18"}/>
//     </View>;
//   }

//   const renderProductItem = ({item}) => {
//     const formData = unserialize(item.form_data);
//     const productImageUrl = formData.product_iamge?.['NaN']?.['NaN'];
//     const quantity = formData.quantity?.['NaN'];
//     const productPrice = formData.product_price?.['NaN'];
//  return(
//   <View style={styles.productContainer}>
//   <View style={styles.productInfo}>
//     <View style={styles.productImageContainer}>
//       <Image source={{uri: productImageUrl }} style={styles.productImage} />
//     </View>
//     <View style={styles.productDetails}>
//       <Text style={styles.productName}>{item.name}</Text>
//       <Text style={styles.productVariation}>
//         Variation ID: {item.variationId}
//       </Text>
//       <Text style={styles.productSize}>Size: {item.size}</Text>
//     </View>
//   </View>
//   <View style={styles.productPriceQty}>
//     <Text style={styles.productCost}>${productPrice}</Text>
//     <Text style={styles.productQuantity}>× {quantity}</Text>
//   </View>
//   <View style={styles.productSeparator} />
// </View>
//  )
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title="Order Details" />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}>
//         {orders.length > 0 && orders[0] && (
//           <>
//             <View style={styles.firstTable}>
//               <Text style={styles.orderDetailsText}>
//                 Order #{orders[0]?.order_id} details
//               </Text>
//               <Text style={styles.paymentInfoText}>
//                 Payment via Credit card (************4343). Paid on{' '}
//                 {orders[0]?.date}.
//               </Text>
//               <View style={styles.addressContainer}>
//                 <View style={styles.addressBlock}>
//                   <Text style={styles.addressTitle}>Billing</Text>
//                   <Text style={styles.addressText}>
//                     {orders[0]?.form_data?.billing_address_1}{' '}
//                     {orders[0]?.form_data?.billing_address_2}
//                     {orders[0]?.form_data?.billing_city},{' '}
//                     {orders[0]?.form_data?.billing_state}{' '}
//                     {orders[0]?.form_data?.billing_zip}
//                   </Text>
//                   <Text style={[styles.addressTitle, {marginTop: 10}]}>
//                     Email address
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(
//                         `mailto:${orders[0]?.form_data?.billing_email}`,
//                       )
//                     }
//                     style={styles.emailPhoneTouchable}>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.billing_email}
//                     </Text>
//                   </TouchableOpacity>
//                   <Text style={[styles.addressTitle, {marginTop: 10}]}>
//                     Phone
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(
//                         `tel:${orders[0]?.form_data?.billing_phone}`,
//                       )
//                     }>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.billing_phone}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.addressBlock}>
//                   <Text style={styles.addressTitle}>Shipping</Text>
//                   <Text style={styles.addressText}>
//                     {orders[0]?.form_data?.shipping_address_1}{' '}
//                     {orders[0]?.form_data?.shipping_address_2}
//                     {orders[0]?.form_data?.shipping_city},{' '}
//                     {orders[0]?.form_data?.shipping_state}{' '}
//                     {orders[0]?.form_data?.shipping_zip}
//                   </Text>
//                   <Text style={[styles.addressTitle, {marginTop: 10}]}>
//                     Phone
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(
//                         `tel:${orders[0]?.form_data?.shipping_phone}`,
//                       )
//                     }>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.shipping_phone}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.secondTable}>
//               <View style={styles.tableHeader}>
//                 <View style={styles.tableHeaderItem}>
//                   <Text style={styles.tableHeaderText}>Item</Text>
//                 </View>
//                 <View style={styles.tableHeaderRow}>
//                   <Text style={styles.tableHeaderText}>Cost</Text>
//                   <Text style={styles.tableHeaderText}>Qty</Text>
//                 </View>
//               </View>

//               <FlatList
//                 data={orders}
//                 renderItem={renderProductItem}
//                 keyExtractor={item => item.id}
//                 style={styles.productList}
//                 contentContainerStyle={styles.productListContainer}
//               />
//             </View>

// <View style={[styles.thirdTable]}>
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
//               <Text style={styles.thirdTableText}> ${orders[0]?.total_amount}</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableSeparator} />

//           <View style={styles.thirdTableRow}>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}>Paid:</Text>
//             </View>
//             <View style={styles.thirdTableItem}>
//               <Text style={styles.thirdTableText}> ${orders[0]?.total_amount}</Text>
//             </View>
//           </View>

//           <View style={styles.thirdTableRow}>
//             <View style={[styles.thirdTableItem,{width:"100%"}]}>
//               <Text style={styles.thirdTableText}>Paid on {orders[0]?.date} via Credit card</Text>
//             </View>
//           </View>
//         </View>
//           </>
//         )}
//       </ScrollView>

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
//   },
//   scrollViewContent: {
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   firstTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     padding: 20,
//     marginBottom: 10,
//     backgroundColor: '#FFFFFF',
//   },
//   orderDetailsText: {
//     color: '#000',
//     fontSize: 18,
//     fontFamily: 'Gilroy-Regular',
//     marginBottom: 5,
//   },
//   paymentInfoText: {
//     color: '#555',
//     fontSize: 15,
//     fontFamily: 'Gilroy-Regular',
//     lineHeight: 20,
//   },
//   addressContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   addressBlock: {
//     width: '50%',
//   },
//   addressTitle: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-SemiBold',
//   },
//   addressText: {
//     color: '#555',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   clickableText: {
//     textDecorationLine: 'underline',
//   },
//   emailPhoneTouchable: {
//     width: '95%',
//   },
//   secondTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//   },
//   tableHeader: {
//     height: 50,
//     height: 50,
//     width: '100%',
//     backgroundColor: '#f0f0f1',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   tableHeaderItem: {
//     width: '60%',
//   },
//   tableHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '28%',
//   },
//   tableHeaderText: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//   },
//   productList: {
//     width: '100%',
//   },
//   productListContainer: {
//     paddingVertical: 10,
//   },
//   productContainer: {
//     width: '100%',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 25,
//     paddingBottom:20,
//     paddingHorizontal:12

//   },
//   productInfo: {
//     width: '66%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   productImageContainer: {
//     height: 60,
//     width: 60,
//     backgroundColor: '#ebebeb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productImage: {
//     height: 50,
//     width: 40,
//   },
//   productDetails: {
//     width: '60%',
//   },
//   productName: {
//     fontSize: 15,
//     fontFamily: 'Gilroy-Regular',
//   },
//   productVariation: {
//     fontSize: 13,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   productSize: {
//     fontSize: 13,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   productPriceQty: {
//     width: '34%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 8,
//     alignItems:"center",

//   },
//   productCost: {
//     color: '#000',
//     fontSize: 15,
//   },
//   productQuantity: {
//     color: '#000',
//     fontSize: 15,
//   },
//   productSeparator: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     marginVertical: 10,
//   },
//   thirdTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   thirdTableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   thirdTableItem: {
//     width: '20%',
//   },
//   thirdTableText: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//   },
//   thirdTableSeparator: {
//     borderBottomWidth: 0.3,
//     borderBottomColor: '#000',
//     opacity: 0.5,
//     marginVertical: 10,
//   },
// });

// export default OrderDetails;

// #This code is written by Hemant Verma
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
//   FlatList,
//   Linking,
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from 'react-native-axios';
// import { ScrollView } from 'react-native-virtualized-view';

// const OrderDetails = ({ route }) => {
//   const [orders, setOrders] = useState([]);
//   console.log("orders".orders)
//   const [loading, setLoading] = useState(true);
//   const { userToken } = useContext(AuthContext);

//   const { orderId, formData } = route.params;
//   console.log("orderId",orderId)

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
//         const key = unserializeItem(str);
//         const value = unserializeItem(str);
//         result[key] = value;
//       }
//       offset++;
//       return result;
//     };

//     const unserializeItem = (str) => {
//       if (offset >= str.length) {
//         throw new Error('Unexpected end of data');
//       }
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

//     try {
//       return unserializeItem(data);
//     } catch (error) {
//       console.log('Unserialize Error:', error);
//       return {};
//     }
//   };

//   const unserializedFormData = unserialize(formData);
//   console.log("Unserialized FormData:", JSON.stringify(unserializedFormData, null, 2));

//   useEffect(() => {
//     // Simulate API call to fetch orders
//     setTimeout(() => {
//       setOrders([{ id: 1, order_id: orderId, form_data: unserializedFormData, date: 'July 23, 2024' }]);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
//         <ActivityIndicator size={"large"} color={"#F10C18"} />
//       </View>
//     );
//   }

//   const renderProductItem = ({ item }) => {
//     const productName = item.product_name?.['NaN'];
//     console.log("productName",productName)
//     const quantity = item.form_data.quantity?.['NaN'];
//     const productPrice = item.form_data.product_price?.['NaN'];
//     const productImageUrl = item.form_data.product_iamge?.['NaN']?.['NaN']

//     return (
//       <View style={styles.productContainer}>
//         <View style={styles.productInfo}>
//           <View style={styles.productImageContainer}>
//             <Image source={{ uri: productImageUrl }} style={styles.productImage} />
//           </View>
//           <View style={styles.productDetails}>
//             <Text style={styles.productName}>{productName}</Text>
//             <Text style={styles.productVariation}>Variation ID: {item.variationId}</Text>
//             <Text style={styles.productSize}>Size: {item.size}</Text>
//           </View>
//         </View>
//         <View style={styles.productPriceQty}>
//           <Text style={styles.productCost}>${productPrice}</Text>
//           <Text style={styles.productQuantity}>× {quantity}</Text>
//         </View>
//         <View style={styles.productSeparator} />
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title="Order Details" />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}>
//         {orders.length > 0 && orders[0] && (
//           <>
//             <View style={styles.firstTable}>
//               <Text style={styles.orderDetailsText}>
//                 Order #{orders[0]?.order_id} details
//               </Text>
//               <Text style={styles.paymentInfoText}>
//                 Payment via Credit card (************4343). Paid on {orders[0]?.date}.
//               </Text>
//               <View style={styles.addressContainer}>
//                 <View style={styles.addressBlock}>
//                   <Text style={styles.addressTitle}>Billing</Text>
//                   <Text style={styles.addressText}>
//                     {orders[0]?.form_data?.billing_address_1} {orders[0]?.form_data?.billing_address_2}
//                     {orders[0]?.form_data?.billing_city}, {orders[0]?.form_data?.billing_state} {orders[0]?.form_data?.billing_zip}
//                   </Text>
//                   <Text style={[styles.addressTitle, { marginTop: 10 }]}>
//                     Email address
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(`mailto:${orders[0]?.form_data?.billing_email}`)
//                     }
//                     style={styles.emailPhoneTouchable}>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.billing_email}
//                     </Text>
//                   </TouchableOpacity>
//                   <Text style={[styles.addressTitle, { marginTop: 10 }]}>
//                     Phone
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(`tel:${orders[0]?.form_data?.billing_phone}`)
//                     }>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.billing_phone}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={styles.addressBlock}>
//                   <Text style={styles.addressTitle}>Shipping</Text>
//                   <Text style={styles.addressText}>
//                     {orders[0]?.form_data?.shipping_address_1} {orders[0]?.form_data?.shipping_address_2}
//                     {orders[0]?.form_data?.shipping_city}, {orders[0]?.form_data?.shipping_state} {orders[0]?.form_data?.shipping_zip}
//                   </Text>
//                   <Text style={[styles.addressTitle, { marginTop: 10 }]}>
//                     Phone
//                   </Text>
//                   <TouchableOpacity
//                     onPress={() =>
//                       Linking.openURL(`tel:${orders[0]?.form_data?.shipping_phone}`)
//                     }>
//                     <Text style={[styles.addressText, styles.clickableText]}>
//                       {orders[0]?.form_data?.shipping_phone}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>

//             <View style={styles.secondTable}>
//               <View style={styles.tableHeader}>
//                 <View style={styles.tableHeaderItem}>
//                   <Text style={styles.tableHeaderText}>Item</Text>
//                 </View>
//                 <View style={styles.tableHeaderRow}>
//                   <Text style={styles.tableHeaderText}>Cost</Text>
//                   <Text style={styles.tableHeaderText}>Qty</Text>
//                 </View>
//               </View>

//               <FlatList
//                 data={[orders[0]]} // Use the single order data
//                 renderItem={renderProductItem}
//                 keyExtractor={(item) => item.id.toString()}
//                 style={styles.productList}
//                 contentContainerStyle={styles.productListContainer}
//               />
//             </View>

//             <View style={[styles.thirdTable]}>
//               <View style={[styles.thirdTableRow, {}]}>
//                 <View style={[styles.thirdTableItem, { width: "25%" }]}>
//                   <Text style={styles.thirdTableText}>Free shipping items:</Text>
//                 </View>
//                 <View style={[styles.thirdTableItem, { width: "55%" }]}>
//                   <Text style={styles.thirdTableText}>
//                     El Nino Pro Stock T-Shirt - XL × 1, Masterson Farms Tractor T-Shirt - XL × 1
//                   </Text>
//                 </View>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>$0.00</Text>
//                 </View>
//               </View>

//               <View style={styles.thirdTableRow}>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>Items Subtotal:</Text>
//                 </View>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>$55.00</Text>
//                 </View>
//               </View>

//               <View style={styles.thirdTableRow}>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>Shipping:</Text>
//                 </View>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>$0.00</Text>
//                 </View>
//               </View>

//               <View style={styles.thirdTableRow}>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>Order total:</Text>
//                 </View>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}> ${orders[0]?.total_amount}</Text>
//                 </View>
//               </View>

//               <View style={styles.thirdTableSeparator} />

//               <View style={styles.thirdTableRow}>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}>Paid:</Text>
//                 </View>
//                 <View style={styles.thirdTableItem}>
//                   <Text style={styles.thirdTableText}> ${orders[0]?.total_amount}</Text>
//                 </View>
//               </View>

//               <View style={styles.thirdTableRow}>
//                 <View style={[styles.thirdTableItem, { width: "100%" }]}>
//                   <Text style={styles.thirdTableText}>Paid on {orders[0]?.date} via Credit card</Text>
//                 </View>
//               </View>
//             </View>
//           </>
//         )}
//       </ScrollView>
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
//   },
//   scrollViewContent: {
//     alignItems: 'center',
//     paddingBottom: 20,
//   },
//   firstTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     padding: 20,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
//   orderDetailsText: {
//     color: '#000',
//     fontSize: 18,
//     fontFamily: 'Gilroy-Regular',
//     marginBottom: 5,
//   },
//   paymentInfoText: {
//     color: '#555',
//     fontSize: 15,
//     fontFamily: 'Gilroy-Regular',
//     lineHeight: 20,
//   },
//   addressContainer: {
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   addressBlock: {
//     width: '50%',
//   },
//   addressTitle: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-SemiBold',
//   },
//   addressText: {
//     color: '#555',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   clickableText: {
//     textDecorationLine: 'underline',
//   },
//   emailPhoneTouchable: {
//     width: '95%',
//   },
//   secondTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     paddingBottom:20,

//   },
//   tableHeader: {
//     height: 50,
//     height: 50,
//     width: '100%',
//     backgroundColor: '#f0f0f1',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   tableHeaderItem: {
//     width: '60%',
//   },
//   tableHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '28%',
//   },
//   tableHeaderText: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//   },
//   productList: {
//     width: '100%',
//   },
//   productListContainer: {
//     paddingVertical: 10,
//   },
//   productContainer: {
//     width: '100%',
//     alignSelf: 'center',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 25,
//     paddingHorizontal:20

//   },
//   productInfo: {
//     width: '66%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   productImageContainer: {
//     height: 60,
//     width: 60,
//     backgroundColor: '#ebebeb',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productImage: {
//     height: 50,
//     width: 40,
//   },
//   productDetails: {
//     width: '60%',
//   },
//   productName: {
//     fontSize: 15,
//     fontFamily: 'Gilroy-Regular',
//   },
//   productVariation: {
//     fontSize: 13,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   productSize: {
//     fontSize: 13,
//     fontFamily: 'Gilroy-Regular',
//     marginTop: 5,
//   },
//   productPriceQty: {
//     width: '35%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 8,
//     alignItems:"center",
//     paddingLeft:15
//   },
//   productCost: {
//     color: '#000',
//     fontSize: 15,
//   },
//   productQuantity: {
//     color: '#000',
//     fontSize: 15,
//   },
//   productSeparator: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     marginVertical: 10,
//   },
//   thirdTable: {
//     width: '90%',
//     borderWidth: 1,
//     alignSelf: 'center',
//     borderColor: '#55555578',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   thirdTableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   thirdTableItem: {
//     width: '20%',
//   },
//   thirdTableText: {
//     color: '#000',
//     fontSize: 14,
//     fontFamily: 'Gilroy-Regular',
//   },
//   thirdTableSeparator: {
//     borderBottomWidth: 0.3,
//     borderBottomColor: '#000',
//     opacity: 0.5,
//     marginVertical: 10,
//   },
// });

// export default OrderDetails;

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import { AuthContext } from '../Components/AuthProvider';
import axios from 'react-native-axios';
import {ScrollView} from 'react-native-virtualized-view';

const OrderDetails = ({ route }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userToken } = useContext(AuthContext);
  const { orderId } = route.params;
  
  const [itemsSubtotal, setItemsSubtotal] = useState(0); // Add state for items subtotal

  // Function to format free shipping items
  const formatFreeShippingItems = (productNames) => {
    return productNames.map(item => {
      if (Array.isArray(item)) {
        return item[0];
      } else {
        return Object.values(item)[0];
      }
    }).join(', ');
  };

  const fetchOrderDetails = () => {
    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
    setLoading(true);

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://bad-gear.com/wp-json/order_detail/v1/order_detail?order_id=${orderId}`,
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        const orderData = response?.data?.data[0];
        setOrderDetails(orderData);

        // Calculate items subtotal
        const subtotal = orderData.form_data.product_price.reduce((acc, price) => acc + parseFloat(price), 0);
        setItemsSubtotal(subtotal);

        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F10C18" />
      </View>
    );
  }

  const renderProductItem = ({ item, index }) => {
    const productName = item?.['NaN'];
    const quantity = orderDetails?.form_data?.quantity[index];
    const productPrice = orderDetails?.form_data?.product_price[index];
    const productImageUrl = 'https://via.placeholder.com/150'; // Replace with actual image URL

    return (
      <View style={styles.productContainer}>
        <View style={styles.productInfo}>
          <View style={styles.productImageContainer}>
            <Image source={{ uri: productImageUrl }} style={styles.productImage} />
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productVariation}>Variation ID: {item.variationId}</Text>
            <Text style={styles.productSize}>Size: {item.size}</Text>
          </View>
        </View>
        <View style={styles.productPriceQty}>
          <Text style={styles.productCost}>${productPrice}</Text>
          <Text style={styles.productQuantity}>× {quantity}</Text>
        </View>
        <View style={styles.productSeparator} />
      </View>
    );
  };

  // Function to format card number
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return '**** **** **** ****';
    const lastFourDigits = cardNumber.slice(-4);
    return `**** **** **** ${lastFourDigits}`;
  };


  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader />
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {orderDetails && (
          <>
            <View style={styles.firstTable}>
              <Text style={styles.orderDetailsText}>
                Order #{orderDetails?.order_id} details
              </Text>
              <Text style={styles.paymentInfoText}>
                Payment via Credit card ({formatCardNumber(orderDetails?.form_data?.card_number)}). Paid on {orderDetails?.date}.
              </Text>
              <View style={styles.addressContainer}>
                <View style={styles.addressBlock}>
                  <Text style={styles.addressTitle}>Billing</Text>
                  <Text style={styles.addressText}>
                    {orderDetails?.form_data?.billing_address_1} {orderDetails?.form_data?.billing_address_2}
                    {orderDetails?.form_data?.billing_city}, {orderDetails?.form_data?.billing_state} {orderDetails?.form_data?.billing_zip}
                  </Text>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>
                    Email address
                  </Text>
              <Text style={{color:"#000000",fontFamily:"Gilroy",fontSize:14}}>{orderDetails?.form_data?.billing_email}</Text>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>
                    Phone
                  </Text>
              
                  <Text style={{color:"#000000",fontFamily:"Gilroy",fontSize:14}}>{orderDetails?.form_data?.billing_phone}</Text>
                </View>
                <View style={styles.addressBlock}>
                  <Text style={styles.addressTitle}>Shipping</Text>
                  <Text style={styles.addressText}>
                    {orderDetails?.form_data?.shipping_address_1} {orderDetails?.form_data?.shipping_address_2}
                    {orderDetails?.form_data?.shipping_city}, {orderDetails?.form_data?.shipping_state} {orderDetails?.form_data?.shipping_zip}
                  </Text>
                  <Text style={[styles.addressTitle, { marginTop: 10 }]}>
                    Phone
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`tel:${orderDetails?.form_data?.shipping_phone}`)
                    }>
                    <Text style={[styles.addressText, styles.clickableText]}>
                      {orderDetails?.form_data?.shipping_phone}
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
                data={orderDetails.form_data.product_name} // Use the product names
                renderItem={renderProductItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.productList}
                contentContainerStyle={styles.productListContainer}
              />
            </View>

            <View style={styles.thirdTable}>
              <View style={styles.thirdTableRow}>
                <View style={[styles.thirdTableItem, { width: '25%' }]}>
                  <Text style={styles.thirdTableText}>Free shipping items:</Text>
                </View>
                <View style={[styles.thirdTableItem, { width: '55%' }]}>
                  <Text style={styles.thirdTableText}>
                  {formatFreeShippingItems(orderDetails.form_data.product_name)}
                  </Text>
                </View>
              
              </View>

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Items Subtotal:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>${itemsSubtotal.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Shipping:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>$0.00</Text>
                </View>
              </View>

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Order total:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>${orderDetails?.total_amount}</Text>
                </View>
              </View>

              <View style={styles.thirdTableSeparator} />

              <View style={styles.thirdTableRow}>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>Paid:</Text>
                </View>
                <View style={styles.thirdTableItem}>
                  <Text style={styles.thirdTableText}>${orderDetails?.total_amount}</Text>
                </View>
              </View>

              <View style={styles.thirdTableRow}>
                <View style={[styles.thirdTableItem, { width: '100%' }]}>
                  <Text style={styles.thirdTableText}>Paid on {orderDetails?.date} via Credit card</Text>
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
    padding: 16,
    backgroundColor:"#FBFCFC"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  firstTable: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  orderDetailsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentInfoText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressBlock: {
    flex: 1,
    marginHorizontal: 8,
  },
  addressTitle: {
    color:"#000000",fontFamily:"Gilroy",fontSize:16
  },
  addressText: {
    fontSize: 14,
    color: '#000000',
    marginTop: 4,
  },
  clickableText: {
    color: '#1E90FF',
  },
  emailPhoneTouchable: {
    marginTop: 4,
  },
  secondTable: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderItem: {
    flex: 1,
  },
  tableHeaderRow: {
    flexDirection: 'row',
  },
  tableHeaderText: {
    fontSize: 16,
    color:"#000000",
    fontFamily:"Gilroy"
    
  },
  productList: {
    marginTop: 8,
  },
  productListContainer: {
    paddingBottom: 20,
  },
  productContainer: {
    marginBottom: 8,
  },
  productInfo: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  productImageContainer: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    color: '#000000',
    fontFamily:"Gilroy"
  },
  productVariation: {
    fontSize: 14,
    color: '#000000',
    fontFamily:"Gilroy"
  },
  productSize: {
    fontSize: 14,
    color: '#000000',
    fontFamily:"Gilroy"
  },
  productPriceQty: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productCost: {
    fontSize: 16,
    color:"#000000",
    fontFamily:"Gilroy"
  },
  productQuantity: {
    fontSize: 14,
    color: '##000000',
    fontFamily:"Gilroy"
  },
  productSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 8,
  },
  thirdTable: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  thirdTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  thirdTableItem: {
    flex: 1,
  },
  thirdTableText: {
    fontSize: 14,
    color: '#000000',
    fontFamily:"Gilroy"
  },
  thirdTableSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default OrderDetails;
