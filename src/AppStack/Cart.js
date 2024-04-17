import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
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

const renderCartItem = ({item,setModalVisible }) => (
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

        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'space-between',
            paddingHorizontal:10
            
          }}>
          <View style={styles.qtybox}>
            <Text style={{color: '#000000', fontSize: 16}}>Qty:</Text>
            <Text style={{color: '#000000', fontSize: 16}}>1</Text>
            <Text style={{color: '#000000', fontSize: 16}}>2</Text>
          </View>
          <View style={styles.qtybox}>
            <Text style={{color: '#000000', fontSize: 16}}>Qty:</Text>
            <Text style={{color: '#000000', fontSize: 16}}>1</Text>
            <Text style={{color: '#000000', fontSize: 16}}>2</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={{position: 'absolute', top: 2, right: 12}}
    //    onPress={() => setModalVisible(true)}
       >
        <Text style={{fontSize: 25, color: '#707070'}}>×</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const Cart = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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
              Cart
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
            // renderItem={(item) => renderCartItem({ item, setModalVisible })}
            renderItem={renderCartItem}
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
          }}
          >
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.cartmodal}>
            <View
              style={{
                height: 110,
                width: 100,
                backgroundColor: '#F8F8F8',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/cat3.png')}
                style={{height: 80, width: 70}}
              />
            </View>

            <View style={{width: 220}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: '#000000',
                  marginTop: 10,
                }}>
                Move from the cart
              </Text>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  fontWeight: 300,
                  marginTop: 10,
                }}>
                Are you sure you want to move this item from cart?
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '65%',
            }}>
            <Text
              style={{
                color: '#F10C18',
                fontSize: 16,
                textDecorationLine: 'underline',
                marginTop: 10,
                fontWeight: 500,
              }}>
              Remove
            </Text>
            <Text
              style={{
                color: '#F10C18',
                fontSize: 16,
                textDecorationLine: 'underline',
                marginTop: 10,
                fontWeight: 500,
              }}>
              Move to Wishlist
            </Text>
          </View>
          
          <TouchableOpacity
            style={{position: 'absolute', top: 5, right: 20}}
            // onPress={() => setModalVisible(!modalVisible)}
            >
            <Text style={{fontSize: 25, color: '#707070'}}>×</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Cart;

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
  qtybox: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    width: 65,
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredView: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: 200,
  },
  cartmodal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '95%',
    marginTop: 10,
    borderBottomColor: '#00000010',
    borderBottomWidth: 1,
    height: 130,
  },
});
