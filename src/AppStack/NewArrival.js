// // #This code is written by Hemant Verma

// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { getNewArrivals } from '../Components/ApiService';
// import he from "he";
// import { AuthContext } from '../Components/AuthProvider';
// import axios from "react-native-axios";

// const NewArrival = ({ navigation }) => {
//   const [arrivalData, setArrivalData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(10); 
//   const { userToken } = useContext(AuthContext);

//   useEffect(() => {
//     fetchNewArrivals();
//   }, [currentPage]);

//   useEffect(() => {
//     if (arrivalData.length > 0 && arrivalData.length % itemsPerPage === 0) {
//       fetchNewArrivals();
//     }
//   }, [arrivalData]);

//   const isDummyToken = () => {
//     return userToken === 'dummy-token';
//   };


//   const fetchNewArrivals = async () => {
//     if (loading || allLoaded) return;

//     try {
//       setLoading(true);
//       const response = await getNewArrivals(currentPage, itemsPerPage);
//       const decodedResponse = response.map(arrival => ({
//         ...arrival,
//         title: arrival.title ? he.decode(arrival.title) : '',
//       }));

//       setArrivalData(prevData => [...prevData, ...decodedResponse]);

//       if (decodedResponse.length < itemsPerPage) {
//         setAllLoaded(true);
//       }

//     } catch (error) {
//       console.log('Error fetching new arrivals:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loading && !allLoaded) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handleNavigateToProductDetails = (item) => {
//     const tokenExists = userToken && userToken.token ? userToken.token : userToken;

