import React, {useEffect,useState,useContext} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';
import { AuthContext } from '../Components/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
  
  const {userToken, setUserToken} = useContext(AuthContext);

  const Logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('userData');
  };
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
    <TitleHeader title={"Setting"}/>
    <View style={{marginHorizontal:15,marginVertical:10}}>
<TouchableOpacity onPress={() => Logout()}>
          {/* <MaterialIcons name="exit-to-app" size={24} color={'#000'} /> */}
          <Text style={{fontSize:20,fontWeight:600}}>Logout</Text>
        </TouchableOpacity>
</View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});