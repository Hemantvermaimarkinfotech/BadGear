import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, SafeAreaView, TouchableOpacity, Text, Image, FlatList, Dimensions ,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
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

  const handleSearch = () => {
    console.log("hello");
    setLoading(true);
    fetch(`https://bad-gear.com/wp-json/search-api/v1/search?search=${searchQuery}`)
      .then(response => response.text()) // Change to .text() to see the raw response
      .then(text => {
        try {
          const data = JSON.parse(text); // Try parsing the response as JSON
          console.log('Parsed data:', data); // Log the parsed data
          if (data.status === 'success') {
            setSearchResults(data.data);
          } else {
            console.error('Search failed:', data.error);
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          console.log('Raw response:', text); // Log the raw response for debugging
        }
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
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
    <TouchableOpacity key={item.id} style={{ width: "50%",alignSelf:"center"}} onPress={() =>
      navigation.navigate('ProductDetails', {
        productId: item.id,
      })
    }>
      <View style={styles.Catitem}>
        {loading ? ( // Check if loading
          <ShimmerPlaceholder
            style={styles.Catimage}
            duration={1000} // Duration of the shimmer animation
          />
        ) : (
          <Image style={styles.Catimage} source={{ uri: item.image }} />
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          marginTop: 1,
        }}>
        <Text
          style={{
            color: '#000000',
            fontSize: 15,
            width: 120,
            fontWeight: '600',
            fontFamily: "Gilroy-SemiBold",
            lineHeight: 18
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{ width: 100 }}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            item?.title
          )}
        </Text>
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#fff',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10
          }}>
          <Image
            source={require('../assets/heart.png')}
            style={{ tintColor: '#000000' }}
          />
        </View>
      </View>
      <View style={{justifyContent: 'center',marginTop:5}}>
        <Text
          style={{
            color: '#000000',
            fontSize: 17,
            fontWeight: 500,
            marginLeft: 18,
            fontFamily:"Gilroy-SemiBold"
          }}>
          {loading ? ( // Check if loading
            <ShimmerPlaceholder
              style={{ width: 80 }}
              duration={1000} // Duration of the shimmer animation
            />
          ) : (
            `$${item?.price ?? 'N/A'}`
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={22} color="#F10C18" />
        <TextInput
          placeholder="Search here..."
          placeholderTextColor="rgba(30, 30, 50, 0.6)"
          style={styles.input}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>
      {/* <View style={{ width: "100%", alignSelf: "center", marginBottom: 120 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchResults}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id ? item.id.toString() : Math.random().toString()} // Handle missing id
          contentContainerStyle={styles.flatListContent}
        />
      </View> */}


      {loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator color="#F10C18" size="large" />
    </View>
  ) : (
    <View style={{ width: "100%", alignSelf: "center", marginBottom: 120 }}>
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
    paddingBottom: 60, // Adjust according to button height
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
    borderWidth: 1
  },
  Catimage: {
    width: 125,
    height: 145,
    resizeMode: "stretch"
  }
});

export default Search;
