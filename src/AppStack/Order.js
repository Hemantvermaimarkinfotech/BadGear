// // import React, {useEffect, useState} from 'react';
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   FlatList,
// //   Image,
// // } from 'react-native';
// // import TitleHeader from '../Components/TitleHeader';
// // import OrderImage from '../assets/Arrival1.png';
// // import axios from "react-native-axios";

// // const Order = () => {
// //   const [activeTab, setActiveTab] = useState('All Orders');
// //   const [order,setOrder]=useState([])
// //   console.log("order",order)

// // const allOrder=async()=>{
// // let config = {
// //   method: 'get',
// //   url: 'https://bad-gear.com/wp-json/orders/v1/all_orders',
// //   headers: {
// //     'Authorization': 'Sunil|1719816794|XeLDX1mOhocbFfM2m63xuHRO1FScmL8MsqhuLTTMRkm|93d8ebff5ae347575021ab5d4d08f22d1cca8a7cbed0d3ea0eab8d8a7416a3e1'
// //   }
// // };

// // axios.request(config)
// // .then((response) => {
// //   console.log(JSON.stringify(response.data.data));
// //   setOrder(response?.data?.data)
// // })
// // .catch((error) => {
// //   console.log(error);
// // });

// // }

// // useEffect(()=>{
// //   allOrder()
// // },[])

// //   const renderScreen = () => {
// //     switch (activeTab) {
// //       case 'All Orders':
// //         return <AllOrdersScreen />;
// //       case 'On Delivery':
// //         return <OnDeliveryScreen />;
// //       case 'Completed':
// //         return <CompletedScreen />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const TabButton = ({title}) => (
// //     <TouchableOpacity
// //   style={[
// //     styles.tabButton,
// //     activeTab === title && styles.activeTabButton,
// //   ]}
// //   onPress={() => setActiveTab(title)}>
// //   <Text
// //     style={[
// //       styles.tabButtonText,
// //       activeTab === title && styles.activeTabButtonText, // Apply activeTabButtonText style when the tab is active
// //     ]}>
// //     {title}
// //   </Text>
// // </TouchableOpacity>

// //   );

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <View style={styles.header}>
// //         <TitleHeader title={'Order'} />
// //       </View>
// //       <View style={styles.tabContainer}>
// //         <TabButton title="All Orders" />
// //         <TabButton title="On Delivery" />
// //         <TabButton title="Completed" />
// //       </View>
// //       <View style={styles.screenContainer}>{renderScreen()}</View>
// //     </SafeAreaView>
// //   );
// // };

// // const data = [
// //   {id: '1', title: 'Order 1'},
// //   {id: '2', title: 'Order 2'},
// //   {id: '3', title: 'Order 3'},
// //   // Add more data as needed
// // ];

// // const allorder = [
// //   {
// //     id: '1',
// //     name: 'Woman Sleep suits by Femall clothing',
// //     status: 'OnDelivery',
// //     status2: 'On the way by Courir [H Stefunis]',
// //     image: OrderImage,
// //   },
// //   {
// //     id: '2',
// //     name: 'Woman Sleep suits by Femall clothing',
// //     status: 'OnDelivery',
// //     status2: 'On the way by Courir [H Stefunis]',
// //     image: OrderImage,
// //   },
// //   {
// //     id: '3',
// //     name: 'Brown woman shirts by cocklet cloth',
// //     status: 'Completed',
// //     status2: 'Order recieved by [Louis Stefinis]',
// //     image: OrderImage,
// //   },
// //   // Add more data as needed
// // ];

// // const OnDelivery = [
// //     {
// //       id: '1',
// //       name: 'Woman Sleep suits by Femall clothing',
// //       status: 'OnDelivery',
// //       status2: 'On the way by Courir [H Stefunis]',
// //       image: OrderImage,
// //     },

// //     // Add more data as needed
// //   ];

// //   const Completed = [
// //     {
// //       id: '1',
// //       name: 'Woman Sleep suits by Femall clothing',
// //       status: 'Cancelled',
// //       status2: 'On the way by Courir [H Stefunis]',
// //       image: OrderImage,
// //     },
// //     {
// //       id: '2',
// //       name: 'Woman Sleep suits by Femall clothing',
// //       status: 'OnDelivery',
// //       status2: 'On the way by Courir [H Stefunis]',
// //       image: OrderImage,
// //     },
// //     {
// //       id: '3',
// //       name: 'Brown woman shirts by cocklet cloth',
// //       status: 'Completed',
// //       status2: 'Order recieved by [Louis Stefinis]',
// //       image: OrderImage,
// //     },
// //     // Add more data as needed
// //   ];
// // const renderItem = ({item}) => (
// //   <View style={styles.allorder}>
// //     <View style={styles.row}>
// //       <View style={{width:"85%"}}>
// //         <Text
// //           style={{
// //             color: '#000000',
// //             fontFamily: 'Gilroy',
// //             fontWeight: 600,
// //             fontSize: 14,
// //           }}>
// //           {item.transaction_id}
// //         </Text>
// //         <View style={{marginTop:15}}>
// //           <Text
// //             style={{
// //               color: '#000000',
// //               fontFamily: 'Gilroy-SemiBold',
// //               fontWeight: 600,
// //               fontSize: 14,
// //             }}>
// //             {item?.name}
// //           </Text>
// //         </View>
// //       </View>

