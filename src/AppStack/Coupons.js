import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions ,ActivityIndicator} from 'react-native';
import MainHeader from '../Components/MainHeader';





const Coupons = () => {

    const data=[
        {id:1,off:"20% Off",couponsname:"Home Decor",needcoupons:"On minimum purchase of Rs. 1,999"},
        {id:2,off:"50% Off",couponsname:"Home Furnishing",needcoupons:"On minimum purchase of Rs. 3,999"},
        {id:3,off:"25% Off",couponsname:"Mobile Accessories",needcoupons:"On minimum purchase of Rs. 999"}
    ]
 

  

  return (
   <SafeAreaView style={styles.container}>
    <MainHeader title={"My Coupons"}/>


   </SafeAreaView>
     
  );
};

const styles = StyleSheet.create({
 container:{
    backgroundColor:"#FBFCFC"
 }
});

export default Coupons;
