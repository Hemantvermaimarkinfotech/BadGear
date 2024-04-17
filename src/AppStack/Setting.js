import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

const Setting = () => {
  

  return (
    <SafeAreaView style={styles.container}>
    <TitleHeader title={"Setting"}/>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});