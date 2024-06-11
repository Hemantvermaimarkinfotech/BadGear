
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
 Button
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from "react-native-axios";
import { SelectCountry } from "react-native-element-dropdown";
import { Modal } from 'react-native';

const Cart = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [country, setCountry] = useState('1');
  const [selectedCartItem, setSelectedCartItem] = useState(null); // State to hold selected cart item's data

  const goBack = () => {
    navigation.goBack();
  };

  const data = [
    { label: 'X', value: '1' },
    { label: 'M', value: '2' },
    { label: 'L', value: '3' },
    { label: 'XL', value: '4' },
 
  ];

  const updateQuantity = (item, quantityChange) => {
    const updatedCartItems = cartItems.map(cartItem => {
      if (cartItem.product_id === item.product_id) {
        const newQuantity = Math.max(1, cartItem.quantity + quantityChange); // Ensure quantity is at least 1
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
  };

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
            <Text style={{ color: "#000000" }}>No Image Available</Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.itemText}>Kenworth Red Skull Hoodie</Text>
          {/* Updated to show dynamic price */}
          <Text style={styles.itemRate}>${(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.qtyContainer}>
            <View style={styles.qtySection}>
              <TouchableOpacity style={styles.qtybtn} onPress={() => updateQuantity(item, -1)}>
                <Text style={styles.btntext}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity style={styles.qtybtn} onPress={() => updateQuantity(item, 1)}>
                <Text style={styles.btntext}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.sizeSection]}>
              <Text style={{ fontSize: 15, color: "#000000", fontFamily: "Gilroy-SemiBold" }}>Size:</Text>
              <SelectCountry
                style={[styles.dropdown,{}]}
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
                placeholder="size"
                searchPlaceholder="Search..."
                onChange={e => {
                  setCountry(e.value);
                }}
                showVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={() => {
          setSelectedCartItem(item); // Store selected item's data in state
          setModalVisible(true); // Show modal
        }}>
          <Text style={styles.closeButtonText}>X</Text>
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
        const itemsWithQuantity = response.data.data.map(item => ({ ...item, quantity: 1 })); // Add quantity field
        setCartItems(itemsWithQuantity);
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

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={goBack}>
//           <Image
//             source={require('../assets/next.png')}
//             style={styles.headerIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Cart</Text>
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#F10C18" />
//         </View>
//       ) : (
//         <>
//           <View style={styles.totalItemsContainer}>
//             {/* Updated to dynamically show the number of items */}
//             <Text style={styles.totalItemsText}>{cartItems.length} Items Selected</Text>
//             {/* Updated to dynamically show the total amount */}
//             <Text style={styles.totalAmountText}>${getTotalAmount()}</Text>
//           </View>

//           <View style={{ marginBottom:200 }}>
//             <FlatList
//               data={cartItems}
//               renderItem={({ item }) => renderCartItem({ item })}
//               keyExtractor={item => item.product_id.toString()}
//               nestedScrollEnabled={true}
//             />

//             <TouchableOpacity style={styles.placeOrderButton} onPress={()=>navigation.navigate("Checkout")}>
//               <Text style={styles.placeOrderText}>Place Order</Text>
//             </TouchableOpacity>

            
//           </View>
//         </>
//       )}

// <View style={{  justifyContent: 'center', alignItems: 'center', }}>
//   <Modal
//     animationType="slide"
//     transparent={true}
//     visible={modalVisible}
//     onRequestClose={() => {
//       setModalVisible(!modalVisible);
//     }}
//   >
//     <View style={{ flex:1,width: '100%', justifyContent: 'center', alignItems: 'center',}}>
//       <View style={{backgroundColor: '#FFFFFF', width: '100%', position: 'absolute',bottom: 0,height:180,marginHorizontal:15 }}>
//         <View style={{ alignItems: 'center',width:"95%",flexDirection:"row",marginTop:20,alignSelf:"center"}}>
//         <View style={[styles.imageContainer,{height:80,width:80,borderRadius:15}]}>
//         {selectedCartItem?.product_img ? ( // Check if there is a selected item
//                     <Image
//                       source={{ uri: selectedCartItem.product_img }} // Display selected item's image
//                       style={[styles.image, { height: 60, width: 60 }]}
//                     />
//                   ) : (
//                     <Text style={{ color: "#000000",fontSize:12 }}>No Image Available</Text>
//                   )}
//         </View>
//         <View style={{marginLeft:15,width:"60%"}}>
//           <Text style={{color:"#000000",fontSize:18,fontFamily:"Gilroy-Medium"}}>Move from the cart</Text>
//           <Text style={{color:"#000000",fontSize:16,fontFamily:"Gilroy-Regular"}}>Are you sure you want to move this item from cart?</Text>
//         </View>
//         </View>

//         <View style={{height:1,width:"95%",backgroundColor:"#00000010",marginTop:15}}></View>
//         <View style={{marginTop:15,flexDirection:"row",justifyContent:"space-between",width:"95%",alignSelf:"center",paddingHorizontal:50}}>
//         <TouchableOpacity>
//           <Text style={{color:"#F10C18",fontSize:17,fontFamily:"Gilroy-Medium",textDecorationLine:"underline"}}>Remove</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Text style={{color:"#F10C18",fontSize:17,fontFamily:"Gilroy-Medium",textDecorationLine:"underline"}}>Move to Wishlist</Text>
//         </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(!modalVisible)}>
//           <Text style={[styles.closeButtonText,{right:15,}]}>X</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </Modal>
// </View>

//     </SafeAreaView>

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
            <Text style={styles.totalItemsText}>{cartItems.length} Items Selected</Text>
            <Text style={styles.totalAmountText}>${getTotalAmount()}</Text>
          </View>

          <View style={{ marginBottom: 200 }}>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => renderCartItem({ item })}
              keyExtractor={item => item.product_id.toString()}
              nestedScrollEnabled={true}
            />

            <TouchableOpacity style={styles.placeOrderButton} onPress={()=>navigation.navigate("Checkout")}>
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{color:"#000000",fontSize:18,fontFamily:"Gilroy-Medium"}}>No items in the cart</Text>
        </View>
      )}
    </>
  )}

  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    {/* Modal Component */}
    {/* Your Modal Code Here */}
  </View>
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