// //       <View syle={{height:80,width:"40%%"}}>
// //         <Image
// //           source={item?.image}
// //           style={{height: 60, width: 60, borderRadius: 8}}
// //         />
// //       </View>
// //     </View>

// //     <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
// //     <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
// //     <View style={{flexDirection:"row",alignItems:"center"}}>
// //     <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
// //     <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
// //     </View>
// //     </View>

// //     <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
// //     <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
// //     <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
// //     </View>
// //     <View style={{width:"55%"}}>
// //     <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
// //     </View>
// //     </View>
// //   </View>
// // );

// // const renderOnDelivery = ({item}) => (
// //     <View style={styles.allorder}>
// //       <View style={styles.row}>
// //         <View>
// //           <Text
// //             style={{
// //               color: '#000000',
// //               fontFamily: 'Gilroy',
// //               fontWeight: 600,
// //               fontSize: 14,
// //             }}>
// //             #123456754
// //           </Text>
// //           <View style={{marginTop:15}}>
// //             <Text
// //               style={{
// //                 color: '#000000',
// //                 fontFamily: 'Gilroy-SemiBold',
// //                 fontWeight: 600,
// //                 fontSize: 16,
// //               }}>
// //               {item?.name}
// //             </Text>
// //           </View>
// //         </View>

// //         <View syle={{borderWidth: 1, marginLeft: 20,header:80,width:80,backgroundColor:""}}>
// //           <Image
// //             source={item?.image}
// //             style={{height: 60, width: 60, borderRadius: 8}}
// //           />
// //         </View>
// //       </View>

// //       <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
// //       <View style={{flexDirection:"row",alignItems:"center"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
// //       <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
// //       </View>
// //       </View>

// //       <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
// //       <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
// //       <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
// //       </View>
// //       <View style={{width:"55%"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
// //       </View>
// //       </View>
// //     </View>
// //   );

// //   const renderCompleted = ({item}) => (
// //     <View style={styles.allorder}>
// //       <View style={styles.row}>
// //         <View>
// //           <Text
// //             style={{
// //               color: '#000000',
// //               fontFamily: 'Gilroy',
// //               fontWeight: 600,
// //               fontSize: 14,
// //             }}>
// //             #123456754
// //           </Text>
// //           <View style={{marginTop:15}}>
// //             <Text
// //               style={{
// //                 color: '#000000',
// //                 fontFamily: 'Gilroy-SemiBold',
// //                 fontWeight: 600,
// //                 fontSize: 16,
// //               }}>
// //               {item?.name}
// //             </Text>
// //           </View>
// //         </View>

// //         <View syle={{borderWidth: 1, marginLeft: 20,header:80,width:80,backgroundColor:""}}>
// //           <Image
// //             source={item?.image}
// //             style={{height: 60, width: 60, borderRadius: 8}}
// //           />
// //         </View>
// //       </View>

// //       <View style={{flexDirection:"row",alignItems:"center",marginTop:15,paddingHorizontal:15,justifyContent:"space-between"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:600}}>Grey Varient</Text>
// //       <View style={{flexDirection:"row",alignItems:"center"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:16,fontFamily:"Gilroy",fontWeight:700,marginRight:20}}>1x</Text>
// //       <Text style={{color:"#0D775E",fontSize:16,fontFamily:"Gilroy",fontWeight:700}}>$47.7</Text>
// //       </View>
// //       </View>

// //       <View style={[styles.row,{alignItems:"center",position:"absolute",bottom:20}]}>
// //       <View style={{height:50,width:"40%",borderRadius:8,backgroundColor:"#F10C18",justifyContent:"center",alignItems:"center"}}>
// //       <Text style={{color:"#fff",fontSize:16}}>{item?.status}</Text>
// //       </View>
// //       <View style={{width:"55%"}}>
// //       <Text style={{color:"#6a6a6a",fontSize:15,fontFamily:"Gilroy",fontWeight:600}}>{item?.status2}</Text>
// //       </View>
// //       </View>
// //     </View>
// //   );

