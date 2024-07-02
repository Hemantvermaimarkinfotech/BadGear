import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const dynamicFontSize = screenHeight * 0.029;

const Welcome = ({ navigation }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [showVideo, setShowVideo] = useState(false); // State variable to manage video visibility
  const videoRef = useRef(null);

  const playVideo = () => {
    setShowVideo(true); // Show the video UI when the user presses the play button
  };

  const onEnd = () => {
    // Video ended, navigate to the next screen
    navigation.navigate('Choice');
  };

  const handleSkip = () => {
    // Pause the video if it's currently playing
    if (!isPaused && videoRef.current && videoRef.current.pause) {
      videoRef.current.pause();
    }
    // Navigate to the next screen
    navigation.navigate('Choice');
  };

  return (
    <SafeAreaView style={styles.container}>
      {!showVideo ? ( // Render UI without video if showVideo is false
        <ImageBackground source={require('../assets/tracter3x.png')} style={styles.backgroundImage}>
          <View style={styles.overlay}>
            <View style={styles.header}>
              <Text
                numberOfLines={3}
                adjustsFontSizeToFit
                style={styles.welcomeText}>
                Welcome to the World’s Largest Retailer of Diesel and Tractor Pulling Apparel!!!
              </Text>
            </View>
            <TouchableOpacity onPress={playVideo} style={styles.videoContainer}>
              {/* Show play button */}
              <Image
                source={require('../assets/playbutton.png')}
                style={styles.playButton}
              />
            </TouchableOpacity>
            <View style={styles.skipContainer}>
              <TouchableOpacity onPress={handleSkip}>
                <Text style={styles.skipText}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      ) : (
        <TouchableOpacity onPress={playVideo} style={styles.videoContainer}>
          {/* Video component starts here */}
          <Video
            source={require('../assets/BadGear.mp4')}
            ref={videoRef}
            style={styles.fullScreenVideo}
            resizeMode="stretch"
            paused={isPaused}
            onEnd={onEnd}
            onError={(error) => console.log('Video Error: ', error)} // Add error handling
            controls={false} // Disables video controls
          />
          {/* Skip button */}
          <TouchableOpacity onPress={handleSkip} style={[styles.skipButton,{justifyContent:"center",alignItems:"center",alignSelf:"center"}]}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          {/* End of Video component */}
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
  
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)', // Adding white background with some transparency
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  welcomeText: {
    fontSize: dynamicFontSize,
    color: '#000000', // Changing text color to black for better readability
    lineHeight: dynamicFontSize * 1.7,
    textAlign: 'center',
    fontFamily: "Gilroy-SemiBold",
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Add relative positioning
  },
  playButton: {
    position: 'absolute',
    width: screenHeight * 0.1,
    height: screenHeight * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
  },
  skipContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  skipButton: {
    position: 'absolute',
    bottom: screenHeight * 0.03, // Adjust the vertical position according to screen height
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: screenHeight * 0.01, // Adjust padding according to screen height
    paddingHorizontal: screenWidth * 0.04, // Adjust padding according to screen width
    borderRadius: screenWidth * 0.03, // Adjust border radius according to screen width
 
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily:"Gilroy-Bold"
  },
});
