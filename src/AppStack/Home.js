import React, {useEffect, useContext, useState} from 'react';
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
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../Components/AuthProvider';
import {
  getNewArrivals,
  getCategory,
  getBanner,
  AddWishlist,
} from '../Components/ApiService';
import AntDesign from 'react-native-vector-icons/Feather';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import he from 'he';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const aspectRatio = 16 / 25; // Assuming a standard aspect ratio
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
  // category data
];

const Home = ({navigation, item}) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const {userToken} = useContext(AuthContext);
  const [userData, setUserData] = useState(null); // State for userData
console.log("userTokenHomePAge",userToken)


  const [Arrivals, setArrivals] = useState([]);
  const [username, setUsername] = useState('');
  const [wishlist, setWishlist] = useState([]); // State for wishlist
  // const [userDataa, setUserData] = useState(null); // State for userData
  // console.log("userDataa",userDataa)

  const ensureMinLength = (str, minLength) => {
    if (str.length >= minLength) return str;
    return str + ' '.repeat(minLength - str.length);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
    // Best Selling data
  ];

  useEffect( () => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true
        const userData = await AsyncStorage.getItem('userData');
        setUserData(userData); // Set userData to state
  

        // Fetch banner
        const bannerResponse = await getBanner(userToken);
        // console.log('bannerResponse', bannerResponse);
        if (bannerResponse.status === 'success') {
          const {data} = bannerResponse; // Destructuring the data
          setBanner(data);
          // console.log('Banner data set:', data);
        } else {
          console.log('Error fetching banner:', bannerResponse);
        }

        // Fetch categories
        const categoriesResponse = await getCategory(userToken);
        // console.log('categoriesResponse', categoriesResponse);
        setCategories(categoriesResponse);

        // Fetch new arrivals
        const newArrivalsResponse = await getNewArrivals(userToken);
        // console.log('newArrivalsResponse', newArrivalsResponse);

        // Decode HTML entities in arrival data
        const decodedArrivalsResponse = newArrivalsResponse.map(arrival => ({
          ...arrival,
          title: arrival.title ? he.decode(arrival.title) : '', // Add a check for undefined title
          // Add more fields to decode if necessary
        }));

        setArrivals(decodedArrivalsResponse);

        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call the combined fetchData function
  }, [userToken]);

  // const addToWishlist = async productId => {
  //   console.log("productiddddd",productId)
  //   try {
  //     const response = await AddWishlist(productId);
  //     // Alert.alert('Success', 'Product added to wishlist!');
  //     setWishlist([...wishlist, productId]); // Update wishlist state
  //     console.log('addtoWishlist', response);
  //   } catch (error) {
  //     console.error('Error adding product to wishlist:', error);
  //     // Alert.alert('Error', 'Failed to add product to wishlist. Please try again.');
  //   }
  // };

  const isItemInWishlist = productId => {
    return wishlist.includes(productId);
  };

  const addToWishlist = async productId => {
    console.log('productId', productId);
    try {
      // Call AddWishlist function to add product to wishlist
      const response = await AddWishlist(productId);
      // If the request is successful
      if (response.status === 'success') {
        // console.log('Product added to wishlist:', response.successmsg);
        setWishlist([...wishlist, productId]);
       
        // Return true to indicate success
        return true;
      } else {
        console.error(
          'Failed to add product to wishlist:',
          response.error_code,
        );
        // Return false to indicate failure
        return false;
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      // Return false to indicate failure
      return false;
    }
  };

  const renderCategoryItem = ({item}) => {
    const catDataItem = CatDATA.find(
      dataItem => dataItem.text === item.cat_name,
    );
    const imageSource = catDataItem
      ? catDataItem.image
      : require('../assets/cat1.png');

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetails', {ProductId: item.cat_id})
        }
        style={styles.categoryItem}
        key={item.cat_id}>
        <View style={styles.catitem}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={styles.image}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            <Image style={styles.image} source={imageSource} />
          )}
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: 15,
            fontWeight: '600',
            fontFamily: 'Gilroy-SemiBold',
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{width: 100, marginTop: 5}}
              duration={1000} // Duration of the shimmer animation
            />
          ) : item?.cat_name.length > 14 ? (
            item?.cat_name.substring(0, 14) + '...'
          ) : (
            item?.cat_name
          )}
        </Text>
      </TouchableOpacity>
    );
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
            console.log('Item:', item); // Console log the item
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
        source={ require('../assets/heart.png')}
        style={{ tintColor: '#000000' }}
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
            Welcome {userData && capitalizeFirstLetter(JSON.parse(userData).user_data.data.user_login)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('Item:', item); // Console log the item
              addToWishlist(item.id);
            }}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
            <AntDesign name="search" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          {loading ? (
            <ShimmerPlaceholder
              style={{width: '98%', height: 200, borderRadius: 20}}
              duration={1000}
              colors={['#CCCCCC', '#DDDDDD', '#CCCCCC']}
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
                  height: 200, // Set the same height as the banner image,
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
              data={categories}
              renderItem={({item}) => renderCategoryItem({item, navigation})}
              keyExtractor={item => item.cat_id.toString()}
            />
          </View>
        </View>

        <View style={styles.NewArrivel}>
          <View style={styles.Arrivelheader}>
            <Text
              style={{
                color: '#000000',
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              New Arrivals
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewArrivel')}>
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
                    }>
                    <View style={[styles.Arrivelitem, {marginTop: 10}]}>
                      {loading ? (
                        <ShimmerPlaceholder
                          style={[styles.Arrivalimage, {height: 150}]}
                          duration={1000}
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
                      {loading ? ( // Check if loading
                        <ShimmerPlaceholder
                          style={{
                            color: '#000000',
                            fontSize: 14,
                            width: 120,
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
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
                        onPress={async () => {
                          const addedToWishlist = await addToWishlist(
                            item.product_id,
                          );
                          if (addedToWishlist) {
                            setWishlist([...wishlist, item.product_id]);
                          } else {
                            setWishlist(
                              wishlist.filter(
                                productId => productId !== item.product_id,
                              ),
                            );
                          }
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
        source={ require('../assets/heart.png')}
        style={{ tintColor: '#000000'}}
      />
                      
                      </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', marginTop: 10}}>
                      {loading ? ( // Check if loading
                        <ShimmerPlaceholder // Render ShimmerPlaceholder when loading
                          duration={1000}
                          style={{
                            width: 60, // Adjust width according to your text size
                            height: 16, // Adjust height according to your text size
                            borderRadius: 2,
                            marginLeft: 18, // Adjust borderRadius as needed
                          }}
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
            {/* <TouchableOpacity>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily: 'Gilroy-Medium',
                }}>
                See all
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={{}}>
            <FlatList
              keyExtractor={(item, index) => `${item.id}_${index}`} // Unique key extractor
              showsHorizontalScrollIndicator={false}
              horizontal
              data={BestSellingDATA}
              renderItem={({item}) => renderBestSellingItem({item, navigation})}
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
