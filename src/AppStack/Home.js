// #This code is written by Hemant Verma

import React, {
  useEffect,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
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
  getBestSelling,
  getCategory,
  getBanner,
  getWishList,
  getProductDetails,
  addCart,
} from '../Components/ApiService';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Skeleton from '../Components/Skelton';
import axios from 'react-native-axios';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const imageWidth2 = screenWidth / 2.5;
const aspectRatio = 16 / 25;
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
import LoginBottomSheet from '../Components/LoginBottomSheet';

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
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = useRef(null); // Create a ref for the bottom sheet

  const tokenUse = userToken && userToken.token ? userToken.token : userToken;

  const openLoginSheet = () => {
    bottomSheetRef.current?.expand(); // Open the bottom sheet
  };

  const closeLoginSheet = () => {
    bottomSheetRef.current?.close(); // Close the bottom sheet
  };

  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const isDummyToken = () => {
    return userToken === 'dummy-token';
  };

  const handleNavigation = page => {
    if (isDummyToken()) {
      // Alert.alert('Access Denied', 'You are not login.');
      openLoginSheet();
    } else {
      navigation.navigate(page);
    }
  };

  // Function to fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);

      await fetchUserData();
      await fetchBanner();
      await fetchCategories();
      await fetchNewArrivals();
      await fetchBestSelling();
    } catch (error) {
      console.log('Error fetching data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      setUserData(userData);
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const fetchBanner = async () => {
    try {
      const bannerResponse = await getBanner();
      if (bannerResponse.status === 'success') {
        const {data} = bannerResponse;
        setBanner(data);
      } else {
        console.log('Error fetching banner:');
      }
    } catch (error) {
      console.log('Error fetching banner:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesResponse = await getCategory(tokenUse);
      setCategories(categoriesResponse);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchNewArrivals = async () => {
    try {
      const newArrivalsResponse = await getNewArrivals(1, 10, tokenUse);
      const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
        ...arrival,
        title: arrival.title ? he.decode(arrival.title) : '',
        wishlist_status: arrival.wishlist_status === 'true',
      }));
      // console.log('newarrivalsresponsedata', decodedArrivalsResponse);
      setArrivals(decodedArrivalsResponse);
    } catch (error) {
      console.log('Error fetching new arrivals:', error);
    }
  };

  const fetchBestSelling = async () => {
    try {
      const bestSellingResponse = await getBestSelling(1, tokenUse);
      const decodedBestSellingResponse = bestSellingResponse.map(item => ({
        ...item,
        title: item.title ? he.decode(item.title) : '',
        wishlist_status: item.wishlist_status === 'true',
      }));
      // console.log('bestSellingResponseData', decodedBestSellingResponse);
      setBestSelling(decodedBestSellingResponse);
    } catch (error) {
      console.log('Error fetching best selling:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [userToken]),
  );

  const onRefresh = useCallback(() => {
    fetchData();
  }, [userToken]);

  const addToWishlist = async productId => {
    if (isDummyToken()) {
      openLoginSheet();
      return;
    }

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;

    // Optimistically update the wishlist status
    setArrivals(prevArrivals =>
      prevArrivals.map(arrival =>
        arrival.product_id === productId
          ? {...arrival, wishlist_status: !arrival.wishlist_status}
          : arrival,
      ),
    );

    setBestSelling(prevBestSelling =>
      prevBestSelling.map(item =>
        item.product_id === productId
          ? {...item, wishlist_status: !item.wishlist_status}
          : item,
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
      if (response.data.status === 'success') {
        fetchNewArrivals();
        fetchBestSelling();
      } else {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error updating wishlist:', error);
      fetchNewArrivals();
      fetchBestSelling();
    }
  };

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
              truncateText(
                capitalizeFirstLetter(
                  JSON.parse(userData).user_data?.data?.user_login,
                ),
                10,
              )}
          </Text>
        </View>

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
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
                  height: 200,
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
                    onPress={() => {
                      console.log('Product ID:', item.product_id);
                      navigation.navigate('ProductDetails', {
                        productId: item.product_id,
                        productName: item.product_name,
                        productDescription: item.description,
                        productImg: item.product_img,
                        productPrice: item.price,
                      });
                    }}
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
                          if (isDummyToken()) {
                            openLoginSheet();
                          } else if (!loading) {
                            addToWishlist(item.product_id);
                          }
                        }}
                        disabled={loading}
                        style={{}}>
                        {loading ? (
                          <Skeleton
                            duration={1000}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                            }}
                            skeletonHeight={20}
                            skeletonWidth={20}
                          />
                        ) : (
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
                                tintColor:
                                  !isDummyToken() && item.wishlist_status
                                    ? '#F10C18'
                                    : '#000000',
                              },
                            ]}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', marginTop: 10}}>
                      {loading ? (
                        <Skeleton
                          duration={1000}
                          style={{
                            width: 40,
                            height: 10,
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
                      {/* <TouchableOpacity
                        onPress={() => {
                          console.log(item.product_id);
                          addToWishlist(item.product_id);
                        }}>
                        <Image
                          source={require('../assets/heart.png')}
                          style={{tintColor: '#000000'}}
                        />
                      </TouchableOpacity> */}
                      <TouchableOpacity
                        onPress={() => {
                          if (isDummyToken()) {
                            openLoginSheet();
                          } else if (!loading) {
                            addToWishlist(item.product_id);
                          }
                        }}
                        disabled={loading}
                        style={{}}>
                        {loading ? (
                          <Skeleton
                            duration={1000}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 12,
                            }}
                            skeletonHeight={20}
                            skeletonWidth={20}
                          />
                        ) : (
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
                                tintColor:
                                  !isDummyToken() && item.wishlist_status
                                    ? '#F10C18'
                                    : '#000000',
                                opacity: loading ? 0.5 : 1,
                              },
                            ]}
                          />
                        )}
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
      </ScrollView>
      <LoginBottomSheet
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeLoginSheet}
      />
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
  icon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
});