// // const AllOrdersScreen = () => {
// //   return (
// //     <FlatList
// //       data={allorder}
// //       renderItem={renderItem}
// //       keyExtractor={item => item.id}
// //       contentContainerStyle={styles.flatListContentContainer}
// //     />
// //   );
// // };

// // const OnDeliveryScreen = () => {
// //   return (
// //     <FlatList
// //       data={OnDelivery}
// //       renderItem={renderOnDelivery}
// //       keyExtractor={item => item.id}
// //       contentContainerStyle={styles.flatListContentContainer}
// //     />
// //   );
// // };

// // const CompletedScreen = () => {
// //   return (
// //     <FlatList
// //       data={Completed}
// //       renderItem={renderCompleted}
// //       keyExtractor={item => item.id}
// //       contentContainerStyle={styles.flatListContentContainer}
// //     />
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#FBFCFC',
// //   },
// //   header: {
// //     paddingVertical: 10,
// //     borderBottomWidth: 1,
// //     borderBottomColor: '#ccc',
// //   },
// //   tabContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     alignItems: 'center',
// //     paddingVertical: 10,
// //     backgroundColor: '#fff',
// //   },
// //   tabButton: {
// //     paddingVertical: 10,
// //     paddingHorizontal: 20,
// //     borderRadius: 5,
// //   },
// //   activeTabButton: {
// //     backgroundColor: '#F10C18',
// //   },
// //   tabButtonText: {
// //     color: '#000000',
// //     fontSize:15,
// //     fontFamily:"Gilroy",
// //     fontWeight:'600'
// //   },
// //   activeTabButtonText: {
// //     color: '#fff',
// //     fontSize:15,
// //     fontFamily:"Gilroy",
// //     fontWeight:'600'
// //   },
// //   screenContainer: {
// //     flex: 1,
// //   },
// //   flatListContentContainer: {
// //     flexGrow: 1,
// //   },
// //   allorder: {
// //     height: 200,
// //     width: '95%',
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     alignSelf: 'center',
// //     marginTop: 10,
// //     ...Platform.select({
// //       ios: {
// //         shadowColor: '#000',
// //         shadowOffset: {width: 0, height: 2},
// //         shadowOpacity: 0.5,
// //         shadowRadius: 2,
// //       },
// //       android: {
// //         elevation: 5,
// //       },
// //     }),
// //   },
// //   row: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 15,
// //     marginTop: 15,
// //     width:"100%"
// //   },
// //   insiderow: {
// //     flexDirection: 'row',
// //     borderWidth: 1,
// //     justifyContent: 'space-between',
// //   },

// // });

// // export default Order;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   Image,
//   ActivityIndicator,
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import axios from 'react-native-axios';
// import OrderImage from '../assets/Arrival1.png';

// const Order = ({navigation}) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const allOrder = async () => {
//     let config = {
//       method: 'get',
//       url: 'https://bad-gear.com/wp-json/orders/v1/all_orders',
//       headers: {
//         'Authorization': 'Sunil|1719816794|XeLDX1mOhocbFfM2m63xuHRO1FScmL8MsqhuLTTMRkm|93d8ebff5ae347575021ab5d4d08f22d1cca8a7cbed0d3ea0eab8d8a7416a3e1'
//       }
//     };

//     try {
//       const response = await axios.request(config);
//       setOrders(response?.data?.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     allOrder();
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title={'Order'} />
//       </View>
//       <View style={styles.screenContainer}>
//         {loading ? (
//          <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
//            <ActivityIndicator size="large" color="#F10207" />
//          </View>
//         ) : (
//           <OrderList data={orders} navigation={navigation} />
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

// const OrderList = ({ data, navigation }) => {
//   const renderItem = ({ item }) => (
//     <View style={styles.allOrder}>
//       <View style={styles.row}>
//         <View style={{ width: '85%' }}>
//           <TouchableOpacity onPress={() => navigation.navigate("OrderDetails")}>
//             <Text style={styles.transactionId}>#{item?.order_id}</Text>
//           </TouchableOpacity>
//           <View style={{ marginTop: 10 }}>
//             <Text style={styles.orderName}>Brown Woman Shirts By Cocklet cloth</Text>
//           </View>
//         </View>
//         <View style={styles.imageContainer}>
//           <Image source={item?.image ? { uri: item?.image } : OrderImage} style={styles.image} />
//         </View>
//       </View>
//       <View style={styles.orderDetails}>
//         <Text style={styles.variantText}>Grey Variant</Text>
//         <View style={styles.orderQuantity}>
//           <Text style={styles.quantityText}>1x</Text>
//           <Text style={styles.priceText}>$47.7</Text>
//         </View>
//       </View>
//       <View style={[styles.row, styles.statusContainer]}>
//         <View style={styles.statusButton}>
//           <Text style={styles.statusText}>completed</Text>
//         </View>
//         <View style={{ width: '55%' }}>
//           <Text style={styles.statusDescription}>{item?.status2}</Text>
//         </View>
//       </View>
//     </View>
//   );

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={item => item.id}
//       contentContainerStyle={styles.flatListContentContainer}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',

