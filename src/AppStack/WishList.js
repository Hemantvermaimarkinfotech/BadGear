import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CartDATA = [
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
    image: require('../assets/Arrival2.png'),
    rate: '$39.95 - $44.95',
  },
];

const renderCartItem = ({ item, navigation }) => (
  <View style={styles.cartItem}>
    <View style={styles.imageContainer}>
      <Image
        source={item.image}
        style={styles.image}
      />
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.itemText}>{item.text}</Text>
      <Text style={styles.itemRate}>{item.rate}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Text style={styles.moveToCart}>Move to Cart</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.removeButton}>
      <Text style={styles.removeButtonText}>×</Text>
    </TouchableOpacity>
  </View>
);

const WishList = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

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

     

      <FlatList
        numColumns={1}
        data={CartDATA}
        renderItem={({ item }) => renderCartItem({ item, navigation })}
        keyExtractor={item => item.id}
      />

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
    fontFamily:"Gilroy-Medium",
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
    backgroundColor:"#fff",
    borderRadius:20,
    marginHorizontal:20,
    marginTop:20,
  
  },
  imageContainer: {
    width: "42%",
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
    width: "54%",
  },
  itemText: {
    fontSize: 18,
    color: '#000000',
    fontFamily:"Gilroy-Medium",
    width:150
  },
  itemRate: {
    fontSize: 20,
    color: '#000000',
    fontFamily:"Gilroy-Medium",
    marginTop:10
  },
  moveToCart: {
    color: '#F10C18',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily:"Gilroy-Medium"
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
    marginBottom:20
  },

});

export default WishList;
