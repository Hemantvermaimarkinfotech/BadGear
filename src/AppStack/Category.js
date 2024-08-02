// #This code is written by Hemant Verma
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';
import {getCategory} from '../Components/ApiService';
import {AuthContext} from '../Components/AuthProvider';
import he from  "he"



const rendercategoryItem = ({ item,navigation }) => {
  return (
    <TouchableOpacity style={{ width: "50%", marginTop: 20 }}
    onPress={() =>
      navigation.navigate('SingleCategory', {
        ProductId: item.cat_id,
      })
    }
    >
      <View style={styles.Catitem}>
      {item.cat_image && item.cat_image.trim() !== '' ? (
    <Image style={styles.Catimage} source={{uri: item.cat_image}} />
  ) : (
    <Image style={styles.Catimage} source={require('../assets/Arrival1.png')} />
  )}
      </View>
      <View
        style={{
          marginTop: 1,
          justifyContent:"center",
          alignItems:"center",
         
        }}>
        <Text
          numberOfLines={2}
          style={{
            color: '#000000',
            fontSize: 15,
            width: 120,
            fontWeight: '600',
            fontFamily: "Gilroy-SemiBold",
            lineHeight: 18,
            textAlign:"center"
          }}>
          {item?.cat_name}
        </Text>
    
      </View>
    
    </TouchableOpacity>
  );
};

const Category = ({navigation}) => {
  const {userToken} = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true); 
        const fetchedCategories = await getCategory(userToken);
        setCategories(fetchedCategories);
      } catch (error) {
        console.log('Error fetching categories:', error);
      }
      finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, [userToken]);

  return (
    <SafeAreaView style={styles.container}>
  <TitleHeader title={'Category'} />
  {loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#F10C18" size="large" />
    </View>
  ) : (
    <View style={{ alignSelf: 'center' ,marginBottom:100}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={categories}
        renderItem={({ item }) =>
          rendercategoryItem({ item, navigation: navigation })
        }
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
      />
    </View>
  )}
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
    height: 190,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
  },
  Catimage: {
    width: 125,
    height: 145,
    resizeMode: "cover"
  },
});



