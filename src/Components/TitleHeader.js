import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/Feather';
const TitleHeader = ({title}) => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        borderBottomWidth: 0.4,
        borderBottomColor: 'rgba(112, 112, 112, 0.3)',
        height: 60,
        opacity: 1,
        justifyContent: 'center',
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
          <Text style={{color: '#000000', fontSize: 20, fontFamily:"Gilroy-SemiBold"}}>
            {title}
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
            {/* <Image
            source={require('../assets/search.png')}
            style={[styles.headericon,{tintColor:"#000000"}]}
          /> */}
            <AntDesign name="search" size={22} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TitleHeader;

const styles = StyleSheet.create({
  mainheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  headericon: {
    height: 20,
    width: 20,
    tintColor: '#000',
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
});
