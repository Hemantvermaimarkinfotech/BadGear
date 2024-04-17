import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, StatusBar, TouchableOpacity,ScrollView ,Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

const Welcome = ({ navigation }) => {
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const onEnd = () => {
    // Video ended, you can show the thumbnail photo here
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
      <View>
      <View style={{ alignSelf: 'center' }}>
        <Text
          numberOfLines={3}
          style={{
            fontSize: 25,
            color: '#000',
            fontWeight: '500',
            alignSelf: 'center',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: 20,
          }}>
          Welcome to the World’s Largest Retailer of Diesel and Tractor Pulling Apparel!!!
        </Text>
      </View>


<View style={{marginTop: 30,width:"95%",alignSelf:"center"}}>
  <TouchableOpacity onPress={togglePlayPause} style={{ alignItems: 'center', alignSelf: 'center', width: '95%'}}>
    {isPaused ? (
      <View style={{ position: 'relative' }}>
        <Image source={require('../assets/tractor.png')} style={{ height: "88%", width: 350, borderRadius: 20 }} />
        <Image source={require('../assets/playbutton.png')} style={{ position: 'absolute', top: '40%', left: '40%', transform: [{ translateX: -15 }, { translateY: -15 }], height: 70, width: 70 }} />
      </View>
    ) : (
      <Video
        source={require('../assets/welcomevideo.mp4')} // Change to your video source
        ref={videoRef}
        style={{ height: "85%", width: 350, borderRadius: 20 }} // Adjust dimensions as needed
        resizeMode="cover"
        paused={isPaused}
        onEnd={onEnd}
      />
    )}
  </TouchableOpacity>
</View>
      </View>


   <View style={{position: 'absolute',
        bottom:onEnd,
            left: '45%',
            zIndex: 999,
            bottom:80}}>
   <TouchableOpacity onPress={handleSkip}>
        <Text
          style={{
            color: '#000',
            fontSize: 20,
            textAlign: 'center',
            textDecorationLine: 'underline',
            
          }}>
          Skip
        </Text>
      </TouchableOpacity>
   </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
});
