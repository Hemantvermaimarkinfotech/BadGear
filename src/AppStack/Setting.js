import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import {AuthContext} from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Setting = () => {
  const {userToken, setUserToken} = useContext(AuthContext);

  const Logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userData');
  };
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'Setting'} />
      <View style={{marginHorizontal: 15, marginVertical: 10}}>
        <TouchableOpacity
          onPress={() => Logout()}
          style={{flexDirection: 'row'}}>
          <AntDesign name="logout" size={24} color={'#000'} />
          <Text
            style={{
              fontSize: 20,
              color: '#000000',
              marginLeft: 10,
              fontFamily:"Gilroy-Medium"
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFCFC"
  },
});
