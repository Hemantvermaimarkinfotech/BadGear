import React,{useEffect} from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';

const Splash = ({navigation}) => {
   useEffect(() => {
    const navigateAfterDelay = setTimeout(() => {
      // Navigate to the Welcome screen
      navigation.navigate('Welcome');
    }, 2000); // 2000 milliseconds delay

    // Clean up the setTimeout when the component unmounts
    return () => clearTimeout(navigateAfterDelay);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/image0.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/splashlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%', // Adjust as per your requirement
    aspectRatio: 0.8, // Width:Height ratio of your logo image
  },
});

export default Splash;
