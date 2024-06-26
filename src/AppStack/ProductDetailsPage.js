import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {AuthContext} from '../Components/AuthProvider';
import Modal from 'react-native-modal';
import axios from 'react-native-axios';
import FormData from 'form-data';
import {useIsFocused} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const aspectRatio = 16 / 25;

const renderRelatedProductItem = ({item, navigation, fetchProductDetails}) => (
  <TouchableOpacity
    activeOpacity={0.92}
    style={[{width: imageWidth, marginTop: 10}]}>
    <View style={styles.Arrivelitem}>
      <Image source={{uri: item?.featured_img}} style={styles.Arrivalimage} />
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
        {item?.title}
      </Text>
      <TouchableOpacity
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
        $ {item?.price}
      </Text>
    </View>
  </TouchableOpacity>
);

const ProductDetailsPage = ({route, navigation}) => {
  const {productId, productName, productDescription, productImg, productPrice} =
    route.params;
  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {userToken, setUserToken} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [review, setReview] = useState();
  const isFocused = useIsFocused();

  const sumOfRatings = review?.data.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.rating);
  }, 0);

  const averageRating = sumOfRatings/review?.data.length;
  const roundedAverage = averageRating.toFixed(2);

console.log(`Average Rating: ${roundedAverage}`);

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
  // Inside your fetchProductDetails function
  const fetchProductDetails = async productId => {
    try {
      const response = await fetch(
        `https://bad-gear.com/wp-json/product-detail-api/v1/product_detail?product_id=${productId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      setProductDetails(data.data[0]);
      const relatedProducts = data.data[0].related_products;
      setRelatedProducts(relatedProducts);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProductDetails(null);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    fetchProductDetails(productId);
    ``;
  }, []);

  const addToCart = async productId => {
    console.log('productId:', productId);

    // Create a FormData object to send as the request body
    let formData = new FormData();
    formData.append('product_id', productId);
    formData.append('size', selectedSize);
    formData.append('quantity', selectedQuantity);
    formData.append('price', productDetails?.price);

    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    setLoadingCart(true);
    try {
      // Make POST request to the API endpoint
      const response = await axios.post(
        'https://bad-gear.com/wp-json/add-to-cart/v1/AddToCart',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the Content-Type header for FormData
            Authorization: `${tokenToUse}`, // Set Authorization header using userToken.token
          },
        },
      );
    } catch (error) {
      if (error.response) {
        console.error('Error adding to cart:', error.response.status);
        if (error.response.status === 403) {
          console.log('Authorization error:', error.response.data);
          alert('Authorization error: Please check your credentials.');
        } else {
          console.log('Server Error:', error.response.data);
          alert('Failed to add item to cart. Please try again later.');
        }
      } else if (error.request) {
        console.log('Request made but no response received:', error.request);
        alert('No response from server. Please check your network connection.');
      } else {
        console.log('Error setting up the request:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoadingCart(false);
    }
  };

  const AddWishlist = async productId => {
    console.log('productiddd', productId);
    setLoadingWishlist(true);
    let config = {
      method: 'post',
      url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        Alert.alert(JSON.stringify(response.data));
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
      <TitleHeader title={productDetails?.product_name} />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#F10C18" size="large" />
        </View>
      ) : (
        <ScrollView>
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
              ${productDetails?.price}
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

          {/* Product Size */}
          <View style={{marginTop: 20}}>
            <Text
              style={{
                color: '#000000',
                fontSize: 18,
                fontWeight: 700,
                marginLeft: 20,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Size:
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.productSize}>
              {productDetails?.attributes.split(' | ').map((size, index) => (
                <TouchableOpacity
                  style={[
                    styles.sizebox,
                    selectedSize === size && styles.selectedSizebox,
                  ]}
                  key={index}
                  onPress={() =>
                    setSelectedSize(selectedSize === size ? null : size)
                  } // Toggle selection
                >
                  <Text
                    style={[
                      styles.sizetext,
                      selectedSize === size && styles.selectedSizetext,
                    ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Product Size end */}

          {/* Product Qty */}
          <View style={{marginTop: 20}}>
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
                style={styles.quantityButton}
                onPress={() => setSelectedQuantity(selectedQuantity - 1)}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{selectedQuantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setSelectedQuantity(selectedQuantity + 1)}>
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
                style={[styles.button, {justifyContent: 'space-evenly'}]}
                onPress={() => {
                  console.log('Prouduct Idd:', productId);
                  // Log productId to console
                  AddWishlist(productId); // Call addToCart function with productId
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
                    fontWeight: 600,
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
                  },
                ]}
                onPress={() => {
                  console.log('Prouduct Idd:', productId);
                  // Log productId to console
                  addToCart(productId); // Call addToCart function with productId
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
                  }}>
                  AddToCart
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
                Related Product
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    textDecorationLine: 'underline',
                    fontFamily: 'Gilroy-SemiBold',
                  }}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={relatedProducts}
                renderItem={({item}) =>
                  renderRelatedProductItem({item, navigation: navigation})
                }
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
              <Image
                source={require('../assets/Reviewstar.png')}
                style={{marginTop: 10}}
              />
              <Text style={styles.ratingText}>
              {sumOfRatings} ratings and {review?.data.length} reviews
              </Text>

              <FlatList
                data={review?.data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
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
    flexDirection: 'row',
    width: '95%',
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
    height: 200,
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
    backgroundColor: '#fff',
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
    backgroundColor: '#F10C18', // Background color for selected size
    borderColor: '#F10C18', // Border color for selected size
  },
  selectedSizetext: {
    color: '#FFFFFF', // Text color for selected size
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
  // emptyView: {
  //   borderBottomWidth: 0.2,
  //   borderColor: lightGrey,
  //   marginBottom: scale(16),
  // },
  // viewAll: {
  //   fontSize: scale(15),
  //   color: black,
  //   textDecorationLine: 'underline',
  // },
});
