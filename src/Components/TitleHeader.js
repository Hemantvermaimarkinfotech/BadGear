// #This code is written by Hemant Verma
import React, {useEffect, useState,useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthProvider';


const TitleHeader = ({title, cartLength}) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const {userToken, setUserToken} = useContext(AuthContext);

  const goBack = () => {
    navigation.goBack();
  };

  const isDummyToken = () => {
    return userToken === 'dummy-token';
  };

  const handleNavigation = (page) => {
    if (isDummyToken()) {
      Alert.alert('Access Denied', 'You are not logged in.');
    } else {
      navigation.navigate(page);
    }
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
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
          <Text style={{color: '#000000', fontSize: 20, fontFamily: "Gilroy-SemiBold"}}>
            {title && title.length > 14 ? title.substring(0, 14) + "..." : title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '35%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => handleNavigation('WishList')}>
            <Image
              source={require('../assets/heart2.png')}
              style={styles.headericon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Search')}>
            <Image source={require('../assets/search.png')} style={{height: 25, width: 25, tintColor: "#000000"}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
            {/* <View style={{height: 18, width: 18, backgroundColor: "#F10C18", borderRadius: 8, position: "absolute", top: -8, right: 10, justifyContent: "center", alignItems: "center"}}>
              <Text style={{color: "#fff", fontSize: 12}}>0</Text>
            </View> */}
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
    marginHorizontal: 18,
    resizeMode: 'contain',
  },
});




