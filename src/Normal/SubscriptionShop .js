// #This code is written by Hemant Verma

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SubscriptionShop = ({ navigation }) => {
  const { width } = Dimensions.get('window');


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          Join Our Subscription
        </Text>
        <Text numberOfLines={5} style={styles.description}>
        Service with huge merchandise discounts, etc.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SubscriptionShop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"#FFFFFF"
    
  },
  content: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#000000',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    fontFamily:"Gilroy-SemiBold",
 
  },
  description: {
    color: '#000000',
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily:"Gilroy-Medium",
    lineHeight:25,
    width:"80%"
  },
  button: {
    backgroundColor: '#F10C18',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    width: '100%',
    marginTop:30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    fontFamily:"Gilroy"
  },
  smallTitle: {
    fontSize: 20,
  },
  smallDescription: {
    fontSize: 16,
  },
  smallButton: {
    height: 40,
  },
});
