import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
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
      <View style={{backgroundColor: '#000'}}>
        <Image
          source={require('../assets/image0.png')}
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View>
        <Image
          source={require('../assets/splashlogo.png')}
          style={{
            height: 160,
            width: 190,
            // position: 'absolute',
            top:-450,
            alignSelf: 'center',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
