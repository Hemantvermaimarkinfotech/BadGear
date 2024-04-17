import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

const Notification = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={"Notification"}/>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});