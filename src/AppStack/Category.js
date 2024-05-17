import React, {useEffect, useState, useContext} from 'react';
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
import {getCategory} from '../Components/ApiService';
import {AuthContext} from '../Components/AuthProvider';
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
const rendercategoryItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('ProductDetails', {ProductId: item})}>
    <View style={styles.Catitem}>
      <Image style={styles.Catimage} source={{uri: item.cat_image}} />
    </View>

    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        numberOfLines={2}
        style={{
          color: '#000000',
          fontSize: 14,
          width: 100,
          textAlign: 'center',
          fontWeight: 600,
        }}>
        {item?.cat_name}
      </Text>
    </View>
  </TouchableOpacity>
);

const Category = ({navigation}) => {
  const {userToken} = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    // Fetch categories when component mounts
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategory(userToken);
        console.log(fetchedCategories);
        setCategories(fetchedCategories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [userToken]);

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={'Category'} />
      {/* renderitem of category */}
      <View style={{alignSelf: 'center'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={categories}
          renderItem={({item}) =>
            rendercategoryItem({item, navigation: navigation})
          }
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#FBFCFC"
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
});
