
// import React, { useEffect, useContext, useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { AuthContext } from '../Components/AuthProvider';
// import { getNewArrivals } from '../Components/ApiService';
// import he from 'he';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'react-native-axios';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import TitleHeader from '../Components/TitleHeader';

// const NewArrival = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);
//   const { userToken, setUserToken } = useContext(AuthContext);
//   console.log("userToken value:", userToken && typeof userToken === 'object' ? userToken.token : userToken);

//   const [arrivalData, setArrivalData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);


//   // const tokenUse = userToken && userToken.token ? userToken.token : 'dummy-token';

//   const tokenUse = (typeof userToken === 'string' && userToken) ? userToken : 'dummy-token';
//   console.log("tokenUse", tokenUse);
  
  
//   const isDummyToken = () => {
//     return tokenUse === 'dummy-token';
//   };


//   const fetchNewArrivals = async (page = 1) => {
//     try {
//       if (page === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }
//       const newArrivalsResponse = await getNewArrivals(page, 10, tokenUse);
//       const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
//         ...arrival,
//         title: arrival.title ? he.decode(arrival.title) : '',
//         wishlist_status: arrival.wishlist_status === 'true',
//       }));

//       if (page === 1) {
//         setArrivalData(decodedArrivalsResponse);
//       } else {
//         setArrivalData(prevData => [...prevData, ...decodedArrivalsResponse]);
//       }

//       if (decodedArrivalsResponse.length < 10) {
//         setAllLoaded(true);
//       }
//     } catch (error) {
//       console.log('Error fetching new arrivals:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//       setLoadingMore(false);
//     }
//   };

//   useFocusEffect(
  
//     useCallback(() => {
//       fetchNewArrivals();
//       console.log("hellooo")
//     }, [userToken])
//   );

//   const handleLoadMore = () => {
//     if (!loadingMore && !allLoaded) {
//       setCurrentPage(prevPage => prevPage + 1);
//       fetchNewArrivals(currentPage + 1);
//     }
//   };

//   const onRefresh = () => {
//     setCurrentPage(1);
//     setAllLoaded(false);
//     fetchNewArrivals(1);
//   };

//   const handleNavigateToProductDetails = (item) => {
//     const tokenExists = userToken && userToken.token ? userToken.token : userToken;
//     console.log("tokenexit",tokenExists)

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
//     // navigation.navigate('ProductDetails',{productId:item.product_id})
//   };

//   const addToWishlist = async productId => {
//     if (isDummyToken()) {
//       Alert.alert(
//         'Please Login',
//         'You need to login to add products to wishlist.',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel',
//           },
//           {
//             text: 'Login',
//             onPress: () => {
//               setUserToken(null);
//               AsyncStorage.removeItem('userData');
//               navigation.reset({
//                 index: 4,
//                 routes: [{ name: 'Login' }],
//               });
//             },
//           },
//         ],
//       );
//       return;
//     }

//     const tokenToUse =
//       userToken && userToken.token ? userToken.token : userToken;

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
//       headers: {
//         Authorization: `${tokenToUse}`,
//       },
//     };

//     try {
//       const response = await axios.request(config);
//       if (response.data.status !== 'success') {
//         console.log('Error: Unexpected response format:', response);
//       }
//     } catch (error) {
//       console.log('Error updating wishlist:', error);
//     }
//   };


//   const renderArrivalItem = ({ item }) => {
//     console.log(`Product ID: ${item.product_id}, Wishlist Status: ${item.wishlist_status}`);
  
