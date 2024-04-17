import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
const CatDATA = [
  {id: '1', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '2', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '3', text: '18 to Life', image: require('../assets/cat3.png')},
  {id: '4', text: 'Bad Woman', image: require('../assets/cat1.png')},
  {id: '5', text: 'Hats', image: require('../assets/cat2.png')},
  {id: '6', text: '18 to Life', image: require('../assets/cat3.png')},
  // category data
];

const ArrivalsDATA = [
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
  // NEW Arival data
];

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

const renderCategoryItem = ({item,navigation}) => (
  <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{ProductId:item})}>
    <View style={styles.catitem}>
      <Image style={styles.image} source={item.image} />
    </View>
    <Text
      style={{
        textAlign: 'center',
        color: '#000000',
        fontSize: 14,
        fontWeight: 600,
      }}>
      {item.text}
    </Text>
  </TouchableOpacity>
);

const renderArrivelItem = ({item,navigation}) => (
  <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{ ProductId: item })}>
    <View style={styles.Arrivelitem}>
      <Image style={styles.Arrivalimage} source={item.image} />
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
          fontSize: 14,
          width: 100,
          textAlign: 'center',
          fontWeight: 600,
        }}>
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
        }}>
        <Image
          source={require('../assets/heart.png')}
          style={{color: '#000000'}}
        />
      </View>
    </View>
    <View
      style={{justifyContent: 'center',marginTop: 10}}>
      <Text style={{color: '#000000',fontSize: 17, fontWeight: 480,marginLeft:16}}>
        {item.rate}
      </Text>
    </View>
  </TouchableOpacity>
);

const renderBestSellingItem = ({item,navigation}) => (
  <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{ ProductId: item })}>
    <View style={styles.Arrivelitem}>
      <Image style={styles.Arrivalimage} source={item.image} />
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
          fontSize: 14,
          width: 100,
          textAlign: 'center',
          fontWeight: 600,
        }}>
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
        }}>
        <Image
          source={require('../assets/heart.png')}
          style={{color: '#000000'}}
        />
      </View>
    </View>
    <View
      style={{justifyContent: 'center', marginTop: 10}}>
      <Text style={{color: '#000000', fontSize: 17, fontWeight: 480,marginLeft:16}}>
        {item.rate}
      </Text>
    </View>
  </TouchableOpacity>
);

const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
            Welcome Jack
          </Text>
        </View>
        <View style={{flexDirection: 'row',width:"30%",justifyContent:"center",alignItems:"center"}}>
          <TouchableOpacity onPress={()=>navigation.navigate("WishList")}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("search")}>
            <Image
              source={require('../assets/search.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <Image
            source={require('../assets/homebanner.png')}
            style={{height: 200, resizeMode: 'cover', width: '100%'}}
          />
          <Text
            numberOfLines={3}
            style={{
              color: '#fff',
              fontWeight: 600,
              fontSize: 20,
              top: 15,
              width: '80%',
              textAlign: 'center',
              position: 'absolute',
            }}>
            The Best Place to Find and Purchase the Best Diesel Swag on the
            Planet !!!
          </Text>
        </View>
        <View style={styles.category}>
          <View style={styles.categoryheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Category
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("Category")}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
                  showsHorizontalScrollIndicator={false}
              horizontal
              data={CatDATA}
              renderItem={({item})=>renderCategoryItem({item,navigation})}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.NewArrivel}>
          <View style={styles.Arrivelheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              New Arrivals
            </Text>
            <TouchableOpacity onPress={()=>navigation.navigate("NewArrivel")}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
            showsHorizontalScrollIndicator={false}
              horizontal
              data={ArrivalsDATA}
              renderItem={({item})=>renderArrivelItem({item,navigation})}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <View style={styles.NewArrivel}>
          <View style={styles.Arrivelheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Best Selling
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
                  showsHorizontalScrollIndicator={false}
              horizontal
              data={BestSellingDATA}
              renderItem={({item})=>renderBestSellingItem({item,navigation})}
              keyExtractor={item => item.id}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  headericon: {
    height: 17,
    width: 17,
    tintColor:"#000",
    marginHorizontal:10,
    resizeMode:"contain"
  },
  banner: {
    width: '98%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  categoryheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginTop: 10,
    paddingHorizontal: 20,
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
    width: '98%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  Arrivelitem: {
    margin: 10,
    alignItems: 'center',
    height: 165,
    width: 165,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Arrivalimage: {
    width: 120,
    height: 140,
    borderRadius: 50,
  },
});
