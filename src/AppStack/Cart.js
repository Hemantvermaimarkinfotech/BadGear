import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "react-native-axios";
import { SelectCountry } from "react-native-element-dropdown";

const Cart = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [country, setCountry] = useState('1');

  const goBack = () => {
    navigation.goBack();
  };

  const data = [
    { label: 'X', value: '1' },
    { label: 'M', value: '2' },
    { label: 'L', value: '3' },
    { label: 'XL', value: '4' },
    { label: 'L', value: '5' },
    { label: 'L', value: '6' },
    { label: 'L', value: '7' },
  ];

  const renderCartItem = ({ item }) => (
    <View>
      <View style={styles.cartItem}>
        <View style={styles.imageContainer}>
          {item?.product_img ? (
            <Image
              source={{ uri: item.product_img }}
              style={styles.image}
            />
          ) : (
            <Text style={{color:"#000000"}}>No Image Available</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.itemText}>Kenworth Red Skull Hoodie</Text>
          <Text style={styles.itemRate}>${item.price}</Text>
          <View style={styles.qtyContainer}>
            <View style={styles.qtySection}>
              <TouchableOpacity style={styles.qtybtn} onPress={() => setSelectedQuantity(selectedQuantity - 1)}>
                <Text style={styles.btntext}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{selectedQuantity}</Text>
              <TouchableOpacity style={styles.qtybtn} onPress={() => setSelectedQuantity(selectedQuantity + 1)}>
                <Text style={styles.btntext}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.sizeSection]}>
              <Text style={{fontSize:15,color:"#000000",fontFamily:"Gilroy-SemiBold"}}>Size:</Text>
              <SelectCountry
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={country}
                data={data}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select size"
                searchPlaceholder="Search..."
                onChange={e => {
                  setCountry(e.value);
                }}
                showVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const GetCartItems = async () => {
    try {
      const response = await axios.get(
        'https://bad-gear.com/wp-json/get-cart-items/v1/GetCartItems',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('response cart', response.data.data);
      if (response.data.status === "success") {
        setCartItems(response.data.data);
      } else {
        console.error('Error: Unexpected response format:', response);
      }
    } catch (error) {
      console.error('Error fetching Cart Items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetCartItems();
  }, []);

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
          <View style={styles.totalItemsContainer}>
            <Text style={styles.totalItemsText}>3 Items Selected</Text>
            <Text style={styles.totalAmountText}>$89.90</Text>
          </View>

      <View style={{marginBottom:200}}>
      <FlatList
            data={cartItems}
            renderItem={({ item }) => renderCartItem({ item })}
            keyExtractor={item => item.product_id.toString()}
            nestedScrollEnabled={true}
          />

<TouchableOpacity style={styles.placeOrderButton}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
      </View>

         
        </>
      )}

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
    backgroundColor:"#FBFCFC",
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
   fontFamily:"Gilroy-SemiBold",
    color: '#000000',
  },
  totalAmountText: {
    fontSize: 20,
    fontFamily:"Gilroy-SemiBold",
    color: '#F10C18',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 20,
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
    elevation: 1,
    position: "relative",
    bottom: 20,
    top:20
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
    width: "100%",
  },
  qtySection: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: "48%",
    borderColor: "#B2B2B2",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  sizeSection: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: "48%",
    borderColor: "#B2B2B2",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5
  },
  qtybtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    fontSize: 20,
    color: "#000000",
    fontFamily:"Gilroy-SemiBold"
  },
  dropdown: {
    height: 30,
    paddingHorizontal: 8,
    width: 53
  },
  placeholderStyle: {
    fontSize: 15,
  },
  selectedTextStyle: {
    fontSize: 15,
    color: "#000000"
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: "#000"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText:{
    color:"#000000",
    fontSize:15,
    fontFamily:'Gilroy-SemiBold'
  }
});

export default Cart;
