// #This code is written by Hemant Verma

import React,{useEffect} from 'react';
import { SafeAreaView, View, Image, StyleSheet } from 'react-native';

const Splash = ({navigation}) => {
   useEffect(() => {
    const navigateAfterDelay = setTimeout(() => {
      navigation.navigate('Welcome');
    }, 2000); 


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
    backgroundColor: '#000000',
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
    width: '60%', 
    aspectRatio: 0.8, 
  },
});

export default Splash;
