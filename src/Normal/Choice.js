import React from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
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

const Choice = ({navigation}) => {
  return (
 
    <SafeAreaView style={styles.container}>
      <View style={{flex:1,marginTop:80}}>

     <Swiper
      showsPagination={true}
      dot={<View style={styles.dot} />}
      activeDot={<View style={[styles.dot, styles.activeDot]} />}
    
    >
      {data.map((item) => (
        <View key={item.id} style={styles.slide}>
            <Text style={styles.name}>{item.name}</Text>
          <Image source={item.image} style={styles.image} />
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
      
            marginTop: 20,
          }}>
          <View
            style={{
              height: 35,
              width: 35,
              backgroundColor: '#F10207',
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/arrow.png')}
              style={{height: 30, width: 30, tintColor: '#fff'}}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Text style={{color: '#000000', fontSize: 20, fontWeight: 700,marginLeft:10}}>
              {item.description}
            </Text>
          </View>
        </View>
    
        </View>
      ))}
    </Swiper>
   
   
    
   <View style={{position: "absolute", bottom: 80, left: "45%",zIndex:10}}>
   <TouchableOpacity onPress={() => navigation.navigate('Subscription')}>
      <Text style={{ color: "#000000", fontSize: 18, textAlign: "center", marginTop: 20, textDecorationLine: 'underline', 
      }}>Skip</Text>
    </TouchableOpacity>
   </View>
   </View>
    </SafeAreaView>
 
  );
};

const styles = StyleSheet.create({
  container:{
flex:1,
backgroundColor:'#FFFFFF'
  },
  slide: {
 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 480,
    height: 360,
    resizeMode: 'contain',
    marginTop:20
  },
  name: {
    fontSize: 29,
    fontWeight: '600',
    color:"#000000",
    fontFamily: 'Gilroy-SemiBold', 
   
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Swis721HvBT-Heavy', 
  },
  dot: {
    backgroundColor: '#ccc',
    width: 10, // Adjust the size based on screen width
    height: 10, // Adjust the size based on screen width
    borderRadius:10, // Adjust the size based on screen width
    marginLeft: 8,
    marginRight: 8,
    marginTop: 0,
    marginBottom: screenHeight * 0.3,

   
  },
  activeDot: {
    backgroundColor: '#F10C18',
  },
});

export default Choice;
