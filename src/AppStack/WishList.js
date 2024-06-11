import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getWishList } from '../Components/ApiService';



const renderWishList = ({ item ,navigation}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.imageContainer}>
      <Image
          source={{ uri: item.image }} // Set the source to item.image
          style={styles.image}
        />
      </View>
      <View style={styles.detailsContainer}>
       {item.name ? (
        <Text style={styles.itemText}>{item?.name}</Text>
       ):(
<Text style={styles.itemText}>No name Available</Text>
       )}
        {item.price ? (
          <Text style={styles.itemRate}>$ {item.price}</Text>
        ) : (
          <Text style={styles.itemRate}>$ 200</Text>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Text style={styles.moveToCart}>Move to Cart</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>

    

  );
};


const WishList = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const [wishlist,setWishList]=useState([])
  const [loading, setLoading] = useState(true); // Add loading state

  // console.log("wishlist",wishlist)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true
        // Fetch WishList
        const WishListResponse = await getWishList();
        setWishList(WishListResponse);
        setLoading(false);
        console.log("WishListResponse",WishListResponse)
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData(); // Call the combined fetchData function
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
      <Text style={styles.headerText}>WishList</Text>
    </View>
  
    {loading ? (
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size={"large"} color={"#F10C18"}/>
      </View>
    ) : (
      wishlist.data && wishlist.data.length > 0 ? (
        <FlatList
          numColumns={1}
          data={wishlist.data}
          renderItem={({ item }) => renderWishList({ item, navigation })}
          keyExtractor={item => item.product_id}
        />
      ) : (
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <Text style={{color:"#000000",fontSize:20,fontFamily:"Gilroy-Medium"}}>No wishlist items available</Text>
        </View>
      )
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
