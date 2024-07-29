// #This code is written by Hemant Verma

// import React, { useEffect, useState, useContext } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   SafeAreaView,
//   FlatList,
//   ActivityIndicator,
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from 'react-native-axios';

// const Order = ({ navigation }) => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {userToken}=useContext(AuthContext)
  
//   const fetchOrders = () => {
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
//         console.log(JSON.stringify(response?.data));
//         setOrders(response?.data?.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const handlePress = order => {
//     navigation.navigate('OrderDetails', { order });
//   };

//   const renderItem = ({ item, index }) => (
//     <TouchableOpacity
//       style={[
//         styles.row,
//         { backgroundColor: index % 2 === 0 ? '#EFEFEF' : '#FFFFFF' },
//       ]}
//      onPress={()=>navigation.navigate('OrderDetails', { orderId: item.order_id })}
//     >
//       <Text style={styles.cell}>#{item.order_id}</Text>
//       <Text style={styles.cell}>{item.date}</Text>
//       <Text style={styles.cell}>{item.status || 'N/A'}</Text>
//       <Text style={styles.cell}>{item.total_amount}</Text>
//       <Text style={styles.cell}>{item.origin || 'N/A'}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TitleHeader title={'Order'} />
//       </View>
//       <View style={styles.screenContainer}>
//         {loading ? (
//           <View style={styles.loaderContainer}>
//             <ActivityIndicator size="large" color="#F10207" />
//           </View>
//         ) : (
//           <>
//             {/* Header Row */}
//             <View style={styles.headerRow}>
//               <Text style={[styles.cell, styles.headerText]}>Order</Text>
//               <Text style={[styles.cell, styles.headerText]}>Date</Text>
//               <Text style={[styles.cell, styles.headerText]}>Status</Text>
//               <Text style={[styles.cell, styles.headerText]}>Total</Text>
//               <Text style={[styles.cell, styles.headerText]}>Origin</Text>
//             </View>
//             <FlatList showsVerticalScrollIndicator={false}
//               data={orders}
//               renderItem={renderItem}
//               keyExtractor={item => item.id}
//               contentContainerStyle={styles.flatListContentContainer}
//             />
//           </>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };

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
  const { userToken } = useContext(AuthContext);

  const fetchOrders = () => {
    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
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

  const handlePress = (orderId, formData) => {
    navigation.navigate('OrderDetails', { orderId, formData });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.row,
        { backgroundColor: index % 2 === 0 ? '#EFEFEF' : '#FFFFFF' },
      ]}
      onPress={() => handlePress(item.order_id, item.form_data)}
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
            <FlatList
              showsVerticalScrollIndicator={false}
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