//     return (
//       <TouchableOpacity
//         style={{ width: '50%', marginTop: 20 }}
//         onPress={() => handleNavigateToProductDetails(item)}
//       >
//         <View style={styles.Catitem}>
//           <Image style={styles.Catimage} source={{ uri: item.product_img }} />
//         </View>
//         <View style={styles.detailsContainer}>
//           <Text style={styles.productName} numberOfLines={2}>
//             {he.decode(item.product_name)}
//           </Text>
//           <TouchableOpacity
//             onPress={() => {
//               if (isDummyToken()) {
//                 Alert.alert(
//                   'Please Login',
//                   'You need to login to add products to wishlist.',
//                   [
//                     {
//                       text: 'Cancel',
//                       style: 'cancel',
//                     },
//                     {
//                       text: 'Login',
//                       onPress: () => {
//                         setUserToken(null);
//                         AsyncStorage.removeItem('userData');
//                         navigation.reset({
//                           index: 4,
//                           routes: [{ name: 'Login' }],
//                         });
//                       },
//                     },
//                   ],
//                 );
//               } else if (!loading && !loadingMore) {
//                 addToWishlist(item.product_id);
//               }
//             }}
//             disabled={loading || loadingMore}
//             style={{}}
//           >
//             <Image
//               source={
//                 isDummyToken()
//                   ? require('../assets/heart.png') 
//                   : item.wishlist_status
//                     ? require('../assets/like.png')
//                     : require('../assets/heart.png')
//               }
//               style={[
//                 styles.icon,
//                 {
//                   tintColor: !isDummyToken() && item.wishlist_status ? '#F10C18' : '#000000',
//                   opacity: loading || loadingMore ? 0.5 : 1,
//                 },
//               ]}
//             />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.priceContainer}>
//           <Text style={styles.price}>{item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };
  
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
//             keyExtractor={item => item.product_id.toString()}
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={
//               loadingMore ? (
//                 <View style={styles.loading}>
//                   <ActivityIndicator color="#F10C18" size="large" />
//                 </View>
//               ) : null
//             }
//             refreshControl={
//               <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//             }
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
//     resizeMode: 'cover',
 
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 10,
//     marginTop: 1,
//     marginLeft: 10,
//     justifyContent:"space-between",
//     paddingRight:20
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






// import React, { useRef, useCallback, useContext, useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   ActivityIndicator,
//   Alert,
//   RefreshControl,
// } from 'react-native';
// import { AuthContext } from '../Components/AuthProvider';
// import { getNewArrivals } from '../Components/ApiService';
// import he from 'he';
// import axios from 'react-native-axios';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import TitleHeader from '../Components/TitleHeader';
// import LoginBottomSheet from '../Components/LoginBottomSheet';

// const NewArrival = () => {
//   const navigation = useNavigation();
//   const { userToken } = useContext(AuthContext);
//   const bottomSheetRef = useRef(null); // Create a ref for the bottom sheet
//   const [loading, setLoading] = useState(true);
//   const [arrivalData, setArrivalData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [allLoaded, setAllLoaded] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [bottomSheetVisible, setBottomSheetVisible] = useState(false); // New state for bottom sheet visibility

//   const tokenUse = typeof userToken === 'string' && userToken ? userToken : 'dummy-token';
  
//   const isDummyToken = () => tokenUse === 'dummy-token';

//   const openLoginSheet = () => {
//     setBottomSheetVisible(true); // Set visibility state to true
//     bottomSheetRef.current?.expand(); // Open the bottom sheet
//   };

//   const closeLoginSheet = () => {
//     setBottomSheetVisible(false); // Set visibility state to false
//     bottomSheetRef.current?.close(); // Close the bottom sheet
//   };

//   const fetchNewArrivals = async (page = 1) => {
//     try {
//       if (page === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }
//       const newArrivalsResponse = await getNewArrivals(page, 10, tokenUse);
//       const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
//         ...arrival,
//         title: arrival.title ? he.decode(arrival.title) : '',
//         wishlist_status: arrival.wishlist_status === 'true',
//       }));

//       if (page === 1) {
//         setArrivalData(decodedArrivalsResponse);
//       } else {
//         setArrivalData(prevData => [...prevData, ...decodedArrivalsResponse]);
//       }

//       if (decodedArrivalsResponse.length < 10) {
//         setAllLoaded(true);
//       }
//     } catch (error) {
//       console.log('Error fetching new arrivals:', error);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//       setLoadingMore(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchNewArrivals();
//     }, [userToken])
//   );

//   const handleLoadMore = () => {
//     if (!loadingMore && !allLoaded) {
//       setCurrentPage(prevPage => prevPage + 1);
//       fetchNewArrivals(currentPage + 1);
//     }
//   };

//   const onRefresh = () => {
//     setCurrentPage(1);
//     setAllLoaded(false);
//     fetchNewArrivals(1);
//   };

//   const handleNavigateToProductDetails = (item) => {
//     if (userToken) {
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
//             onPress: openLoginSheet,
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   const addToWishlist = async productId => {
//     if (isDummyToken()) {
//       openLoginSheet(); // Show login sheet instead of navigating to the login page
//       return;
//     }

//     const tokenToUse = userToken && userToken.token ? userToken.token : userToken;

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
//       headers: {
//         Authorization: `${tokenToUse}`,
//       },
//     };

//     try {
//       const response = await axios.request(config);
//       if (response.data.status !== 'success') {
//         console.log('Error: Unexpected response format:', response);
//       }
//     } catch (error) {
//       console.log('Error updating wishlist:', error);
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
//           onPress={() => {
//             if (isDummyToken()) {
//               openLoginSheet(); // Show login sheet instead of navigating to the login page
//             } else if (!loading && !loadingMore) {
//               addToWishlist(item.product_id);
//             }
//           }}
//           disabled={loading || loadingMore}
//         >
//           <Image
//             source={
//               isDummyToken()
//                 ? require('../assets/heart.png')
//                 : item.wishlist_status
//                   ? require('../assets/like.png')
//                   : require('../assets/heart.png')
//             }
//             style={[
//               styles.icon,
//               {
//                 tintColor: !isDummyToken() && item.wishlist_status ? '#F10C18' : '#000000',
//                 opacity: loading || loadingMore ? 0.5 : 1,
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
//      {!bottomSheetVisible && <TitleHeader title={'New Arrivals'}  />} 
//       <View style={styles.content}>
//         {loading && currentPage === 1 ? (
//           <View style={styles.loading}>
//             <ActivityIndicator color="#F10C18" size="large" />
//           </View>
//         ) : (
//           <FlatList
//             showsVerticalScrollIndicator={false}
//             numColumns={2}
//             data={arrivalData}
//             renderItem={renderArrivalItem}
//             keyExtractor={item => item.product_id.toString()}
//             onEndReached={handleLoadMore}
//             onEndReachedThreshold={0.1}
//             ListFooterComponent={
//               loadingMore ? (
//                 <View style={styles.loading}>
//                   <ActivityIndicator color="#F10C18" size="large" />
//                 </View>
//               ) : null
//             }
//             refreshControl={
//               <RefreshControl
//                 refreshing={refreshing}
//                 onRefresh={onRefresh}
//                 tintColor="#F10C18"
//               />
//             }
//           />
//         )}
        
//       </View>
//       <LoginBottomSheet bottomSheetRef={bottomSheetRef} closeSheet={closeLoginSheet} />
   
//     </SafeAreaView>
//   );
// };
import React, { useRef, useCallback, useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { AuthContext } from '../Components/AuthProvider';
import { getNewArrivals } from '../Components/ApiService';
import he from 'he';
import axios from 'react-native-axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';
import LoginBottomSheet from '../Components/LoginBottomSheet';

const NewArrival = () => {
  const navigation = useNavigation();
  const { userToken } = useContext(AuthContext);
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [arrivalData, setArrivalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const tokenUse = typeof userToken === 'string' && userToken ? userToken : 'dummy-token';
  
  const isDummyToken = () => tokenUse === 'dummy-token';

  const openLoginSheet = () => {
    setBottomSheetVisible(true); // Set visibility state to true
    bottomSheetRef.current?.expand(); // Open the bottom sheet
  };

  const closeLoginSheet = () => {
    setBottomSheetVisible(false); // Set visibility state to false
    bottomSheetRef.current?.close(); // Close the bottom sheet
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
    if (userToken) {
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
            onPress: openLoginSheet,
          },
        ],
        { cancelable: false }
      );
    }
  };

  const addToWishlist = async productId => {
    if (isDummyToken()) {
      openLoginSheet(); // Show login sheet instead of navigating to the login page
      return;
    }

    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;

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

  const renderArrivalItem = ({ item }) => (
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
              openLoginSheet(); // Show login sheet instead of navigating to the login page
            } else if (!loading && !loadingMore) {
              addToWishlist(item.product_id);
            }
          }}
          disabled={loading || loadingMore}
        >
          <Image
            source={
              isDummyToken()
                ? require('../assets/heart.png')
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

  return (
    <SafeAreaView style={styles.container}>
      {/* Conditionally render TitleHeader and main content based on bottomSheetVisible state */}
      {!bottomSheetVisible && <TitleHeader title={'New Arrivals'} />}
      {!bottomSheetVisible && (
        <View style={styles.content}>
          {loading && currentPage === 1 ? (
            <View style={styles.loading}>
              <ActivityIndicator color="#F10C18" size="large" />
            </View>
          ) : (
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
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor="#F10C18"
                />
              }
            />
          )}
        </View>
      )}
      <LoginBottomSheet 
        bottomSheetRef={bottomSheetRef} 
        closeSheet={closeLoginSheet} 
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FBFCFC',
  },
  content: {
    flex: 1,
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
    justifyContent: 'space-between',
    paddingRight: 20,
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
});

export default NewArrival;









