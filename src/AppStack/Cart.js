import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
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


];

const renderCartItem = ({ item, setModalVisible }) => (
  <View>
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
        <View style={styles.qtyContainer}>
          <Text style={styles.qtyText}>Qty:</Text>
          <Text style={styles.qtyNumber}>1</Text>
          <Text style={styles.qtyNumber}>2</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Cart = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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
        <Text style={styles.headerText}>Cart</Text>
      </View>

      <View style={styles.totalItemsContainer}>
        <Text style={styles.totalItemsText}>3 Items Selected</Text>
        <Text style={styles.totalAmountText}>$89.90</Text>
      </View>

      <FlatList
        data={CartDATA}
        renderItem={({ item }) => renderCartItem({ item, setModalVisible })}
        keyExtractor={item => item.id}
        nestedScrollEnabled={true} // Enable nested scrolling
      />

      <TouchableOpacity style={styles.placeOrderButton}>
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        {/* Your modal content here */}
      </Modal>
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
    fontWeight: '700',
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
    marginHorizontal:20,
    backgroundColor:"#fff",
    borderRadius:20,
    marginTop:20

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
    fontWeight: '500',
  },
  itemRate: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '500',
  },
  qtyContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  qtyText: {
    color: '#000000',
    fontSize: 16,
  },
  qtyNumber: {
    color: '#000000',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 12,
  },
  closeButtonText: {
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
    borderRadius: 8,
    marginTop: 20,
    elevation: 1,
    position:"relative",
    bottom:100
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Cart;
