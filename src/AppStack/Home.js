// #This code is written by Hemant Verma

import React, {useEffect, useContext, useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../Components/AuthProvider';
import {
  getNewArrivals,
  getCategory,
  getBanner,
  AddWishlist,
  getBestSelling,
} from '../Components/ApiService';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from '../Components/Skelton';
import axios from 'react-native-axios';
import {useNavigation} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const imageWidth2 = screenWidth / 2.5;
const aspectRatio = 16 / 25; // Assuming a standard aspect ratio
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
];

const Home = ({item}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const {userToken, setUserToken} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [Arrivals, setArrivals] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [username, setUsername] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  console.log('userdataaa', userData?.user_data?.data.user_login);

  const ensureMinLength = (str, minLength) => {
    if (str.length >= minLength) return str;
    return str + ' '.repeat(minLength - str.length);
  };

  const capitalizeFirstLetter = str => {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return '';
  };

  // Function to check if the token is a dummy token
  const isDummyToken = () => {
    return userToken === 'dummy-token';
  };

  // Function to handle navigation with token check
  const handleNavigation = page => {
    if (isDummyToken()) {
      Alert.alert('Access Denied', 'You are not login.');
    } else {
      navigation.navigate(page);
    }
  };

  const BestSellingDATA = [
    {
      id: '1',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival1.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '2',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival2.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '3',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival1.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '4',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival2.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '5',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival1.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '6',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival2.png'),
      rate: '$39.95 - $44.95',
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setRefreshing(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      setUserData(userData);

      // Fetch banner
      const bannerResponse = await getBanner(userToken);
      if (bannerResponse.status === 'success') {
        const {data} = bannerResponse;
        setBanner(data);
      } else {
        console.log('Error fetching banner:');
      }

      // Fetch categories
      const categoriesResponse = await getCategory(userToken);
      setCategories(categoriesResponse);

      // Fetch new arrivals
      const newArrivalsResponse = await getNewArrivals(userToken);

      // Decode HTML entities in arrival data
      const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
        ...arrival,
        title: arrival.title ? he.decode(arrival.title) : '',
      }));

      setArrivals(decodedArrivalsResponse);

      // Fetch BestSelling
      const BestSellingResponse = await getBestSelling(userToken);
      setBestSelling(BestSellingResponse);
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userToken]);

  const onRefresh = useCallback(() => {
    fetchData();
  }, [userToken]);

  // const addToWishlist = async productId => {
  //   if (isDummyToken()) {
  //     Alert.alert('Access Denied', 'You are using a dummy token.');
  //     return;
  //   }
  //   const tokenToUse = userToken && userToken.token ? userToken.token : userToken;

  //   let config = {
  //     method: 'post',
  //     url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
  //     headers: {
  //       Authorization: `${tokenToUse}`,
  //     },
  //   };

  //   try {
  //     const response = await axios.request(config);
  //     console.log(JSON.stringify(response.data));

  //     if (response.data.status === 'success') {
  //       console.log('Successfully added and removed from wishlist');
  //     } else {
  //       console.log('Error: Unexpected response format:', response);
  //     }
  //   } catch (error) {
  //     console.log('Error deleting Wishlist Item:', error);
  //   }
  // };

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
                index: 4, // Index of the Login screen
                routes: [{name: 'Login'}],
              });
            },
          },
        ],
      );
      return;
    }

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;

    let config = {
      method: 'post',
      url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      if (response.data.status === 'success') {
        console.log('Successfully added and removed from wishlist');
      } else {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error deleting Wishlist Item:', error);
    }
  };

  const renderBestSellingItem = ({item, navigation}) => (
    <View activeOpacity={0.92} style={[{width: imageWidth, marginTop: 10}]}>
      <View style={styles.Arrivelitem}>
        <Image source={item.image} style={styles.Arrivalimage} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginTop: 10,
          marginLeft: 20,
        }}>
        <Text
          numberOfLines={2}
          style={{
            color: '#000000',
            fontSize: 15,
            width: 100,
            textAlign: 'center',
            fontWeight: 600,
            fontFamily: 'Gilroy-SemiBold',
          }}
          key={`${item.id}_text`}>
          {item.text}
        </Text>
        <TouchableOpacity
          onPress={() => {
            addToWishlist(item.id);
          }}
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={`${item.id}_heart`}>
          <Image
            source={require('../assets/heart.png')}
            style={{tintColor: '#000000'}}
          />
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: 'center', marginTop: 10}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontWeight: 500,
            marginLeft: 18,
            fontFamily: 'Gilroy-SemiBold',
          }}
          key={`${item.id}_rate`}>
          {item.rate}
        </Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text
            style={{
              color: '#000000',
              fontSize: 22,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            Welcome{' '}
            {userData &&
              capitalizeFirstLetter(
                JSON.parse(userData).user_data?.data?.user_login,
              )}
          </Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image
              source={require('../assets/search.png')}
              style={{height: 25, width: 25, tintColor: '#000000'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleNavigation('WishList')}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Search')}>
            <Image
              source={require('../assets/search.png')}
              style={{height: 25, width: 25, tintColor: '#000000'}}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.banner}>
          {loading ? (
            <Skeleton
              style={{width: '98%', height: 200, borderRadius: 20}}
              skeletonHeight={200}
              skeletonWidth={'98%'}
              borderRadius={20}
            />
          ) : (
            <>
              <View style={{height: 200, width: '98%'}}>
                <Image
                  source={{uri: banner?.banner_image}}
                  style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: 200,
                    borderRadius: 10,
                  }}
                />
              </View>
              <Text
                numberOfLines={3}
                style={{
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: 18,
                  top: 20,
                  width: '70%',
                  textAlign: 'center',
                  position: 'absolute',
                  height: 200, // Set the same height as the banner image
                  fontFamily: 'Gilroy-Bold',
                }}>
                {banner?.banner_heading}
              </Text>
            </>
          )}
        </View>

        <View style={styles.category}>
          <View style={styles.categoryheader}>
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Category
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily: 'Gilroy-Medium',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={
                loading ? Array.from(Array(7).keys()) : categories.slice(0, 7)
              }
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('SingleCategory', {
                        ProductId: item.cat_id,
                      })
                    }
                    style={styles.categoryItem}
                    key={item.cat_id}
                    disabled={loading}>
                    <View style={styles.catitem}>
                      {loading ? (
                        <Skeleton
                          style={styles.image}
                          skeletonHeight={60}
                          skeletonWidth={60}
                          borderRadius={30}
                        />
                      ) : (
                        <Image
                          style={styles.image}
                          source={{uri: item.cat_image}}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: '#000000',
                        fontSize: 15,
                        fontFamily: 'Gilroy-SemiBold',
                      }}>
                      {loading ? (
                        <View
                          style={{
                            marginLeft: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Skeleton skeletonHeight={16} skeletonWidth={90} />
                        </View>
                      ) : item?.cat_name.length > 14 ? (
                        item?.cat_name.substring(0, 14) + '...'
                      ) : (
                        item?.cat_name
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={styles.NewArrivel}>
          <View style={styles.Arrivelheader}>
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                // fontWeight: 600,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              New Arrivals
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewArrival')}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily: 'Gilroy-Medium',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={
                loading ? Array.from(Array(7).keys()) : Arrivals.slice(0, 7)
              }
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.92}
                    style={{width: imageWidth}}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        productId: item.product_id,
                        productName: item.product_name,
                        productDescription: item.description,
                        productImg: item.product_img,
                        productPrice: item.price,
                      })
                    }
                    disabled={loading}>
                    <View style={[styles.Arrivelitem, {marginTop: 10}]}>
                      {loading ? (
                        <Skeleton
                          style={[styles.Arrivalimage, {height: 150}]}
                          duration={1000}
                          skeletonHeight={150}
                          skeletonWidth={125}
                        />
                      ) : (
                        item?.product_img && (
                          <Image
                            style={styles.Arrivalimage}
                            source={{uri: item.product_img}}
                          />
                        )
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      {loading ? (
                        <Skeleton
                          style={{
                            color: '#000000',
                            fontSize: 14,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                          skeletonHeight={20}
                          skeletonWidth={120}
                          duration={1000}
                        />
                      ) : (
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#000000',
                            fontSize: 15,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: '600',
                            fontFamily: 'Gilroy-SemiBold',
                            lineHeight: 18,
                          }}>
                          {he.decode(item.product_name)}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.product_id);
                          addToWishlist(item.product_id);
                        }}>
                        <Image
                          source={require('../assets/heart.png')}
                          style={{tintColor: '#000000'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', marginTop: 10}}>
                      {loading ? (
                        <Skeleton
                          duration={1000}
                          style={{
                            width: 60,
                            height: 16,
                            borderRadius: 2,
                            marginLeft: 18,
                          }}
                          skeletonHeight={16}
                          skeletonWidth={60}
                          marginLeft={18}
                          marginTop={0}
                        />
                      ) : (
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 17,
                            fontWeight: '500',
                            marginLeft: 18,
                            fontFamily: 'Gilroy-SemiBold',
                          }}>
                          {item?.price}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <View style={styles.Arrivelheader}>
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Best Selling
            </Text>
          </View>
          {/* <View>
            <FlatList
              keyExtractor={(item, index) => `${item.id}_${index}`}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={BestSellingDATA}
              renderItem={({item}) => renderBestSellingItem({item, navigation})}
            />
          </View> */}
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={
                loading ? Array.from(Array(7).keys()) : bestSelling.slice(0, 7)
              }
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.92}
                    style={{width: imageWidth}}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {
                        productId: item.product_id,
                        productName: item.product_name,
                        productDescription: item.description,
                        productImg: item.product_img,
                        productPrice: item.price,
                      })
                    }
                    disabled={loading}>
                    <View style={[styles.Arrivelitem, {marginTop: 10}]}>
                      {loading ? (
                        <Skeleton
                          style={[styles.Arrivalimage, {height: 150}]}
                          duration={1000}
                          skeletonHeight={150}
                          skeletonWidth={125}
                        />
                      ) : (
                        item?.product_image && (
                          <Image
                            style={styles.Arrivalimage}
                            source={{uri: item?.product_image}}
                          />
                        )
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 10,
                        marginTop: 10,
                      }}>
                      {loading ? (
                        <Skeleton
                          style={{
                            color: '#000000',
                            fontSize: 14,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                          skeletonHeight={20}
                          skeletonWidth={120}
                          duration={1000}
                        />
                      ) : (
                        <Text
                          numberOfLines={2}
                          style={{
                            color: '#000000',
                            fontSize: 15,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: '600',
                            fontFamily: 'Gilroy-SemiBold',
                            lineHeight: 18,
                          }}>
                          {he.decode(item.product_name)}
                        </Text>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          console.log(item.product_id);
                          addToWishlist(item.product_id);
                        }}>
                        <Image
                          source={require('../assets/heart.png')}
                          style={{tintColor: '#000000'}}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', marginTop: 10}}>
                      {loading ? (
                        <Skeleton
                          duration={1000}
                          style={{
                            width: 60,
                            height: 16,
                            borderRadius: 2,
                            marginLeft: 18,
                          }}
                          skeletonHeight={16}
                          skeletonWidth={60}
                          marginLeft={18}
                          marginTop={0}
                        />
                      ) : (
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 17,
                            fontWeight: '500',
                            marginLeft: 18,
                            fontFamily: 'Gilroy-SemiBold',
                          }}>
                          ${item?.price}
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 20,
    resizeMode: 'contain',
  },
  banner: {
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 10,
  },

  catitem: {
    margin: 10,
    alignItems: 'center',
    height: 93,
    width: 93,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    // resizeMode:"contain"
  },

  Arrivelheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  Arrivelitem: {
    marginLeft: 10,
    alignItems: 'center',
    height: 170,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
  Arrivalimage: {
    width: 125,
    height: 145,
    borderRadius: 15,
  },
  gradientContainer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  shimmerPlaceholder: {
    flex: 1,
  },
});
