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
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import { getNewArrivals } from '../Components/ApiService';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import he from "he";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ITEMS_PER_PAGE = 6;

const NewArrival = ({ navigation }) => {
  const [arrivalData, setArrivalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  // const renderFooter = () => {
  //   return (
  //     loading ? (
  //       <View style={styles.loading}>
  //         <ActivityIndicator color="#F10C18"  style={{height:100,width:200}}/>
  //       </View>
  //     ) : null
  //   );
  // };

  const fetchNewArrivals = async () => {
    if (loading || allLoaded) return;

    try {
      setLoading(true);
      const response = await getNewArrivals(currentPage, ITEMS_PER_PAGE);

      // Decode HTML entities in arrival data
      const decodedResponse = response.map(arrival => ({
        ...arrival,
        title: arrival.title ? he.decode(arrival.title) : '', // Check if title exists before decoding
        // Add more fields to decode if necessary
      }));

      setArrivalData(prevData => [...prevData, ...decodedResponse]);

      if (response.length < ITEMS_PER_PAGE) {
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
      setCurrentPage(currentPage + 1);
      fetchNewArrivals();
    }
  };

  const renderArrivelItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: "50%", marginTop: 20 }} onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.product_id,
        })
      }>
        <View style={styles.Catitem}>
          <Image style={styles.Catimage} source={{ uri: item?.product_img }} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            marginTop: 1,
            marginLeft:10
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
          <TouchableOpacity onPress={()=>navigation.navigate("WishList")}
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
  {loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#F10C18" size="large" />
    </View>
  ) : (
    <View style={{ width: "100%", alignSelf: "center", flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={arrivalData}
        renderItem={renderArrivelItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
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
  //  position:"relative",
  //  top:"80%",
  //  zIndex:999,
  //  borderWidth:1,

  },
});
