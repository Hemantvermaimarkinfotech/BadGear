import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext} from '../Components/AuthProvider';
import SkeletonLoader from '../Components/SkeletonLoader';
import {getNewArrivals, getCategory, getBanner} from '../Components/ApiService';
import AntDesign from "react-native-vector-icons/Feather";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ShimmerPlaceholder=createShimmerPlaceholder(LinearGradient)

const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
  // category data
];

const Home = ({navigation, item}) => {
  const [loading, setLoading] = useState(true); // Add loading state
  const [banner, setBanner] = useState(null);
  const [categories, setCategories] = useState([]);
  const {userToken} = useContext(AuthContext);
  const [Arrivals, setArrivals] = useState([]);
 

  const BestSellingDATA = [
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
      image: require('../assets/Arrival1.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '4',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival2.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '5',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival1.png'),
      rate: '$39.95 - $44.95',
    },
    {
      id: '6',
      text: 'Kenworth Teal Flag Hoodie',
      image: require('../assets/Arrival2.png'),
      rate: '$39.95 - $44.95',
    },
    // Best Selling data
  ];


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true
  
        // Fetch banner
        const bannerResponse = await getBanner(userToken);
        if (bannerResponse.status === 'success') {
          setBanner(bannerResponse);
        } else {
          console.log('Error fetching banner:', bannerResponse);
        }
  
        // Fetch categories
        const categoriesResponse = await getCategory(userToken);
        setCategories(categoriesResponse);
  
        // Fetch new arrivals
        const newArrivalsResponse = await getNewArrivals(userToken);
        setArrivals(newArrivalsResponse);
  
        setLoading(false); // Set loading state to false after all data is fetched
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false); // Ensure loading state is set to false even if there's an error
      }
    };
  
    fetchData(); // Call the combined fetchData function
  
  }, [userToken]);
  

 
  

  const renderCategoryItem = ({ item }) => {
    const catDataItem = CatDATA.find(
      dataItem => dataItem.text === item.cat_name,
    );
    const imageSource = catDataItem
      ? catDataItem.image
      : require('../assets/cat1.png');

    return (
      <TouchableOpacity
        // onPress={() =>
        //   navigation.navigate('ProductDetails', {ProductId: item.cat_id})
        // }
        style={styles.categoryItem}
        key={item.cat_id}>
        <View style={styles.catitem}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={styles.image}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            <Image style={styles.image} source={imageSource} />
          )}
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000000',
            fontSize: 15,
            fontWeight: '600',
            fontFamily:"Gilroy-SemiBold"
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{ width: 100, marginTop: 5 }}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            item.cat_name
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  

  const renderBestSellingItem = ({item, navigation}) => (
    <TouchableOpacity
     
      key={item.id} // Assign a unique key to the TouchableOpacity
    >
      <View style={styles.Arrivelitem}>
        <Image
          style={styles.Arrivalimage}
          source={item.image}
          key={`${item.id}_image`}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginTop: 1,
        }}>
        <Text
          numberOfLines={2}
          style={{
            color: '#000000',
            fontSize: 15,
            width: 100,
            textAlign: 'center',
            fontWeight: 600,
            fontFamily:"Gilroy-SemiBold"
          }}
          key={`${item.id}_text`}>
          {item.text}
        </Text>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={`${item.id}_heart`}>
          <Image
            source={require('../assets/heart.png')}
            style={{tintColor: '#000000'}}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center', marginTop: 10}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontWeight: 500,
            marginLeft: 18,
            fontFamily:"Gilroy-SemiBold"
          }}
          key={`${item.id}_rate`}>
          {item.rate}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{color: '#000000', fontSize: 22,fontFamily:"Gilroy-SemiBold"}}>
            Welcome Jack
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '30%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('WishList')}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('search')}>
          <AntDesign name="search" size={22} color={"#000"}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>