//   },
//   header: {
//     paddingBottom: 20,
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 10,
//   },
//   tabButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     backgroundColor: '#E0E0E0',
//   },
//   activeTabButton: {
//     backgroundColor: '#F10207',
//   },
//   tabButtonText: {
//     color: '#000',
//   },
//   activeTabButtonText: {
//     color: '#FFF',
//   },
//   screenContainer: {
//     flex: 1,
//     paddingHorizontal: 10,
//   },
//   allOrder: {
//     padding: 20,
//     marginBottom: 20,
//     borderRadius: 10,
//     backgroundColor: '#F9F9F9',
//     elevation: 1,
//     height:200,

//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',

//   },
//   transactionId: {
//     color: '#000',
//     fontFamily: 'Gilroy',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   orderName: {
//     color: '#000',
//     fontFamily: 'Gilroy-Bold',
//     fontSize: 18,
//     width:"80%",

//   },
//   imageContainer: {
//     height: 80,
//   width:"20%"
//   },
//   image: {
//     height: 60,
//     width: 60,
//     borderRadius: 8,

//   },
//   orderDetails: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//     paddingHorizontal: 15,
//     justifyContent: 'space-between',
//   },
//   variantText: {
//     color: '#6a6a6a',
//     fontSize: 16,
//     fontFamily: 'Gilroy',
//     fontWeight: '600',
//   },
//   orderQuantity: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityText: {
//     color: '#6a6a6a',
//     fontSize: 16,
//     fontFamily: 'Gilroy',
//     fontWeight: '700',
//     marginRight: 20,
//   },
//   priceText: {
//     color: '#0D775E',
//     fontSize: 16,
//     fontFamily: 'Gilroy',
//     fontWeight: '700',
//   },
//   statusContainer: {
//     // alignItems: 'center',
//     // position: 'absolute',
//     // bottom: 20,
//     marginTop:10
//   },
//   statusButton: {
//     height: 40,
//     width: '40%',
//     borderRadius: 8,
//     backgroundColor: '#F10C18',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   statusDescription: {
//     color: '#6a6a6a',
//     fontSize: 15,
//     fontFamily: 'Gilroy',
//     fontWeight: '600',
//   },
//   flatListContentContainer: {
//     paddingBottom: 20,
//   },
// });

// export default Order;
import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../Components/AuthProvider';
import axios from 'react-native-axios';

const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userToken}=useContext(AuthContext)
  
  const fetchOrders = () => {
    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
    const config = {
      method: 'get',
      url: 'https://bad-gear.com/wp-json/orders/v1/all_orders',
      headers: {
        Authorization: `${tokenToUse}`, // Ensure proper format
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response?.data));
        setOrders(response?.data?.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePress = order => {
    navigation.navigate('OrderDetails', { order });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? '#EFEFEF' : '#FFFFFF' },
      ]}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.cell}>#{item.order_id}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.status || 'N/A'}</Text>
      <Text style={styles.cell}>{item.total_amount}</Text>
      <Text style={styles.cell}>{item.origin || 'N/A'}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TitleHeader title={'Order'} />
      </View>
      <View style={styles.screenContainer}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#F10207" />
          </View>
        ) : (
          <>
            {/* Header Row */}
            <View style={styles.headerRow}>
              <Text style={[styles.cell, styles.headerText]}>Order</Text>
              <Text style={[styles.cell, styles.headerText]}>Date</Text>
              <Text style={[styles.cell, styles.headerText]}>Status</Text>
              <Text style={[styles.cell, styles.headerText]}>Total</Text>
              <Text style={[styles.cell, styles.headerText]}>Origin</Text>
            </View>
            <FlatList showsVerticalScrollIndicator={false}
              data={orders}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.flatListContentContainer}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  header: {
    paddingBottom: 20,
  },
  screenContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  cell: {
    fontSize: 13,
    color: '#000000',
    width: '20%',
    textAlign: 'center',
    fontFamily: 'Gilroy',
  },
  headerText: {
    color: '#000000',
    fontFamily: 'Gilroy-Bold',
  },
});

export default Order;
