// #This code is written by Hemant Verma

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
const MainHeader = ({title}) => {
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
        
      </View>
    </View>
  );
};

export default MainHeader;

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