<View style={styles.banner}>
  {loading ? (
    <ShimmerPlaceholder
      style={{ width: '98%', height: 200, borderRadius: 20 }}
      duration={1000}
      colors={['#CCCCCC', '#DDDDDD', '#CCCCCC']} 
    />
  ) : (
    <>
      <View style={{ height: 200, width: '98%' }}>
        <Image
          source={{ uri: banner?.banner_image }}
          style={{
            resizeMode: 'stretch',
            width: '98%',
            height: 200,
            borderRadius: 10,
          }}
        />
      </View>
      <Text
        numberOfLines={3}
        style={{
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: 18,
          top: 15,
          width: '60%',
          textAlign: 'center',
          position: 'absolute',
          height: 200, // Set the same height as the banner image,
          fontFamily:"Gilroy-Bold"
        }}
      >
        {banner?.banner_heading}
      </Text>
    </>
  )}
</View>




        <View style={styles.category}>
          <View style={styles.categoryheader}>
            <Text style={{color: '#000000', fontSize: 24, fontWeight: 600,fontFamily:"Gilroy-SemiBold"}}>
              Category
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily:"Gilroy-Medium",
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={categories} 
              renderItem={({item}) => renderCategoryItem({item, navigation})}
              keyExtractor={item => item.cat_id.toString()} 
            />
          </View>
        </View>

        <View style={styles.NewArrivel}>
          <View style={styles.Arrivelheader}>
            <Text style={{color: '#000000', fontSize: 24, fontWeight: 600,fontFamily:"Gilroy-SemiBold"}}>
              New Arrivals
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('NewArrivel')}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily:"Gilroy-Medium"
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={
                loading ? Array.from(Array(7).keys()) : Arrivals.slice(0, 7)
              } 
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      productId: item.product_id,
                    })
                  }>
                  <View style={styles.Arrivelitem}>
                    {loading ? ( 
                      <ShimmerPlaceholder
                        style={[styles.Arrivalimage,{height:150}]}
                        duration={1000}
                      />
                    ) : (
                      item?.product_img && (
                        <Image
                          style={styles.Arrivalimage}
                          source={{ uri: item.product_img }}
                        />
                      )
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      marginTop: 1,
                    }}>
                    {loading ? ( // Check if loading
                      <ShimmerPlaceholder
                        style={{
                          color: '#000000',
                          fontSize: 14,
                          width: 120,
                          textAlign: 'center',
                          fontWeight: '600',
                        }}
                        duration={1000}
                      />
                    ) : (
                      <Text
                     
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          width: 120,
                          textAlign: 'center',
                          fontWeight: '600',
                          fontFamily:"Gilroy-SemiBold",
                          lineHeight:18
                          
                        }}>
                        {item.product_name}
                      </Text>
                    )}
                    <View
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: '#fff',
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={require('../assets/heart.png')}
                        style={{ tintColor: '#000000' }}
                      />
                    </View>
                  </View>
                  <View style={{ justifyContent: 'center', marginTop: 10 }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 17,
                        fontWeight: '500',
                        marginLeft: 18,
                        fontFamily:"Gilroy-SemiBold"
                      }}>
                      {item.price}
                    </Text>
                  </View>
                </TouchableOpacity>
                
                
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <View style={{marginBottom:20}}>
          <View style={styles.Arrivelheader}>
            <Text style={{color: '#000000', fontSize: 24, fontWeight: 600,fontFamily:"Gilroy-SemiBold"}}>
              Best Selling
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                  fontFamily:"Gilroy-Medium"
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              keyExtractor={(item, index) => `${item.id}_${index}`} // Unique key extractor
              showsHorizontalScrollIndicator={false}
              horizontal
              data={BestSellingDATA}
              renderItem={({item}) => renderBestSellingItem({item, navigation})}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFCFC",

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
   marginVertical:15,
  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  banner: {
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 10,
  },

  catitem: {
    margin: 10,
    alignItems: 'center',
    height: 93,
    width: 93,
    borderRadius: 50,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 50,
    // resizeMode:"contain"
  },
 
  Arrivelheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  Arrivelitem: {
    margin: 10,
    alignItems: 'center',
    height: 170,
    width: 170,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Arrivalimage: {
    width: 125,
    height: 145,
    borderRadius: 50,
  },
  gradientContainer: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  shimmerPlaceholder: {
    flex: 1,
  },
});
