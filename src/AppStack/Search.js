import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet,SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import TitleHeader from '../Components/TitleHeader';

const Search = () => {
  

  return (
    <SafeAreaView style={styles.container}>
      <TitleHeader title={"Search"}/>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
