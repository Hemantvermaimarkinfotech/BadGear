import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const data = [
  {
    id: '1',
    name: 'BAD Gear Shop',
    image: require('../assets/Swiper.png'),
    description: 'Shop Now',
  },
  {
    id: '2',
    name: 'Pulling & Show Schedule',
    image: require('../assets/Swiper2.png'),
    description: 'View Events',
  },
  {
    id: '3',
    name: 'Watch Videos',
    image: require('../assets/Swiper3.png'),
    description: 'Watch Videos',
  },
  // Add more data as needed
];

const Choice = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: Platform.OS === 'ios' ? 0.75 : 0.7 }}>
        <Swiper
          showsPagination={true}
          dot={<View style={styles.dot} />}
          activeDot={<View style={[styles.dot, styles.activeDot]} />}
          paginationStyle={{ bottom: screenHeight * 0.01 }} // Adjust pagination position
        >
          {data.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Text style={styles.name}>{item.name}</Text>
              <Image source={item.image} style={styles.image} />
              <View style={styles.descriptionContainer}>
                <View style={styles.arrowContainer}>
                  <Image
                    source={require('../assets/arrow.png')}
                    style={styles.arrow}
                  />
                </View>
                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: screenHeight * 0.1,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenHeight * 0.4,
    resizeMode: 'contain',
    marginTop: screenHeight * 0.02,
  },
  name: {
    fontSize: screenWidth * 0.07,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Gilroy-SemiBold',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.1, // Added marginBottom to ensure space for dots
  },
  arrowContainer: {
    height: screenWidth * 0.09,
    width: screenWidth * 0.09,
    backgroundColor: '#F10207',
    borderRadius: (screenWidth * 0.09) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    height: screenWidth * 0.075,
    width: screenWidth * 0.075,
    tintColor: '#fff',
  },
  description: {
    color: '#000000',
    fontSize: screenWidth * 0.05,
    fontWeight: '700',
    marginLeft: screenWidth * 0.025,
    fontFamily: 'Gilroy-SemiBold',
  },
  dot: {
    backgroundColor: '#ccc',
    width: screenWidth * 0.025,
    height: screenWidth * 0.025,
    borderRadius: (screenWidth * 0.025) / 2,
    marginHorizontal: screenWidth * 0.02,
  },
  activeDot: {
    backgroundColor: '#F10C18',
  },
  skipContainer: {
    position: 'absolute',
    bottom: screenHeight * 0.05,
    left: '45%',
    zIndex: 10,
  },
  skipText: {
    color: '#000000',
    fontSize: screenWidth * 0.04,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Gilroy-Medium',
  },
});

export default Choice;
