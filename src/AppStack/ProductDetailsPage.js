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
  Button,
  Dimensions,
} from 'react-native';
import CustomDropdownPicker from '../Components/CustomDropDownPicker';
import TitleHeader from '../Components/TitleHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import {AddCart} from '../Components/ApiService';
import {AuthContext} from '../Components/AuthProvider';
import Modal from 'react-native-modal';
import axios from 'react-native-axios';
import FormData from 'form-data';
import Loader from '../Components/Loader';

const {width: screenWidth} = Dimensions.get('window');
const imageWidth = screenWidth / 2.2;
const aspectRatio = 16 / 25; // Assuming a standard aspect ratio

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
  const {productId, productName, productDescription, productImg, productPrice} = route.params;
  console.log('productIdparmasdata', productId,productName, productDescription, productImg, productPrice); 
  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {userToken, setUserToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // console.log("relatedProductsrelatedProducts",relatedProducts)

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
      // Fetch main product details
      const response = await fetch(
        `https://bad-gear.com/wp-json/product-detail-api/v1/product_detail?product_id=${productId}`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }

      const data = await response.json();
      console.log('Product Details:', data);

      // Set main product details
      setProductDetails(data.data[0]);

      // If related products are included in the main product details, you can extract them directly
      const relatedProducts = data.data[0].related_products;
      console.log('Related Products:', relatedProducts);
      setRelatedProducts(relatedProducts);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProductDetails(null);
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  useEffect(() => {
    // Fetch product details when the component mounts
    fetchProductDetails(productId);
    ``;
  }, []);



  const addToCart = async (productId) => {
    console.log("userToken:", userToken?.token);
    console.log("productId:", productId);
    console.log(productId,size,quantity,price,'hbhbhybhbhybhy')
    
    // Create a FormData object to send as the request body
    let formData = new FormData();
    formData.append('product_id', productId); 
    formData.append('size', "M"); 
    formData.append('quantity', "5");
    formData.append('price', "235"); 
  
    console.log("FormData:", formData); // Log FormData object
    
    try {
      // Make POST request to the API endpoint
      const response = await axios.post(
        'https://bad-gear.com/wp-json/add-to-cart/v1/AddToCart',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set the Content-Type header for FormData
            'Authorization': userToken?.token // Set Authorization header using userToken.token
          },
        }
      );
  
      console.log('Response data:', response.data); // Log response data
  
    } catch (error) {
      if (error.response) {
        console.error('Error adding to cart:', error.response.status);
        if (error.response.status === 403) {
          console.error('Authorization error:', error.response.data);
          alert('Authorization error: Please check your credentials.');
        } else {
          console.error('Server Error:', error.response.data);
          alert('Failed to add item to cart. Please try again later.');
        }
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
        alert('No response from server. Please check your network connection.');
      } else {
        console.error('Error setting up the request:', error.message);
        alert('An unexpected error occurred. Please try again later.');
      }
    }
  };
  
  


  

  
  
  

  

  return (
    <SafeAreaView style={styles.container}>
      {/* This is headerpart */}
      <TitleHeader title={productDetails?.product_name} />
      {/* header part end */}
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#F10C18" size="large" />
        </View>
      ) : (
        <ScrollView>
          {/* Upper image */}
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

          {/* Upper image end */}

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
                    selectedSize === size && styles.selectedSizebox, // Apply selected style if size is selected
                  ]}
                  key={index}
                  onPress={() =>
                  
                    setSelectedSize(selectedSize === size ? null : size)
                  } // Toggle selection
                >
                  <Text
                    style={[
                      styles.sizetext,
                      selectedSize === size && styles.selectedSizetext, // Apply selected text style if size is selected
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
            <TouchableOpacity
              style={[styles.button, {justifyContent: 'space-evenly'}]}
              onPress={() => navigation.navigate('WishList')}>
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
              <TouchableOpacity>
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

            <Image
              source={require('../assets/Reviewstar.png')}
              style={{marginLeft: 20, marginTop: 10}}
            />

            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                alignSelf: 'center',
                width: '90%',
                // borderWidth:1
              }}>
              <View
                style={{
                  height: 100,
                  borderBottomColor: '#D6D6D6',
                  borderBottomWidth: 0.4,
                  width: '100%',
                }}>
                <View>
                  <Text
                    style={{
                      color: '#000000',
                      fontSize: 14,
                      fontWeight: 500,
                      fontFamily: 'Gilroy-Medium',
                    }}>
                    26 ratings and 24 reviews
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                      borderRadius: 10,
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        height: 28,
                        width: '20%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 25,
                        borderColor: '#707070',
                        borderWidth: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 13,
                          fontWeight: 600,
                        }}>
                        5
                      </Text>
                      <Image
                        source={require('../assets/star.png')}
                        style={{height: 15, width: 15, resizeMode: 'contain'}}
                      />
                    </View>

                    <View style={{width: '80%', marginLeft: 10}}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          marginTop: 5,
                          color: '#000000',
                          fontFamily: 'Gilroy-Medium',
                        }}>
                        Cozy Comfort and Style Combined!
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 10,
                          width: '100%',
                          paddingRight: 10,
                        }}>
                        <Text
                          style={{
                            color: '#000000',
                            fontSize: 14,
                            fontWeight: 700,
                          }}>
                          David
                        </Text>
                        <Text
                          style={{
                            color: '#4B4B4B',
                            fontSize: 13,
                            fontWeight: 300,
                          }}>
                          5 days ago
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
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
    height: 350,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
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
});
