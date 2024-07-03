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
import {getWishList} from '../Components/ApiService';
import {AuthContext} from '../Components/AuthProvider';
import axios from 'react-native-axios';

const WishList = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [wishlist, setWishList] = useState();

  const [loading, setLoading] = useState(false); // Add loading state
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
        setWishList(response.data.data); // Assuming setWishList expects an array of objects
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

        <Text style={styles.itemRate}>$ {item.price}</Text>

        <TouchableOpacity>
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
        <Text style={styles.headerText}>WishList</Text>
      </View>

      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={'#F10C18'} />
        </View>
      ) : wishlist && wishlist.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 20,
              fontFamily: 'Gilroy-Medium',
            }}>
            No items in wishlist
          </Text>
        </View>
      ) : (
        <FlatList
          data={wishlist}
          renderItem={renderItem}
          keyExtractor={item => item.product_id}
          contentContainerStyle={styles.container}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: 'Gilroy-Medium',
    color: '#000000',
  },
  totalAmountText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#F10C18',
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
  itemRate: {
    fontSize: 20,
    color: '#000000',
    fontFamily: 'Gilroy-Medium',
    marginTop: 10,
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
  placeOrderButton: {
    width: '86%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F10C18',
    height: 50,
    borderRadius: 5,
    marginTop: 20,
    elevation: 1,
    marginBottom: 20,
  },
});

export default WishList;
