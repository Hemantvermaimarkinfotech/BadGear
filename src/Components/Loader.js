import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  
  const Loader = ({
    onPress,
    title,
    width,
    backgroundColor,
    borderWidth,
    color,
    ...rest
  }) => {
    return (
      <View
        style={[
          styles.primaryBtn,
          {
            width: width ? width : '95%',
            backgroundColor: backgroundColor ? backgroundColor : '#fff',
            borderWidth: borderWidth ? borderWidth : 1,
            ...rest,
          },
        ]}
        onPress={() => onPress()}>
        <ActivityIndicator
          size="large"
          color="#550000"
          style={styles.activityIndicator}
        />
        {/* <Text style={[styles.primaryBtnTxt,{ color: color ? color : '#000',}]}>{title}</Text> */}
      </View>
    );
  };
  
  export default React.memo(Loader);
  
  const styles = StyleSheet.create({
    primaryBtn: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '45%',
      height: 50,
      backgroundColor: '#ffffff',
      elevation: 6,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: '#000',
      alignSelf: 'center',
      marginVertical: 15,
    },
    primaryBtnTxt: {
      fontSize: 18,
      color: '#000',
      fontWeight: '600',
      // fontFamily: 'Roboto-Bold',
    },
  });