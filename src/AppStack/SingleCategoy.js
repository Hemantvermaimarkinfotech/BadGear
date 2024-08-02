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
import axios from "react-native-axios"


//   This is renderCategoryitme
const rendercategoryItem = ({ item,navigation }) => {
  return (
    <TouchableOpacity style={{ width: "50%", marginTop: 20 }}
    onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.product_id
        })
      }
    >
      <View style={styles.Catitem}>
      {/* {item.cat_image && item.cat_image.trim() !== '' ? (
    <Image style={styles.Catimage} source={{uri: item.featured_image}} />
  ) : (
    <Image style={styles.Catimage} source={require('../assets/Arrival1.png')} />
  )} */}
    <Image style={styles.Catimage} source={{uri: item.featured_image}} />
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
          {item?.product_name}
        </Text>
    
      </View>
    
    </TouchableOpacity>

  );
};



const SingleCategory = ({navigation,route}) => {
    const ProductId=route.params
    const productid=ProductId?.ProductId
    console.log("productidd",productid)

  const {userToken} = useContext(AuthContext);
  console.log("userToken",userToken)
  const [categories, setCategories] = useState([]);
  console.log("categories",categories)
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   const fetchCategoryDetails = async () => {
  //     setLoading(true); 
  //     try {
  //       const response = await axios.get(`https://bad-gear.com/wp-json/categoryDetail/v1/category_detail?cat_id=${productid}`);
  //       console.log("Response Data:", response.data);

  //       if (response.data.status === 'success') {
  //         setCategories(response.data.data);
  //       } else {
  //         console.log("Error fetching data:", response.data.success_msg);
  //       }
  //     } catch (error) {
  //       console.log('Error fetching data:', error);
  //     } finally {
  //       setLoading(false); 
  //     }
  //   };

  //   fetchCategoryDetails();
  // }, [productid]);
  useEffect(() => {
    const fetchCategoryDetails = async () => {
      setLoading(true); 
      try {
        const tokenToUse = userToken && userToken.token ? userToken.token : userToken; // Ensure proper token
        const response = await axios.get(
          `https://bad-gear.com/wp-json/categoryDetail/v1/category_detail?cat_id=${productid}`,
          {
            headers: {
              Authorization: `${tokenToUse}`, // Include token in header
            },
          }
        );
        
        console.log("Response Data:", response.data);

        if (response.data.status === 'success') {
          setCategories(response.data.data);
        } else {
          console.log("Error fetching data:", response.data.success_msg);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCategoryDetails();
  }, [productid, userToken]); // Include userToken in dependency array

  return (
    <SafeAreaView style={styles.container}>
  <TitleHeader title={'Category'} />
  {loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#F10C18" size="large" />
    </View>
  ) : (
    <View style={{ alignSelf: 'center' ,marginBottom:100,width:"100%"}}>
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

export default SingleCategory;

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



