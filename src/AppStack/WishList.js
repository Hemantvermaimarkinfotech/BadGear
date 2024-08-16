// #This code is written by Hemant Verma

import React, {useState, useEffect, useContext} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import axios from 'react-native-axios';
import {AuthContext} from '../Components/AuthProvider';

const WishList = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  // Initialize wishlist as an empty array
  const [wishlist, setWishList] = useState([]);

  const [loading, setLoading] = useState(false); 
  const {userToken} = useContext(AuthContext);

  const fetchData = () => {
    const tokenToUse =
      userToken && userToken.token ? userToken.token : userToken;
    setLoading(true);
    let config = {
      method: 'get',
      url: 'https://bad-gear.com/wp-json/get-wishlist/v1/getWishlist?',
      headers: {
        Authorization: `${tokenToUse}`,
      },
    };

    axios
      .request(config)
      .then(response => {
        console.log('WishList Data found Successfully', response.data.data);
        setWishList(response.data.data); 
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteWishlistItem = async (productId) => {
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
        setWishList(prevItems =>
          prevItems.filter(item => item.product_id !== productId),
        );
      } else {
        console.log('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.log('Error deleting Wishlist Item:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item.image}} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemText}>{item?.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.moveToCart}>Move to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => {
          Alert.alert(
            'Delete Item',
            'Are you sure you want to delete this item?',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'OK',
                onPress: () => {
                  console.log(item.product_id);
                  deleteWishlistItem(item.product_id);
                },
              },
            ],
            {cancelable: true},
          );
        }}>
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerText}>Wishlist</Text>
      </View>
      {/* Display the total number of items */}
      <Text style={styles.itemCount}>Total Items: {wishlist.length}</Text>
 
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={'#F10C18'} />
        </View>
      ) : wishlist.length === 0 ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.noItemsText}>
            No items in wishlist
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={item => item.product_id.toString()} // Ensure keyExtractor returns a string
          contentContainerStyle={styles.flatListContentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 20,
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
  moveToCart: {
    color: '#F10C18',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily: 'Gilroy-Medium',
  },
  removeButton: {
    position: 'absolute',
    top: 2,
    right: 12,
  },
  removeButtonText: {
    fontSize: 25,
    color: '#707070',
  },
  flatListContentContainer: {
    paddingBottom: 50,
  },
  noItemsText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Gilroy-Medium',
  },
  itemCount: {
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    color: '#000000',
    marginTop: 20,
    paddingHorizontal: 20,
  },

});

export default WishList;
