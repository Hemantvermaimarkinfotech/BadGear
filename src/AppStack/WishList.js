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
import {ScrollView} from 'react-native-gesture-handler';
// This is Cart data
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

const renderCartItem = ({item,navigation}) => (
  <View>
    <View style={styles.Cartitem}>
      <View
        style={{
          height: 150,
          width: 150,
          backgroundColor: '#F8F8F8',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={item.image}
          style={{height: 120, width: 110, resizeMode: 'contain'}}
        />
      </View>
      <View
        style={{
          height: 150,
          width: 185,
          justifyContent: 'center',
          paddingLeft: 20,
        }}>
        <View style={{width: 135}}>
          <Text
            style={{
              fontSize: 18,
              color: '#000000',
              fontWeight: 450,
              textAlign: 'left',
            }}>
            {item.text}
          </Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{fontSize: 18, color: '#000000', fontWeight: 500}}>
            {item.rate}
          </Text>
        </View>

       <TouchableOpacity onPress={()=>navigation.navigate("Cart")}>
       <Text style={{color:"#F10C18",fontSize:13,textDecorationLine:"underline",marginTop:10,fontWeight:700}}>Move to Cart</Text>
       </TouchableOpacity>
      </View>
      <TouchableOpacity style={{position: 'absolute', top: 2, right: 12}}>
        <Text style={{fontSize: 25, color: '#707070'}}>×</Text>
      </TouchableOpacity>
    </View>
    
  </View>
);

const WishList = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#E5E5E5',
          height: 50,
        }}>
        <View style={styles.mainheader}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={goBack}>
              <Image
                source={require('../assets/next.png')}
                style={[styles.headericon, {height: 15, width: 25}]}
              />
            </TouchableOpacity>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700}}>
              WishList
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          paddingHorizontal: 20,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, fontWeight: 700, color: '#000000'}}>
          3 Items Selected
        </Text>
        <Text style={{fontSize: 20, fontWeight: 700, color: '#F10C18'}}>
          $89.90
        </Text>
      </View>
<ScrollView>
<View>
        <FlatList
          numColumns={1}
          data={CartDATA}
        
          renderItem={({item})=>renderCartItem({item,navigation})}
          keyExtractor={item => item.id}
        />
      </View>
<TouchableOpacity
      style={{
        width: '86%',
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F10C18',
        height: 50,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
        elevation: 1,
        color: '#23233C',
        fontSize: 12,
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 20,
          fontWeight: 700,
          textAlign: 'center',
        }}>
        Place Order
      </Text>
    </TouchableOpacity>
</ScrollView>
     
    </SafeAreaView>
  );
};

export default WishList;

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
  Cartitem: {
    height: 170,
    width: '90%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    marginTop: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
 
});
