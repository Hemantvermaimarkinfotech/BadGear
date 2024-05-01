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

const SubscriptionShop = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          width: '94%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          numberOfLines={1}
          style={{color: '#000', fontSize: 25, fontWeight: '400'}}>
          Join Our Subscription
        </Text>
        <Text
          numberOfLines={5}
          style={{
            color: '#000000',
            fontSize: 20,
            fontWeight: '300',
            textAlign: 'center',
            marginTop: 10,
          }}>
          Service and get huge discounts and Members Only Styles, Access to Our
          Private You Tube Channel, and discounts and presell on tractor pull
          tickets, hotel discounts and restaurants .
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: '#F10C18',
            height: 40,
            width: '70%',
            alignSelf: 'center',
            borderRadius: 10,
            marginTop: 20,
            justifyContent:"center"
          }} onPress={(()=>navigation.navigate("Login"))}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              textAlign: 'center',
              fontWeight: '600',
            }}>
            Subscribe
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center"
  },
});
