import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

// This is Arrival data
const ArrivalDATA = [
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
  {
    id: '3',
    text: 'Kenworth Teal Flag Hoodie',
    image: require('../assets/Arrival1.png'),
    rate: '$39.95 - $44.95',
  },
  {
    id: '4',
    text: 'Kenworth Teal Flag Hoodie',
    image: require('../assets/Arrival2.png'),
    rate: '$39.95 - $44.95',
  },
  {
    id: '5',
    text: 'Kenworth Teal Flag Hoodie',
    image: require('../assets/Arrival1.png'),
    rate: '$39.95 - $44.95',
  },
  {
    id: '6',
    text: 'Kenworth Teal Flag Hoodie',
    image: require('../assets/Arrival2.png'),
    rate: '$39.95 - $44.95',
  },
];

//   This is renderCategoryitme
const renderArrivelItem = ({item,navigation}) => (
  <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{ProductId:item})}> 
    <View style={styles.Catitem}>
      <Image style={styles.Catimage} source={item.image} />
    </View>

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 1,
      }}>
      <Text
        numberOfLines={2}
        style={{
          color: '#000000',
          fontSize: 14,
          width: 100,
          textAlign: 'center',
          fontWeight: 600,
        }}>
        {item.text}
      </Text>
      <View
        style={{
          height: 30,
          width: 30,
          backgroundColor: '#fff',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/heart.png')}
          style={{color: '#000000'}}
        />
      </View>
    </View>
    <View
      style={{justifyContent: 'center',marginTop: 10,}}>
      <Text style={{color: '#000000', fontSize: 17, fontWeight: 480,marginLeft:16}}>
        {item.rate}
      </Text>
    </View>
  </TouchableOpacity>
);

const NewArrival = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
     <TitleHeader title={"New Arrivals"}/>
      {/* renderitem of category */}
      <View style={{alignSelf: 'center'}}>
        <FlatList
        showsVerticalScrollIndicator={false}
          numColumns={2}
          data={ArrivalDATA}
          renderItem={({item})=>renderArrivelItem({item,navigation})}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewArrival;

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
  Catitem: {
    margin: 10,
    alignItems: 'center',
    height: 170,
    width: 170,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Catimage: {
    width: 120,
    height: 140,
    borderRadius: 50,
  },
  Arrivelitem: {
    margin: 10,
    alignItems: 'center',
    height: 165,
    width: 165,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Arrivalimage: {
    width: 120,
    height: 140,
    borderRadius: 50,
  },
});
