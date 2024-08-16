
// #This code is written by Hemant Verma
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import axios from 'react-native-axios';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import Watchvideo from "../assets/video1.mp4";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Choice = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [choice, setChoice] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [videoSource, setVideoSource] = useState(null);

  const fetchChoiceData = () => {
    axios.get('https://bad-gear.com/wp-json/welcomescreen/v1/welcome_screen')
      .then(response => {
        console.log(JSON.stringify(response.data.data));
        setChoice(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchChoiceData();
  }, []);

  const data = [
    {
      id: '1',
      name: 'BAD Gear Shop',
      image: require('../assets/Swiper.png'),
      description: 'Shop Now',
      navigateTo: 'NewArrival1',
    },
    {
      id: '2',
      name: 'Pulling & Show Schedule',
      image: require('../assets/Swiper2.png'),
      description: 'View Events',
      navigateTo: '',
    },
    {
      id: '3',
      name: 'Watch Videos',
      image: require('../assets/Swiper3.png'),
      description: 'Watch Videos',
      navigateTo: '',
    },
    // Add more data as needed
  ];

  if (choice) {
    const choiceData = [
      {
        id: '4',
        name: 'BAD Gear Shop',
        image: { uri: choice.shopnow_img },
        description: 'Shop Now',
        navigateTo: 'NewArrival1',
      },
      {
        id: '5',
        name: 'Pulling & Show Schedule',
        image: { uri: choice.event_img },
        description: 'View Events',
        navigateTo: '',
      },
      {
        id: '6',
        name: 'Watch Videos',
        image: { uri: choice.videos_img },
        description: 'Watch Videos',
        navigateTo: '',
      },
    ];

    data.splice(0, 3, ...choiceData);
  }

  const handleNavigation = (screenName, description) => {
    if (description === 'Watch Videos') {
      setVideoSource(Watchvideo);
      setModalVisible(true);
    } else if (screenName !== '') {
      navigation.navigate(screenName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} color={"#F10207"} />
        </View>
      ) : (
        <View style={{ flex: Platform.OS === 'ios' ? 0.75 : 0.7 }}>
          <Swiper
            showsPagination={true}
            dot={<View style={styles.dot} />}
            activeDot={<View style={[styles.dot, styles.activeDot]} />}
            paginationStyle={{ bottom: screenHeight * 0.01 }} 
          >
            {data.map(item => (
              <View key={item.id} style={styles.slide}>
                <Text style={styles.name}>{item.name}</Text>
                <Image source={item.image} style={styles.image} />
                <TouchableOpacity
                  onPress={() => handleNavigation(item.navigateTo, item.description)}
                >
                  <View style={styles.descriptionContainer}>
                    <View style={styles.arrowContainer}>
                      <Image
                        source={require('../assets/arrow.png')}
                        style={styles.arrow}
                      />
                    </View>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </Swiper>
        </View>
      )}

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Video
            source={videoSource}
            controls={true}
            style={styles.video}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Image source={require("../assets/close.png")} style={{height:18,width:18,tintColor:"#000"}}/>
          </TouchableOpacity>
        </View>
      </Modal>
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
    marginBottom: screenHeight * 0.1, 
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // To ensure the modal covers the full screen
  
  },
  modalContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 90,
    padding: 10,
    borderRadius: 5,
    right:15
  },
  closeText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Choice;





