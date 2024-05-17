import React, {useEffect, useState} from 'react';
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
import {getNewArrivals} from '../Components/ApiService';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder=createShimmerPlaceholder(LinearGradient)

const ITEMS_PER_PAGE = 6;

const NewArrival = ({navigation}) => {
  const [arrivalData, setArrivalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    if (loading || allLoaded) return;

    try {
      setLoading(true);
      const response = await getNewArrivals(currentPage, ITEMS_PER_PAGE);
      setArrivalData(prevData => [...prevData, ...response]);
      if (response.length < ITEMS_PER_PAGE) {
        setAllLoaded(true);
      }
    } catch (error) {
      console.error('Error fetching new arrivals:', error);
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

  const renderArrivelItem = ({item}) => {
    return (
      <TouchableOpacity   onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.product_id,
        })
      }>
      <View style={styles.Catitem}>
        {loading ? ( // Check if loading
          <ShimmerPlaceholder
            style={styles.Catimage}
            duration={1000} // Duration of the shimmer animation
          />
        ) : (
          <Image style={styles.Catimage} source={{uri: item?.product_img}} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginTop: 1,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 15,
            width: 120,
            fontWeight: 600,
            fontFamily:"Gilroy-SemiBold",
            lineHeight:18
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{ width: 100 }}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            item?.product_name
          )}
        </Text>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft:10
          }}>
          <Image
            source={require('../assets/heart.png')}
            style={{tintColor: '#000000'}}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center',marginTop:5}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontWeight: 500,
            marginLeft: 18,
            fontFamily:"Gilroy-SemiBold"
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{ width: 80 }}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            item?.price
          )}
        </Text>
      </View>
    </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#F10C18" /> : null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'New Arrivals'} />
      <View style={{alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={arrivalData}
          renderItem={({item}) => renderArrivelItem({item})}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewArrival;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth:1,
    width:"100%",
    paddingHorizontal:10,
    backgroundColor:"#FBFCFC"
  },
  Catitem: {
    margin: 10,
    alignItems: 'center',
    height: 170,
    width: 170,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    borderWidth:1
  },
  Catimage: {
    width: 125,
    height: 145,
    borderRadius: 50,
  },
});
