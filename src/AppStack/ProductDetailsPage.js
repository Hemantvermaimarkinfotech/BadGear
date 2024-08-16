// #This code is written by Hemant Verma

import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Alert,
  Button,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {AuthContext} from '../Components/AuthProvider';
import Modal from 'react-native-modal';
import axios from 'react-native-axios';
import FormData from 'form-data';
import {useIsFocused} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useToast, ToastProvider} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-virtualized-view';
import LoginBottomSheet from '../Components/LoginBottomSheet';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const aspectRatio = 16 / 25;

const ProductDetailsPage = ({route, navigation}) => {
  const {productId, productName, productDescription, productImg, productPrice} =
    route.params;

  const [productDetails, setProductDetails] = useState('');

  useEffect(() => {
    if (productDetails) {
      if (productDetails.variation_data) {
        productDetails.variation_data.forEach(variation => {
          console.log('Variation Attributes:', variation.attributes);
          console.log('Attribute Size:', variation.attributes?.attribute_size);
        });
      } else {
        console.log('variation_data is undefined');
      }
    } else {
      console.log('productDetails is undefined');
    }
  }, [productDetails]);

  const sizes = (productDetails?.variation_data || [])
    .map(variation => variation.attributes?.attribute_size)
    .filter(size => size);

  // Remove duplicate sizes
  const uniqueSizes = [...new Set(sizes)];
  const openLoginSheet = () => {
    setBottomSheetVisible(true); 
    bottomSheetRef.current?.expand(); // Open the bottom sheet
  };

  const closeLoginSheet = () => {
    setBottomSheetVisible(false); 
    bottomSheetRef.current?.close();
  };

  console.log('sizeeee', sizes);
  const [selectedSize, setSelectedSize] = useState('');
  console.log('selectsize', selectedSize);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {userToken, setUserToken} = useContext(AuthContext);
  const bottomSheetRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [toastVisible, setToastVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [review, setReview] = useState();
  const [sizePriceMap, setSizePriceMap] = useState({});
  const isFocused = useIsFocused();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false); // New state variable
  const {toast} = useToast();
  const sumOfRatings =
    review?.data.reduce((accumulator, currentValue) => {
      return accumulator + parseInt(currentValue.rating);
    }, 0) || 0;

  const averageRating = sumOfRatings / (review?.data.length || 1);
  const roundedAverage = averageRating.toFixed(2);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setUserData(userData); // Set userData state
        } else {
          console.log('No user data found.');
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);
  const capitalizeFirstLetter = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isDummyToken = () => {
    return userToken === 'dummy-token' || userToken === null;
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating - fullStars >= 0.5;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Text key={`full-${i}`} style={{fontSize: 20, color: '#FFD700'}}>
          &#9733;
        </Text>,
      );
    }

    // Half star
    if (halfStar) {
      stars.push(
        <Text key="half" style={{fontSize: 20, color: '#FFD700'}}>
          &#9734;
        </Text>,
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Text key={`empty-${i}`} style={{fontSize: 20, color: '#CCCCCC'}}>
          &#9734;
        </Text>,
      );
    }

    return stars;
  };

  useEffect(() => {
    if (review && review.length > 0) {
      setVisibleReviews(showAllReviews ? review.length : 3);
    }
  }, [review, showAllReviews]);

  const toggleReviews = () => {
    setShowAllReviews(!showAllReviews);
  };

  console.log('size', selectedSize);
  console.log('quantity', selectedQuantity);
  const dropdownItems = [
    {label: 'Item 1', value: 'item1'},
    {label: 'Item 2', value: 'item2'},
    {label: 'Item 3', value: 'item3'},
  ];
  const [currentPrice, setCurrentPrice] = useState(undefined);

  useEffect(() => {
    if (productDetails?.price !== undefined) {
      setCurrentPrice(productDetails.price);
    }
  }, [productDetails]);

  const handleQuantityChange = selectedQuantity => {
    setSelectedQuantity(selectedQuantity);
    setCurrentPrice(productDetails?.price * selectedQuantity || 0);
  };

  const fetchProductDetails = async productId => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bad-gear.com/wp-json/product-detail-api/v1/product_detail?product_id=${productId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setProductDetails(data.data[0]);

      // Create a map of sizes to prices
      const sizePriceMap = {};
      data.data[0].variation_data.forEach(variation => {
        if (variation.attributes?.attribute_size) {
          sizePriceMap[variation.attributes.attribute_size] = parseFloat(
            variation.price,
          );
        }
      });
      setSizePriceMap(sizePriceMap);

      const relatedProducts = data.data[0].related_products;
      setRelatedProducts(relatedProducts);
    } catch (error) {
      console.log('Error fetching product details:', error);
      setProductDetails(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedSize && sizePriceMap[selectedSize] !== undefined) {
      setCurrentPrice(sizePriceMap[selectedSize] * selectedQuantity);
    } else {
      setCurrentPrice(productDetails?.price * selectedQuantity || 0);
    }
  }, [selectedSize, selectedQuantity, sizePriceMap, productDetails?.price]);

  useEffect(() => {
    fetchProductDetails(productId);
    ``;
  }, []);
  

  const addToCart = async productId => {
    if (!selectedSize) {
      Alert.alert(
        'Size Not Selected',
        'Please select a size before adding to cart.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    }

    const sizeAvailable = productDetails?.variation_data?.some(
      variation => variation.attributes?.attribute_size === selectedSize,
    );

    if (!sizeAvailable) {
      Alert.alert(
        'Size Not Available',
        'Selected size is not available for this product.',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false },
      );
      return;
    }

    if (isDummyToken()) {
      openLoginSheet();
      return;
    }

    let formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', selectedSize);
    formData.append('quantity', selectedQuantity);
    formData.append('price', currentPrice);

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    setLoadingCart(true);

    try {
      const response = await axios.post(
        'https://bad-gear.com/wp-json/add-to-cart/v1/AddToCart',
        formData,
        {
          headers: {
            Authorization: `${tokenToUse}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        setToastVisible(true);
        setAddedToCart(true); // Mark as added to cart
        setTimeout(() => {
          setToastVisible(false);
        }, 3000);
      } else {
        if (response.status === 404) {
          Alert.alert(
            'Not Added to Cart',
            'Selected size is not available.',
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
            { cancelable: false },
          );
        } else {
          console.log('Error adding to cart:', response.status);
          alert('Failed to add to Cart');
        }
      }
    } catch (error) {
      console.log('Error adding to cart:', error);
      alert('Already added to Cart.');
    } finally {
      setLoadingCart(false);
    }
  };


  const AddWishlist = async productId => {
    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    if (isDummyToken()) {
      openLoginSheet();
      return;
    }
    console.log('productiddd', productId);
    setLoadingWishlist(true);
    let config = {
      method: 'post',
      url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        Alert.alert(JSON.stringify(response.data.successmsg));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoadingWishlist(false);
      });
  };

  const getReview = () => {
    let config = {
      method: 'get',
      url: `https://bad-gear.com/wp-json/getProductReview/v1/getProduct_Review?product_id=${productId}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        setReview(response?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (isFocused) {
      getReview();
    }
  }, [isFocused]);

  const renderRelatedProductItem = ({item, navigation}) => (
    <TouchableOpacity
      activeOpacity={0.92}
      style={[{width: imageWidth, marginTop: 10}]}
      onPress={() => {
        console.log(item.id);
        fetchProductDetails(item.id);
      }}>
      <View style={styles.Arrivelitem}>
        <Image source={{uri: item?.featured_img}} style={styles.Arrivalimage} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // alignItems: 'center',
          paddingHorizontal: 15,
          marginTop: 10,
          // marginLeft: 20,
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
            lineHeight: 20,
          }}
          key={`${item.id}_text`}>
          {item?.title}
        </Text>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('WishList')}
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
        </TouchableOpacity> */}
        <View style={{}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 17,
              fontWeight: 500,
              fontFamily: 'Gilroy-SemiBold',
            }}
            key={`${item.id}_rate`}>
            $ {item?.price}
          </Text>
        </View>
      </View>

      {/* <View style={{justifyContent: 'center', marginTop: 10}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontWeight: 500,
            marginLeft: 18,
            fontFamily: 'Gilroy-SemiBold',
          }}
          key={`${item.id}_rate`}>
          $ {item?.price}
        </Text>
      </View> */}
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <View style={styles.reviewContainer}>
      {/* Review details */}
      <View style={styles.reviewDetails}>
        {/* Ratings and reviews count */}

        {/* Individual review */}
        <View style={styles.individualReview}>
          {/* Rating block */}
          <View style={styles.ratingBlock}>
            <Text style={styles.ratingValue}>{item?.rating}</Text>
            <Image
              source={require('../assets/star.png')}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
          </View>

          {/* Review content */}
          <View style={styles.reviewContent}>
            <Text style={styles.reviewTitle}>{item?.review}</Text>
            <View style={styles.reviewMeta}>
              <Text style={styles.reviewAuthor}>David</Text>

              <Text style={styles.reviewDate}>{item?.date}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
 
      {!bottomSheetVisible && <TitleHeader title={productDetails?.product_name}  />}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#F10C18" size="large" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productbox}>
            {productDetails?.product_img ? (
              <Image
                source={{uri: productDetails?.product_img}}
                style={styles.productimage}
              />
            ) : (
              <Text style={{color: '#000000'}}>No Image Available</Text>
            )}
          </View>

          <View style={{marginTop: 10, width: '95%'}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: 700,
                marginTop: 10,
                marginLeft: 20,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              {productDetails?.product_name}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#000000',
                marginTop: 5,
                marginLeft: 20,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              ${currentPrice?.toFixed(2)}
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                marginTop: 5,
                marginLeft: 20,
                fontFamily: 'Gilroy-Regular',
              }}>
              SKU: AGDH
            </Text>
          </View>

          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontWeight: '700',
                marginLeft: 20,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Size:
            </Text>
            <View style={{paddingHorizontal: 10}}>
              {uniqueSizes.length > 0 ? (
                <FlatList
                  data={uniqueSizes}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={[
                    styles.productSize,
                    {paddingRight: 0},
                  ]}
                  renderItem={({item: size}) => (
                    <TouchableOpacity
                      style={[
                        styles.sizebox,
                        selectedSize === size && styles.selectedSizebox,
                      ]}
                      onPress={() => {
                        setSelectedSize(size);
                        handleQuantityChange(selectedQuantity);
                      }}>
                      <Text
                        style={[
                          styles.sizetext,
                          selectedSize === size && styles.selectedSizetext,
                        ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View style={{marginHorizontal: 15}}>
                  <Text
                    style={{
                      color: '#F10C18',
                      fontSize: 14,
                      fontFamily: 'Gilroy-Medium',
                      marginTop: 10,
                    }}>
                    No sizes available for this product
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Product Size end */}


<View style={{ marginTop: 20 }}>
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          marginLeft: 20,
          fontFamily: 'Gilroy-SemiBold',
        }}>
        QTY:
      </Text>
      <View style={styles.qty}>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            { opacity: selectedQuantity <= 1 ? 0.5 : 1 }, // Reduce opacity when disabled
          ]}
          onPress={() => handleQuantityChange(selectedQuantity - 1)}
          disabled={selectedQuantity <= 1}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{selectedQuantity}</Text>
        <TouchableOpacity
          style={[
            styles.quantityButton,
            { opacity: selectedQuantity >= 10 ? 0.5 : 1 }, // Reduce opacity when at max
          ]}
          onPress={() => handleQuantityChange(selectedQuantity + 1)}
          disabled={selectedQuantity >= 10}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>

          {/* Product Qty end/}

    {/* Wishlist & AddCart Button */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 70,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            {loadingWishlist ? (
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#F10C18',
                  height: 50,
                  width: '47%',
                  alignSelf: 'center',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderColor: '#707070',
                  borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={'large'} color={'#000000'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, {justifyContent: 'space-between'}]}
                onPress={() => {
                  console.log('Prouduct Idd:', productId);
                  AddWishlist(productId);
                }}>
                <Image
                  source={require('../assets/heart2.png')}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: '#000000',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 20,
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  Wishlist
                </Text>
              </TouchableOpacity>
            )}

            {loadingCart ? (
              <TouchableOpacity
                style={[
                  {
                    backgroundColor: '#F10C18',
                    borderColor: '#F10C18',
                    height: 50,
                    width: '47%',
                    alignSelf: 'center',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderColor: '#707070',
                    borderWidth: 1,
                    justifyContent: 'center',
                  },
                ]}>
                <ActivityIndicator size={'large'} color={'#fff'} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: '#F10C18',
                    borderColor: '#F10C18',
                    paddingHorizontal: 20,
                    borderColor: '#F10C18',
                  },
                ]}
                onPress={() => {
                  console.log('Prouduct Idd:', productId);
                  // Log productId to console
                  addToCart(productId);
                }}>
                <Image
                  source={require('../assets/Cart.png')}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: '#FFFFFF',
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontFamily: 'Gilroy-SemiBold',
                    marginTop: 3,
                    marginLeft:5
                  }}>
                  Add To Cart
                </Text>
              </TouchableOpacity>
            )}
            
          </TouchableOpacity>
          {/* Wishlist $ AddCart Button End */}

          {/* Product Description */}
          <View style={styles.productDescription}>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontFamily: 'Gilroy-SemiBold',
                marginTop: 20,
              }}>
              Product Description
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                marginTop: 10,
                marginLeft: 20,
                lineHeight: 25,
                fontFamily: 'Gilroy-Regular',
                paddingHorizontal: 5,
              }}>
              {productDetails?.description}
            </Text>
          </View>
          {/* Product Description End */}

          {/* Related Product */}
          <View>
            <View style={styles.RelatedProductlheader}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontFamily: 'Gilroy-SemiBold',
                }}>
                Related Products
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    fontFamily: 'Gilroy-SemiBold',
                  }}></Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={relatedProducts}
                renderItem={item => renderRelatedProductItem(item, navigation)}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
          {/* Related Product End */}

          {/* Review Section */}

          <View style={styles.Review}>
            <View style={styles.RelatedProductlheader}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontFamily: 'Gilroy-Medium',
                }}>
                Ratings & Reviews
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddReview', {
                    productDetails: productDetails,
                    productId: productId,
                  })
                }>
                <Text
                  style={{
                    color: '#F10C18',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    fontFamily: 'Gilroy-Medium',
                  }}>
                  Write review
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ratingCount}></View>
            <View style={{alignSelf: 'center', width: '90%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                {renderStars()}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Text style={{color: '#000000', fontSize: 18}}>
                    Out of 5 /
                  </Text>
                  <Text style={{color: '#000000', fontSize: 15}}>
                    {roundedAverage}
                  </Text>
                </View>
              </View>

              <Text style={styles.ratingText}>
                {sumOfRatings} ratings and {review?.data.length} reviews
              </Text>

              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={
                    showAllReviews ? review?.data : review?.data.slice(0, 3)
                  }
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
                {review?.data.length > 3 && !showAllReviews && (
                  <Button
                    title="Show All"
                    color={'#F10C18'}
                    onPress={toggleReviews}
                  />
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* Modal for showing item added to cart */}
      <Modal isVisible={modalVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              width: '80%',
              alignSelf: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{color: '#000000', fontSize: 15, fontWeight: 500}}>
                  Item added to cart
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Text style={{color: '#F10C18', fontSize: 15, fontWeight: 500}}>
                  GO TO CART
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {toastVisible && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>Added Cart Succesfuly!</Text>
        </View>
      )}
      <LoginBottomSheet
        bottomSheetRef={bottomSheetRef}
        closeSheet={closeLoginSheet}
      />
    </SafeAreaView>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  productbox: {
    height: 290,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: 'center',
  },
  productimage: {
    height: 260,
    width: 300,
    resizeMode: 'contain',
  },
  productSize: {
    // flexDirection: 'row',
    // width: '95%',
    alignSelf: 'center',
    marginTop: 5,
  },
  sizebox: {
    height: 50,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  sizetext: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Gilroy-SemiBold',
  },
  productDescription: {
    paddingBottom: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  RelatedProductlheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  RelatedProductitem: {
    margin: 10,
    alignItems: 'center',
    height: 165,
    width: 165,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  RelatedProductimage: {
    width: 120,
    height: 140,
    borderRadius: 15,
  },
  Review: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    marginBottom: 80,
    paddingBottom: 22,
    paddingBottom:100
  },
  button: {
    flexDirection: 'row',
    height: 50,
    width: '47%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#707070',
    borderWidth: 1,
    paddingHorizontal: 30,
  },
  qty: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderWidth: 1,
    width: '20%',
    height: 37,
    marginHorizontal: 20,
    marginTop: 15,
    borderColor: '#B2B2B2',
    borderRadius: 8,
    alignItems: 'center',
  },
  quantityControl: {},
  quantityButton: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 10,
  },
  selectedSizebox: {
    backgroundColor: '#F10C18',
    borderColor: '#F10C18',
  },
  selectedSizetext: {
    color: '#FFFFFF',
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
  reviewContainer: {
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    width: '100%',
  },
  reviewDetails: {
    height: 100,
    borderBottomColor: '#D6D6D6',
    borderBottomWidth: 0.4,
    width: '100%',
  },
  ratingCount: {
    paddingHorizontal: 10,
  },
  ratingText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
  },
  individualReview: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  ratingBlock: {
    height: 28,
    width: '20%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    borderColor: '#707070',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  ratingValue: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '600',
  },
  reviewContent: {
    width: '80%',
    marginLeft: 10,

    height:40
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
  },
  reviewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
    paddingRight: 10,
  },
  reviewAuthor: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '700',
  },
  reviewDate: {
    color: '#4B4B4B',
    fontSize: 13,
    fontWeight: '300',
  },
  starContainer: {
    padding: 6,
  },
  toast: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#D5FFC4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '90%',
    alignSelf: 'center',
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toastText: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Montserrat, SemiBold',
  },
});
