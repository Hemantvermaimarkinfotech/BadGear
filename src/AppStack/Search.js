// #This code is written by Hemant Verma

import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions ,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import he from "he";
import LoginBottomSheet from '../Components/LoginBottomSheet';

const { width } = Dimensions.get('window');

const numColumns = 2;

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Search = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
  };
  const handleSearch = () => {
    console.log("hello");
    setLoading(true);
    fetch(`https://bad-gear.com/wp-json/search-api/v1/search?search=${searchQuery}`)
      .then(response => response.text()) 
      .then(text => {
        try {
          const data = JSON.parse(text); 
          console.log('Parsed data:', data); 
          if (data.status === 'success') {
            setSearchResults(data.data);
          } else {
            console.log('Search failed:', data.error);
          }
        } catch (error) {
          console.log('Error parsing JSON:', error);
          console.log('Raw response:', text); 
        }
      })
      .catch(error => {
        console.log('Error fetching search results:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery]);

  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={{ width: "50%",alignSelf:"center"}}  onPress={() =>
      navigation.navigate('ProductDetails', {
        productId: item.post_id,
      })
    }>
      <View style={styles.Catitem}>
        {loading ? ( 
          <ShimmerPlaceholder
            style={styles.Catimage}
            duration={1000} 
          />
        ) : (
          <Image style={styles.Catimage} source={{ uri: item.image }} />
        )}
      </View>
      <View
        style={{
        justifyContent:"center",
        alignItems:"center"
        }}>
        <Text 
        numberOfLines={2}
          style={{
            color: '#000000',
            fontSize: 15,
            width: 120,
            fontFamily: "Gilroy-SemiBold",
            lineHeight: 18
          }}>
        {he.decode(item?.title)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Image source={require("../assets/search.png")} style={{height:24,width:24,tintColor:"#F10C18"}}/>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search here..."
            placeholderTextColor="rgba(30, 30, 50, 0.6)"
            style={styles.input}
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          {searchQuery ? (
            <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
              <Text style={styles.clearButtonText}>×</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>


      {loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#F10C18" size="large" />
    </View>
  ) : (
    <View style={{ width: "100%", alignSelf: "center", marginBottom: 120,}}>
      <FlatList
          showsVerticalScrollIndicator={false}
          data={searchResults}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()} // Handle missing id
          contentContainerStyle={styles.flatListContent}
        />
    </View>
  )}
      <TouchableOpacity style={styles.button} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFCFC',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.4,
    borderBottomColor: 'rgba(112, 112, 112, 0.3)',
    height: 60,
    paddingHorizontal: 20,
    alignItems:"center"
    
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#23233C',
    fontFamily: 'Gilroy-Medium',
    fontSize: 17,
  },
  searchButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#F10C18',
    borderRadius: 8,
  },
  searchButtonText: {
    color: 'white',
    fontFamily: 'Gilroy-Medium',
  },
  resultsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: "center"
  },
  resultItem: {
    marginHorizontal: 12,
    alignItems: 'center',
    height: 190,
    width: "50%",
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    borderWidth: 1,
    elevation: 0.5,
    marginTop: 20,
  },
  resultImage: {
    width: '100%',
    height: 150,
    resizeMode: "contain",
    borderRadius: 8,
  },
  resultName: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Gilroy-Medium',
  },
  button: {
    height: 55,
    width: '90%',
    alignSelf: 'center',
    borderColor: '#F10C18',
    borderWidth: 1,
    borderRadius: 8,
    position: "absolute",
    bottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: "#F10C18"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Gilroy-Medium',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60, 
  },
  Catitem: {
    margin: 10,
    alignItems: 'center',
    height: 170,
    width: "50",
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    justifyContent: 'center',
    borderWidth: 1,

  },
  Catimage: {
    width: 125,
    height: 145,
    resizeMode: "stretch"
  },
  clearButton: {
  marginRight:20,

  },
  clearButtonText: {
    fontSize: 24,
    color: '#F10C18',
  },
  inputContainer: {
  justifyContent:"space-between",
  flexDirection:"row",
  alignItems:"center"
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#23233C',
    fontFamily: 'Gilroy-Medium',
    fontSize: 17,
  },

});

export default Search;
