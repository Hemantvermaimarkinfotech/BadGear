import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

// This is Category data
const CategoryDATA = [
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
const rendercategoryItem = ({item,navigation}) => (
    <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails",{ProductId:item})}>
      <View style={styles.Catitem}>
        <Image style={styles.Catimage} source={item.image} />
      </View>

      <View style={{justifyContent:"center",alignItems:"center"}}>
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
      </View>
      
    </TouchableOpacity>
  );

const Category = ({navigation}) => {
  
    const goBack = () => {
        navigation.goBack();
      };
    
  return (
    <SafeAreaView style={styles.container}>
  <TitleHeader title={"Category"}/>
{/* renderitem of category */}
     <View style={{alignSelf:"center"}}>
            <FlatList
            showsVerticalScrollIndicator={false}
         numColumns={2}
              data={CategoryDATA}
              renderItem={({ item }) => rendercategoryItem({ item, navigation: navigation })}

              keyExtractor={item => item.id}
            />
          </View>
    </SafeAreaView>
  );
};

export default Category;

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
    borderRadius: 50,}
});
