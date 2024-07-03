import React, {useEffect,useContext} from 'react';
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

const TitleHeader = ({title,cartLenth}) => {
  const navigation = useNavigation();



  

  const goBack = () => {
    navigation.goBack();
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
          <Text style={{color: '#000000', fontSize: 20, fontFamily:"Gilroy-SemiBold"}}>
            {title && title.length > 14 ? title.substring(0, 14) + "..."  : title}
            {/* item?.cat_name.length > 14 ? item?.cat_name.substring(0, 14) + '...' : item?.cat_name */}
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
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
             <Image source={require("../assets/search.png")} style={{height:25,width:25,tintColor:"#000000"}}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image
              source={require('../assets/Cart.png')}
              style={styles.headericon}
            />
          <View style={{height:18,width:18,backgroundColor:"#F10C18",borderRadius:8,position:"absolute",top:-8,right:10,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"#fff",fontSize:12}}>0</Text>
            </View>
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
    marginHorizontal: 15,
    resizeMode: 'contain',
  },
});
