import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

const RelatedProductDATA = [
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
  // Related Product data
];

const renderRelatedProductItem = ({item, navigation}) => (
  <TouchableOpacity
  >
    <View style={styles.RelatedProductitem}>
      <Image style={styles.RelatedProductimage} source={item.image} />
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
          fontWeight: '600',
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
    <View style={{justifyContent: 'center', marginTop: 10}}>
      <Text
        style={{
          color: '#000000',
          fontSize: 17,
          fontWeight: 480,
          marginLeft: 16,
        }}>
        {item.rate}
      </Text>
    </View>
  </TouchableOpacity>
);

const ProductDetailsPage = ({route}) => {
  const navigation = useNavigation();
  const {ProductId} = route.params;
  console.log(ProductId,"hello")

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* This is headerpart */}
      <TitleHeader title={"ProductDetails"}/>
      {/* header part end */}

      <ScrollView>
        {/* Upper image */}
        <View style={styles.productbox}>
          <Image source={ProductId?.image} style={styles.productimage} />
        </View>
        {/* Upper image end */}

        <View style={{marginTop: 20, width: '95%'}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: 600,
              marginTop: 10,
              marginLeft: 20,
            }}>
       {ProductId?.text}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#000000',
              marginTop: 10,
              marginLeft: 20,
            }}>
          {ProductId?.rate}
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: 300,
              marginTop: 10,
              marginLeft: 20,
            }}>
            SKU: AGDH
          </Text>
        </View>

        {/* Product Size */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 20,
            }}>
            Size:
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.productSize}>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>L</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>XL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>2x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sizebox}>
              <Text style={styles.sizetext}>3x</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        {/* Product Size end */}

        {/* Product Qty */}
        <View style={{marginTop: 20}}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: 700,
              marginLeft: 20,
            }}>
            QTY:
          </Text>
          <View>
            <View style={styles.qtybox}>
              <Text style={{color: '#000000', fontSize: 18}}>1</Text>
              <Text style={{color: '#000000', fontSize: 18}}>2</Text>
            </View>
          </View>
        </View>
        {/* Product Qty end/}

        {/* Wishlist & AddCart Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 70,
            width: '95%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 60,
              width: 165,
              alignSelf: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              borderColor: '#707070',
              borderWidth: 1,
              paddingHorizontal: 30,
              backgroundColor: '#fff',
            }} onPress={()=>navigation.navigate("WishList")}>
            <Image
              source={require('../assets/heart2.png')}
              style={{
                height: 20,
                width: 20,
                color: '#000000',
                resizeMode: 'contain',
              }}
            />
            <Text style={{color: '#000000', fontSize: 18, fontWeight: 600}}>
              Wishlist
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 60,
              width: 165,
              alignSelf: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              paddingHorizontal: 20,
              backgroundColor: '#F10C18',
            }} onPress={()=>navigation.navigate("Cart")}>
            <Image
              source={require('../assets/Cart.png')}
              style={{
                height: 20,
                width: 20,
                tintColor: '#fff',
                resizeMode: 'contain',
              }}
            />
            <Text style={{color: '#fff', fontSize: 18, fontWeight: 600}}>
              Add To Cart
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        {/* Wishlist $ AddCart Button End */}

        {/* Product Description */}
        <View style={styles.productDescription}>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: 600,
              marginTop: 10,
              marginLeft: 20,
            }}>
            Product Description
          </Text>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              marginTop: 10,
              marginLeft: 20,
              fontWeight: 300,
            }}>
            Kenworth Red Skull Hoodie is screen printed in vibrant colors on
            front and back. Our shirts are of high quality 4.3 oz (7.15 oz/ly,
            146 g) 100% combed ringspun cotton. Available in Black. Sizes S-3XL
            in stock.
          </Text>
        </View>
        {/* Product Description End */}

        {/* Related Product */}
        <View>
          <View style={styles.RelatedProductlheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Related Product
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
              horizontal
              showsHorizontalScrollIndicator={false}
              data={RelatedProductDATA}
              renderItem={renderRelatedProductItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        {/* Related Product End */}

        {/* Review Section */}

        <View style={styles.Review}>
          <View style={styles.RelatedProductlheader}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              Ratings & Reviews
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#F10C18',
                  fontSize: 16,
                  textDecorationLine: 'underline',
                }}>
                Write review
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/Reviewstar.png')}
            style={{marginLeft: 20, marginTop: 10}}
          />
          <View style={{
              marginTop: 10,
              borderRadius: 10,
              alignSelf: 'center',
              width: '90%',

            }}>
                <View
                  style={{
                    height:100,
                    borderBottomColor:"#707070",
                    borderBottomWidth:0.2,
                    width:"100%"
                  }}>
                       <View
        
        >
        <Text style={{color: '#000000', fontSize: 15, fontWeight: 500}}>
          26 ratings and 24 reviews
        </Text>
        <View
          style={{
            marginTop: 10,
            height: 200,
            borderRadius: 10,
            alignSelf: 'center',
            width: '99%',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 28,
              width: 60,
              backgroundColor: '#FFFFFF',
              borderRadius: 25,
              borderColor: '#707070',
              borderWidth: 1,
              flexDirection:"row",
              justifyContent:"space-around",
              alignItems:"center"
            }}>
                <Text style={{color:"#000000",fontSize:13,fontWeight:600}}>5</Text>
                <Image source={require("../assets/star.png")} style={{height:15,width:15,resizeMode:"contain"}}/>
            </View>

            <View style={{width:230,marginLeft:10,height:50,}}>
                <Text style={{fontSize:13,fontWeight:500,marginTop:5}}>Cozy Comfort and Style Combined!</Text>
                <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}>
                <Text style={{color:"#000000",fontSize:12,fontWeight:700}}>David</Text>
                <Text style={{color:"#4B4B4B",fontSize:11,fontWeight:300}}>5 days ago</Text>
            </View>
            </View>
            
        </View>
        
      </View>
                  </View>
       
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 6,

  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
  productbox: {
    height: 290,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: 'center',
  },
  productimage: {
    height: 260,
    width: 300,
    resizeMode: 'contain',
  },
  productSize: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
  },
  sizebox: {
    height: 50,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 5,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  sizetext: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 18,
  },
  qtybox: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    width: 80,
    height: 50,
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 15,
  },
  productDescription: {
    height: 200,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  RelatedProductlheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  RelatedProductitem: {
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
  RelatedProductimage: {
    width: 120,
    height: 140,
    borderRadius: 50,
  },
  Review: {
    height: 350,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    borderRadius: 20,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
});