//     if (tokenExists) {
//       navigation.navigate('ProductDetails', {
//         productId: item.product_id,
//       });
//     } else {
//       Alert.alert(
//         'Please Login',
//         'You need to login to view product details.',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Login',
//             onPress: () => navigation.navigate('Login'),
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   const handleAddToWishlist = async (item) => {
//     const tokenExists = userToken && userToken.token;

//     if (tokenExists) {
//       const productId = item.product_id;

//       try {
//         const config = {
//           method: 'post',
//           url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
//           headers: {
//             Authorization: `Bearer ${userToken.token}`,
//           },
//         };

//         const response = await axios.request(config);
//         console.log(response?.data?.successmsg);
//       } catch (error) {
//         console.log('Error adding to Wishlist:', error.message);
//       }
//     } else {
//       navigation.navigate('Login');
//     }
//   };

//   const renderArrivalItem = ({ item }) => {
//     return (
//       <TouchableOpacity style={{ width: "50%", marginTop: 20 }} onPress={() =>
//         handleNavigateToProductDetails(item)
//       }>
//         <View style={styles.Catitem}>
//           <Image style={styles.Catimage} source={{ uri: item?.product_img }} />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             paddingHorizontal: 10,
//             marginTop: 1,
//             marginLeft: 10
//           }}>
//           <Text
//             numberOfLines={2}
//             style={{
//               color: '#000000',
//               fontSize: 15,
//               width: 120,
//               fontWeight: '600',
//               fontFamily: "Gilroy-SemiBold",
//               lineHeight: 18,
//             }}>
//             {he.decode(item?.product_name)}
//           </Text>
//           <TouchableOpacity onPress={() => handleAddToWishlist(item)}
//             style={{
//               height: 30,
//               width: 30,
//               backgroundColor: '#fff',
//               borderRadius: 30,
//               alignItems: 'center',
//               justifyContent: 'center',
//               marginLeft: 10
//             }}>
//             <Image
//               source={require('../assets/heart.png')}
//               style={{ tintColor: '#000000' }}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={{ justifyContent: 'center', marginTop: 5 }}>
//           <Text
//             style={{
//               color: '#000000',
//               fontSize: 17,
//               fontWeight: '500',
//               marginLeft: 18,
//               fontFamily: "Gilroy-SemiBold"
//             }}>
//             {item?.price}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <TitleHeader title={'New Arrivals'} />
//       {loading && currentPage === 1 ? (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator color="#F10C18" size="large" />
//         </View>
//       ) : (
//         <View style={{ width: "100%", alignSelf: "center", flex: 1 }}>
//           <FlatList
//             showsVerticalScrollIndicator={false}
//             numColumns={2}
//             data={arrivalData}
//             renderItem={renderArrivalItem}
//             keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={loading ? (
//               <View style={styles.loading}>
//                 <ActivityIndicator color="#F10C18" size="large" />
//               </View>
//             ) : null}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// export default NewArrival;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: "100%",
//     backgroundColor: "#FBFCFC"
//   },
//   Catitem: {
//     margin: 10,
//     alignItems: 'center',
//     height: 190,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderColor: '#E5E5E5',
//     borderWidth: 1,
//     justifyContent: 'center',
//   },
//   Catimage: {
//     width: 125,
//     height: 145,
//     resizeMode: "cover"
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// #This code is written by Hemant Verma

// import React, { useContext, useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import TitleHeader from '../Components/TitleHeader';
// import { getNewArrivals } from '../Components/ApiService';
// import he from 'he';
// import { AuthContext } from '../Components/AuthProvider';
// import axios from 'react-native-axios';

// const NewArrival = ({ navigation }) => {
//   const [arrivalData, setArrivalData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [itemsPerPage, setItemsPerPage] = useState(10); 
//   const { userToken } = useContext(AuthContext);

//   useEffect(() => {
//     fetchNewArrivals();
//   }, [currentPage]);

//   const isDummyToken = () => {
//     return userToken === 'dummy-token';
//   };

//   const fetchNewArrivals = async () => {
//     if (loading || allLoaded) return;
  
//     try {
//       setLoading(true);
//       const response = await getNewArrivals(currentPage, itemsPerPage);
//       const decodedResponse = response.map(arrival => ({
//         ...arrival,
//         title: arrival.product_name ? he.decode(arrival.product_name) : '',
//         wishlist_status: arrival.wishlist_status === 'true', // Ensure it's a boolean
//       }));
  
//       setArrivalData(prevData => {
//         const combinedData = [...prevData, ...decodedResponse];
//         const uniqueData = Array.from(
//           new Map(combinedData.map(item => [item.product_id, item])).values()
//         );
//         return uniqueData;
//       });
  
//       if (decodedResponse.length < itemsPerPage) {
//         setAllLoaded(true);
//       }
  
//     } catch (error) {
//       console.log('Error fetching new arrivals:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLoadMore = () => {
//     if (!loading && !allLoaded) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handleNavigateToProductDetails = (item) => {
//     const tokenExists = userToken && userToken.token ? userToken.token : userToken;

//     if (tokenExists) {
//       navigation.navigate('ProductDetails', {
//         productId: item.product_id,
//       });
//     } else {
//       Alert.alert(
//         'Please Login',
//         'You need to login to view product details.',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Login',
//             onPress: () => navigation.navigate('Login'),
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   const addToWishlist = async productId => {
//     if (isDummyToken()) {
//       Alert.alert(
//         'Please Login',
//         'You need to login to add products to wishlist.',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Login', onPress: () => navigation.navigate('Login') },
//         ],
//       );
//       return;
//     }
  
//     const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
  
//     // Optimistically update the wishlist status
//     setArrivalData(prevArrivals =>
//       prevArrivals.map(arrival =>
//         arrival.product_id === productId
//           ? { ...arrival, wishlist_status: !arrival.wishlist_status }
//           : arrival,
//       ),
//     );
  
//     const config = {
//       method: 'post',
//       url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
//       headers: { Authorization: `${tokenToUse}` },
//     };
  
//     try {
//       const response = await axios.request(config);
//       if (response.data.status === 'success') {
//         // Optionally refetch new arrivals to ensure data is up-to-date
//         console.log("addWishlist and removed")
//         fetchNewArrivals();
//       } else {
//         console.log('Error: Unexpected response format:', response);
//       }
//     } catch (error) {
//       console.log('Error updating wishlist:', error);
//       // Optionally refetch new arrivals to ensure data is up-to-date if needed
//       fetchNewArrivals();
//     }
//   };

//   const renderArrivalItem = ({ item }) => (
//     <TouchableOpacity
//       style={{ width: '50%', marginTop: 20 }}
//       onPress={() => handleNavigateToProductDetails(item)}
//     >
//       <View style={styles.Catitem}>
//         <Image style={styles.Catimage} source={{ uri: item.product_img }} />
//       </View>
//       <View style={styles.detailsContainer}>
//         <Text style={styles.productName} numberOfLines={2}>
//           {he.decode(item.product_name)}
//         </Text>
//         <TouchableOpacity
//           onPress={() => addToWishlist(item.product_id)}
//           disabled={loading}
//         >
//           <Image
//             source={require("../assets/heart.png")}
//             style={[
//               styles.icon,
//               {
//                 tintColor: item.wishlist_status ? 'red' : 'gray', // Change color based on wishlist_status
//                 opacity: loading ? 0.5 : 1,
//               },
//             ]}
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.priceContainer}>
//         <Text style={styles.price}>{item.price}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <TitleHeader title={'New Arrivals'} />
//       {loading && currentPage === 1 ? (
//         <View style={styles.loading}>
//           <ActivityIndicator color="#F10C18" size="large" />
//         </View>
//       ) : (
//         <View style={styles.flatListContainer}>
//           <FlatList
//             showsVerticalScrollIndicator={false}
//             numColumns={2}
//             data={arrivalData}
//             renderItem={renderArrivalItem}
//             keyExtractor={item => item.product_id.toString()} // Use product_id as key
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={loading ? (
//               <View style={styles.loading}>
//                 <ActivityIndicator color="#F10C18" size="large" />
//               </View>
//             ) : null}
//           />
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: '#FBFCFC'
//   },
//   Catitem: {
//     margin: 10,
//     alignItems: 'center',
//     height: 190,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderColor: '#E5E5E5',
//     borderWidth: 1,
//     justifyContent: 'center',
//   },
//   Catimage: {
//     width: 125,
//     height: 145,
//     resizeMode: 'cover'
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginTop: 1,
//     marginLeft: 10,
//   },
//   productName: {
//     color: '#000000',
//     fontSize: 15,
//     width: 120,
//     fontWeight: '600',
//     fontFamily: 'Gilroy-SemiBold',
//     lineHeight: 18,
//   },
//   priceContainer: {
//     justifyContent: 'center',
//     marginTop: 5,
//   },
//   price: {
//     color: '#000000',
//     fontSize: 17,
//     fontWeight: '500',
//     marginLeft: 18,
//     fontFamily: 'Gilroy-SemiBold',
//   },
//   loading: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   icon: {
//     height: 18,
//     width: 18,
//     resizeMode: 'contain',
//   },
//   flatListContainer: {
//     width: '100%',
//     alignSelf: 'center',
//     flex: 1,
//   },
// });

// export default NewArrival;




import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { AuthContext } from '../Components/AuthProvider';
import { getNewArrivals } from '../Components/ApiService';
import he from 'he';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

const NewArrival = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const { userToken, setUserToken } = useContext(AuthContext);
  console.log("usertoken", userToken);

  const [arrivalData, setArrivalData] = useState([]);
  console.log("arrivalDta",arrivalData)
  const [currentPage, setCurrentPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Determine the token to use
  // const tokenUse = userToken && userToken.token ? userToken.token : 'dummy-token';

  const tokenUse =
      userToken && userToken.token ? userToken.token : userToken;

  // Function to check if the token is a dummy token
  const isDummyToken = () => {
    return userToken === 'dummy-token' || userToken === null;
  };


  const fetchNewArrivals = async (page = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      const newArrivalsResponse = await getNewArrivals(page, 10, tokenUse);
      const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
        ...arrival,
        title: arrival.title ? he.decode(arrival.title) : '',
        wishlist_status: arrival.wishlist_status === 'true',
      }));

      if (page === 1) {
        setArrivalData(decodedArrivalsResponse);
      } else {
        setArrivalData(prevData => [...prevData, ...decodedArrivalsResponse]);
      }

      if (decodedArrivalsResponse.length < 10) {
        setAllLoaded(true);
      }
    } catch (error) {
      console.log('Error fetching new arrivals:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useFocusEffect(
  
    useCallback(() => {
      fetchNewArrivals();
      console.log("hellooo")
    }, [userToken])
  );

  const handleLoadMore = () => {
    if (!loadingMore && !allLoaded) {
      setCurrentPage(prevPage => prevPage + 1);
      fetchNewArrivals(currentPage + 1);
    }
  };

  const onRefresh = () => {
    setCurrentPage(1);
    setAllLoaded(false);
    fetchNewArrivals(1);
  };

  const handleNavigateToProductDetails = (item) => {
    const tokenExists = userToken && userToken.token ? userToken.token : userToken;

    if (tokenExists) {
      navigation.navigate('ProductDetails', {
        productId: item.product_id,
      });
    } else {
      Alert.alert(
        'Please Login',
        'You need to login to view product details.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const addToWishlist = async productId => {
    if (isDummyToken()) {
      Alert.alert(
        'Please Login',
        'You need to login to add products to wishlist.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => {
              setUserToken(null);
              AsyncStorage.removeItem('userData');
              navigation.reset({
                index: 4,
                routes: [{ name: 'Login' }],
              });
            },
          },
        ],
      );
      return;
    }

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;

    setArrivalData(prevArrivals =>
      prevArrivals.map(arrival =>
        arrival.product_id === productId
          ? { ...arrival, wishlist_status: !arrival.wishlist_status }
          : arrival,
      ),
    );

    const config = {
      method: 'post',
      url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    try {
      const response = await axios.request(config);
      if (response.data.status !== 'success') {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error updating wishlist:', error);
    }
  };


  const renderArrivalItem = ({ item }) => {
    console.log(`Product ID: ${item.product_id}, Wishlist Status: ${item.wishlist_status}`);
  
    return (
      <TouchableOpacity
        style={{ width: '50%', marginTop: 20 }}
        onPress={() => handleNavigateToProductDetails(item)}
      >
        <View style={styles.Catitem}>
          <Image style={styles.Catimage} source={{ uri: item.product_img }} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.productName} numberOfLines={2}>
            {he.decode(item.product_name)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (isDummyToken()) {
                Alert.alert(
                  'Please Login',
                  'You need to login to add products to wishlist.',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel',
                    },
                    {
                      text: 'Login',
                      onPress: () => {
                        setUserToken(null);
                        AsyncStorage.removeItem('userData');
                        navigation.reset({
                          index: 4,
                          routes: [{ name: 'Login' }],
                        });
                      },
                    },
                  ],
                );
              } else if (!loading && !loadingMore) {
                addToWishlist(item.product_id);
              }
            }}
            disabled={loading || loadingMore}
            style={{}}
          >
            <Image
              source={
                isDummyToken()
                  ? require('../assets/heart.png') // Always show placeholder when using dummy token
                  : item.wishlist_status
                    ? require('../assets/like.png')
                    : require('../assets/heart.png')
              }
              style={[
                styles.icon,
                {
                  tintColor: !isDummyToken() && item.wishlist_status ? '#F10C18' : '#000000',
                  opacity: loading || loadingMore ? 0.5 : 1,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'New Arrivals'} />
      {loading && currentPage === 1 ? (
        <View style={styles.loading}>
          <ActivityIndicator color="#F10C18" size="large" />
        </View>
      ) : (
        <View style={styles.flatListContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={arrivalData}
            renderItem={renderArrivalItem}
            keyExtractor={item => item.product_id.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              loadingMore ? (
                <View style={styles.loading}>
                  <ActivityIndicator color="#F10C18" size="large" />
                </View>
              ) : null
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FBFCFC'
  },
  Catitem: {
    margin: 10,
    alignItems: 'center',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
 
  },
  Catimage: {
    width: 125,
    height: 145,
    resizeMode: 'cover',
 
  },
  detailsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 1,
    marginLeft: 10,
    justifyContent:"space-between",
    paddingRight:20
  },
  productName: {
    color: '#000000',
    fontSize: 15,
    width: 120,
    fontWeight: '600',
    fontFamily: 'Gilroy-SemiBold',
    lineHeight: 18,
  },
  priceContainer: {
    justifyContent: 'center',
    marginTop: 5,
  },
  price: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '500',
    marginLeft: 18,
    fontFamily: 'Gilroy-SemiBold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
  flatListContainer: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
});

export default NewArrival;




