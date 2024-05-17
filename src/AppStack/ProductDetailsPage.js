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
} from 'react-native';
import CustomDropdownPicker from '../Components/CustomDropDownPicker';
import TitleHeader from '../Components/TitleHeader';
import DropDownPicker from 'react-native-dropdown-picker';
import {AddCart} from '../Components/ApiService';
import {AuthContext} from '../Components/AuthProvider';

const RelatedProductDATA = [
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
  // Related Product data
];

const renderRelatedProductItem = ({item, navigation}) => (
  <TouchableOpacity>
    <View style={styles.RelatedProductitem}>
      <Image style={styles.RelatedProductimage} source={item.image} />
    </View>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 1,
      }}>
      <Text
        numberOfLines={2}
        style={{
          color: '#000000',
          fontSize: 14,
          width: 100,
          textAlign: 'center',
          fontWeight: '600',
        }}>
        {item.text}
      </Text>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: '#fff',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/heart.png')}
          style={{tintColor: '#000000'}}
        />
      </View>
    </View>
    <View style={{justifyContent: 'center', marginTop: 10}}>
      <Text
        style={{
          color: '#000000',
          fontSize: 17,
          fontWeight: 500,
          marginLeft: 16,
        }}>
        {item.rate}
      </Text>
    </View>
  </TouchableOpacity>
);

const ProductDetailsPage = ({route, navigation}) => {
  // console.log('route', route);
  const {productId} = route.params;
  // console.log('productId', productId);
  const [productDetails, setProductDetails] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const {userToken} = useContext(AuthContext);

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
        `https://sledpullcentral.com/wp-json/product-detail-api/v1/product_detail?product_id=${productId}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      // console.log('Product Details:', data);
      setProductDetails(data.data[0]);
    } catch (error) {
      console.error('Error fetching product details:', error);
      setProductDetails(null);
    }
  };
  useEffect(() => {
    // Fetch product details when the component mounts
    fetchProductDetails(productId);
    ``;
  }, []);

  const addToCart = async () => {
    try {
      const response = await AddCart(
        productId,
        selectedSize,
        productDetails?.price,
        selectedQuantity,
      );
      console.log('Product added to cart:', response);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* This is headerpart */}
      <TitleHeader title={'ProductDetails'} />
      {/* header part end */}

      <ScrollView>
        {/* Upper image */}
        <View style={styles.productbox}>
          <Image
            source={{uri: productDetails?.product_img}}
            style={styles.productimage}
          />
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
                style={styles.sizebox}
                key={index}
                onPress={() => setSelectedSize(size)}>
                <Text style={styles.sizetext}>{size}</Text>
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
              fontWeight: 700,
              marginLeft: 20,
              fontFamily: 'Gilroy-SemiBold',
            }}>
            QTY:
          </Text>
          <View style={styles.qty}>
            {/* <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center',marginTop:5}}>
              <CustomDropdownPicker items={dropdownItems} />
            </View> */}
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
            onPress={addToCart}>
            <Image
              source={require('../assets/Cart.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: '#fff',
                resizeMode: 'contain',
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 600,
                fontFamily: 'Gilroy-SemiBold',
              }}>
              Add To Cart
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
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Related Product
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={RelatedProductDATA}
              renderItem={renderRelatedProductItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        {/* Related Product End */}

        {/* Review Section */}

        <View style={styles.Review}>
          <View style={styles.RelatedProductlheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Ratings & Reviews
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#F10C18',
                  fontSize: 16,
                  textDecorationLine: 'underline',
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
            }}>
            <View
              style={{
                height: 100,
                borderBottomColor: '#D6D6D6',
                borderBottomWidth: 0.4,
                width: '100%',
              }}>
              <View>
                <Text style={{color: '#000000', fontSize: 15, fontWeight: 500}}>
                  26 ratings and 24 reviews
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    height: 200,
                    borderRadius: 10,
                    alignSelf: 'center',
                    width: '99%',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      height: 28,
                      width: 60,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 25,
                      borderColor: '#707070',
                      borderWidth: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{color: '#000000', fontSize: 13, fontWeight: 600}}>
                      5
                    </Text>
                    <Image
                      source={require('../assets/star.png')}
                      style={{height: 15, width: 15, resizeMode: 'contain'}}
                    />
                  </View>

                  <View style={{width: 230, marginLeft: 10, height: 50}}>
                    <Text style={{fontSize: 13, fontWeight: 500, marginTop: 5}}>
                      Cozy Comfort and Style Combined!
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 12,
                          fontWeight: 700,
                        }}>
                        David
                      </Text>
                      <Text
                        style={{
                          color: '#4B4B4B',
                          fontSize: 11,
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
    justifyContent: 'center',
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
    borderRadius: 50,
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
  qty:{
    justifyContent:"space-evenly",
    flexDirection:"row",
    borderWidth:1,
    width:"20%",
    height:37,
    marginHorizontal:20,
    marginTop:15,
    borderColor:"#B2B2B2",
    borderRadius:8,
    alignItems:"center"
  },
  quantityControl: {
    
  },
  quantityButton: {
    height: 40,
    width:40,
    borderRadius:8,
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
});
