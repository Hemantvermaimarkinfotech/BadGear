
// This code is written by Hemant Verma
import React, { useContext, useEffect, useState } from 'react';
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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';
import { AuthContext } from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemQuantities, setItemQuantities] = useState({});
  const [initialPrices, setInitialPrices] = useState({});
  const [itemPrices, setItemPrices] = useState({});
  console.log("itemprices", itemPrices);
  const { userToken } = useContext(AuthContext);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    const quantities = {};
    const initialPricesMap = {};
    const prices = {};

    cartItems.forEach(item => {
      quantities[item.product_id] = parseInt(item.quantity, 10);
      initialPricesMap[item.product_id] = parseFloat(item.price);
      prices[item.product_id] = parseFloat(item.price) * parseInt(item.quantity, 10);
    });

    setItemQuantities(quantities);
    setInitialPrices(initialPricesMap);
    setItemPrices(prices);
  }, [cartItems]);

  const handleIncrease = (productId, itemPrice) => {
    if (itemPrice === undefined) {
      console.log(`Price is undefined for productId ${productId}`);
      return;
    }

    setItemQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = currentQuantity + 1;

      // Calculate the new total price based on the initial price and updated quantity
      const newPrice = initialPrices[productId] * newQuantity;

      console.log("newprice", newPrice);

      // Update the itemPrices state with the new price
      setItemPrices(prevPrices => ({
        ...prevPrices,
        [productId]: newPrice,
      }));

      // Update the cart with the new quantity
      updateCart(productId, newQuantity);

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const handleDecrease = (productId, itemPrice) => {
    if (itemPrice === undefined) {
      console.log(`Price is undefined for productId ${productId}`);
      return;
    }

    setItemQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity = Math.max(currentQuantity - 1, 1);

      // Calculate the new total price based on the initial price and updated quantity
      const newPrice = initialPrices[productId] * newQuantity;

      // Update the itemPrices state with the new price
      setItemPrices(prevPrices => ({
        ...prevPrices,
        [productId]: newPrice,
      }));

      // Update the cart with the new quantity
      updateCart(productId, newQuantity);

      return {
        ...prevQuantities,
        [productId]: newQuantity,
      };
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const updateCart = async (product_id, quantity) => {
    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
    const price = initialPrices[product_id];
    console.log("quantity & price", quantity, price);

    if (quantity === undefined || price === undefined) {
      console.log(`Product ID ${product_id} not found in itemQuantities or itemPrices.`);
      return;
    }

    let data = new FormData();
    data.append('product_id', product_id);
    data.append('quantity', quantity);
    data.append('price', price);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://bad-gear.com/wp-json/add-to-cart/v1/AddToCart',
      headers: {
        Authorization: `${tokenToUse}`,
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      // Fetch updated cart items after successfully updating
      getCartItems();
    } catch (error) {
      console.log('Error updating Cart Item:', error);
    }
  };

  const DeleteCart = async productId => {
    setLoading(true);
    let data = new FormData();
    data.append('product_id', productId);

    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;

    let config = {
      method: 'post',
      url: 'https://bad-gear.com/wp-json/delete-cart-items/v1/DeleteCartItems',
      headers: {
        Authorization: `${tokenToUse}`,
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));

      if (response.data.status === 'success') {
        setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
      } else {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error deleting Cart Item:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartItems = async () => {
    setLoading(true);

    const tokenToUse = userToken && userToken.token ? userToken.token : userToken;
    let config = {
      method: 'get',
      url: 'https://bad-gear.com/wp-json/get-cart-items/v1/GetCartItems',
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    try {
      const response = await axios.request(config);
      // console.log(JSON.stringify(response.data));

      if (response.data.status === 'success') {
        const itemsWithQuantity = response.data.data.map(item => ({
          ...item,
          quantity: parseInt(item.quantity, 10), 
          price: parseFloat(item.price), 
        }));

        setCartItems(itemsWithQuantity);

        const quantities = {};
        const initialPricesMap = {};
        const prices = {};

        itemsWithQuantity.forEach(item => {
          quantities[item.product_id] = item.quantity;
          initialPricesMap[item.product_id] = item.price;
          prices[item.product_id] = item.price * item.quantity; 
        });

        setItemQuantities(quantities);
        setInitialPrices(initialPricesMap);
        setItemPrices(prices);

        const totalAmount = itemsWithQuantity
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2);

        await AsyncStorage.setItem('cartItems', JSON.stringify(itemsWithQuantity));
        await AsyncStorage.setItem('totalAmount', totalAmount);
        setCartLength(itemsWithQuantity.length);
      } else {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error fetching Cart Items:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTotalAmount = () => {
    if (!cartItems || cartItems.length === 0) {
      return '0.00';
    }

    const total = cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = parseInt(item.quantity, 10) || 0;
      return total + itemPrice * itemQuantity;
    }, 0);

    return total.toFixed(2);
  };


  const renderCartItem = ({ item }) => (
    <View>
      <View style={styles.cartItem}>
        <View style={styles.imageContainer}>
          {item?.product_img ? (
            <Image source={{ uri: item.product_img }} style={styles.image} />
          ) : (
            <Text style={{ color: '#000000' }}>No Image Available</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.itemText}>{item.product_name}</Text>
          <Text style={styles.itemRate}>
            ${(
              itemPrices[item.product_id] ||
              item.price * (itemQuantities[item.product_id] || item.quantity)
            ).toFixed(2)}
          </Text>
          <View style={styles.qtyContainer}>
            <View style={styles.qtySection}>
              <TouchableOpacity
                style={styles.qtybtn}
                onPress={() => handleDecrease(item.product_id, item.price)}
              >
                <Text style={styles.btntext}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>
                {itemQuantities[item.product_id] || item.quantity}
              </Text>
              <TouchableOpacity
                style={styles.qtybtn}
                onPress={() => handleIncrease(item.product_id, item.price)}
              >
                <Text style={styles.btntext}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sizeSection}>
              <Text style={styles.sizeLabel}>Size:</Text>
              <Text style={styles.sizeLabel}>{item.size}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            Alert.alert(
              'Delete Item',
              'Are you sure you want to delete this item?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: () => DeleteCart(item.product_id),
                },
              ],
              { cancelable: true },
            );
          }}
        >
          <Text style={styles.closeButtonText}>X</Text>
          {loading && <ActivityIndicator />}
        </TouchableOpacity>
      </View>
    </View>
  );
  

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={require('../assets/next.png')}
            style={styles.headerIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#F10C18" />
        </View>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <>
              <View style={styles.totalItemsContainer}>
                <Text style={styles.totalItemsText}>
                  {cartItems.length} Items Selected
                </Text>
                <Text style={styles.totalAmountText}>${getTotalAmount()}</Text>
              </View>

              <View style={{marginBottom: 200}}>
                <FlatList
                  showVerticalScrollIndicator={false}
                  data={cartItems}
                  renderItem={renderCartItem}
                  keyExtractor={item => item.product_id.toString()}
                  nestedScrollEnabled={true}
                />

                <TouchableOpacity
                  style={styles.placeOrderButton}
                  onPress={() => {
                    console.log('Navigating to Checkout with:', {
                      cartItems,
                      totalAmount: getTotalAmount(),
                    });
                    navigation.navigate('Checkout', {
                      cartItems,
                      totalAmount: getTotalAmount(),
                    });
                  }}>
                  <Text style={styles.placeOrderText}>Place Order</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.noCartContainer}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontFamily: 'Gilroy-Medium',
                }}>
                No items in the cart
              </Text>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    height: 50,
    marginTop: 10,
  },
  headerIcon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  headerText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: '700',
  },
  totalItemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  totalItemsText: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    color: '#000000',
  },
  totalAmountText: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    color: '#F10C18',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginTop: 20,
  },
  imageContainer: {
    width: '42%',
    height: 150,
    backgroundColor: '#F8F8F8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 110,
    resizeMode: 'contain',
  },
  detailsContainer: {
    width: '54%',
  },
  itemText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
    width: 150,
  },
  itemRate: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 12,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#707070',
  },
  placeOrderButton: {
    width: '86%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 8,
    elevation: 1,
    position: 'relative',
    bottom: 20,
    top: 20,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  qtyContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    height: 45,
    width: '100%',
  },
  qtySection: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '48%',
    borderColor: '#B2B2B2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  sizeSection: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: '48%',
    borderColor: '#B2B2B2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  qtybtn: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Gilroy-SemiBold',
  },
  dropdown: {
    height: 30,
    paddingHorizontal: 8,
    width: 53,
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#000000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Gilroy-SemiBold',
  },
  noCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;












