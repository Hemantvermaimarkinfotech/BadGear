// #This code is written by Hemant Verma

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
  Alert
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import { getNewArrivals } from '../Components/ApiService';
import he from "he";
import { AuthContext } from '../Components/AuthProvider';
import axios from "react-native-axios";

const NewArrival = ({ navigation }) => {
  const [arrivalData, setArrivalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    fetchNewArrivals();
  }, [currentPage]);

  useEffect(() => {
    if (arrivalData.length > 0 && arrivalData.length % itemsPerPage === 0) {
      fetchNewArrivals();
    }
  }, [arrivalData]);

  const fetchNewArrivals = async () => {
    if (loading || allLoaded) return;

    try {
      setLoading(true);
      const response = await getNewArrivals(currentPage, itemsPerPage);
      const decodedResponse = response.map(arrival => ({
        ...arrival,
        title: arrival.title ? he.decode(arrival.title) : '',
      }));

      setArrivalData(prevData => [...prevData, ...decodedResponse]);

      if (decodedResponse.length < itemsPerPage) {
        setAllLoaded(true);
      }

    } catch (error) {
      console.log('Error fetching new arrivals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && !allLoaded) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleNavigateToProductDetails = (item) => {
    const tokenExists = userToken && userToken.token ? userToken.token : userToken;

    if (tokenExists) {
      navigation.navigate('ProductDetails', {
        productId: item.product_id,
      });
    } else {
      Alert.alert(
        'Please Login',
        'You need to login to view product details.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Login',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );
    }
  };

  const handleAddToWishlist = async (item) => {
    const tokenExists = userToken && userToken.token;

    if (tokenExists) {
      const productId = item.product_id;

      try {
        const config = {
          method: 'post',
          url: `https://bad-gear.com/wp-json/add-product-wishlist/v1/addProductWishlist?product_id=${productId}`,
          headers: {
            Authorization: `Bearer ${userToken.token}`,
          },
        };

        const response = await axios.request(config);
        console.log(response?.data?.successmsg);
      } catch (error) {
        console.log('Error adding to Wishlist:', error.message);
      }
    } else {
      navigation.navigate('Login');
    }
  };

  const renderArrivalItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: "50%", marginTop: 20 }} onPress={() =>
        handleNavigateToProductDetails(item)
      }>
        <View style={styles.Catitem}>
          <Image style={styles.Catimage} source={{ uri: item?.product_img }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 1,
            marginLeft: 10
          }}>
          <Text
            numberOfLines={2}
            style={{
              color: '#000000',
              fontSize: 15,
              width: 120,
              fontWeight: '600',
              fontFamily: "Gilroy-SemiBold",
              lineHeight: 18,
            }}>
            {he.decode(item?.product_name)}
          </Text>
          <TouchableOpacity onPress={() => handleAddToWishlist(item)}
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#fff',
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10
            }}>
            <Image
              source={require('../assets/heart.png')}
              style={{ tintColor: '#000000' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', marginTop: 5 }}>
          <Text
            style={{
              color: '#000000',
              fontSize: 17,
              fontWeight: '500',
              marginLeft: 18,
              fontFamily: "Gilroy-SemiBold"
            }}>
            {item?.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'New Arrivals'} />
      {loading && currentPage === 1 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#F10C18" size="large" />
        </View>
      ) : (
        <View style={{ width: "100%", alignSelf: "center", flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={arrivalData}
            renderItem={renderArrivalItem}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={loading ? (
              <View style={styles.loading}>
                <ActivityIndicator color="#F10C18" size="large" />
              </View>
            ) : null}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewArrival;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FBFCFC"
  },
  Catitem: {
    margin: 10,
    alignItems: 'center',
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Catimage: {
    width: 125,
    height: 145,
    resizeMode: "cover"
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

