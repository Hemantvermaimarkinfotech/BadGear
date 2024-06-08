import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import TitleHeader from '../Components/TitleHeader';
import Accordion from '../Components/Accordian';

const HelpCenter = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={"Help & Center"} />
      <View style={styles.customerSupport}>
        <Image source={require("../assets/service.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Get quick customer support by selecting your item.
          </Text>
        </View>
      </View>

      <View style={{ marginHorizontal: width * 0.04 }}>
        <Text style={[styles.text, { marginTop: width * 0.04 }]}>What issue are you facing?</Text>
      </View>

      <ScrollView>
          <View style={{ marginTop: width * 0.04}}>
            <Accordion title="How can I contact customer support?">
              <Text style={styles.subtext}>If your order has not yet shipped, you can contact us to change your shipping address. If your order has already shipped, we may not be able to change the address</Text>
            </Accordion>
            <Accordion title="Do your offer & gift wrapping?">
              <Text style={styles.subtext}>Yes, we offer gift wrapping for an additional fee. You can select this option during checkout.</Text>
            </Accordion>
            <Accordion title="What is your Return & Refund Policy?">
              <Text style={styles.subtext}>Our return and refund policy can be found in the website's "Terms and Conditions" or "Return Policy" section. Please review it for details..</Text>
            </Accordion>
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFCFC",
  },
  customerSupport: {
    height: width * 0.25,
    width: '100%',
    backgroundColor: '#fff',
    marginTop: width * 0.04,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      },
      android: {
        elevation: 5,
      },
    }),
    flexDirection: "row",
    alignItems: "center",
    padding: width * 0.025,
  },
  image: {
    height: width * 0.16,
    width: width * 0.16,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    padding: width * 0.025,
    marginLeft: width * 0.025,
  },
  text: {
    color: "#000000",
    fontSize: width * 0.045,
    fontFamily: "Gilroy-SemiBold",
    fontWeight: "600",
  },
  subtext:{
    fontSize:15,
    lineHeight:25,
    fontFamily:"Gilroy",
    color:"#000000"
  }
});

export default HelpCenter;
