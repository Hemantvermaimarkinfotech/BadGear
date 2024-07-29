// #This code is written by Hemant Verma

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const Skeleton = ({
  isLoading = true,
  skeletonHeight = 100,
  skeletonWidth = '100%',
  borderRadius = 5,
  marginHorizontal = 0,
  backgroundColor = '#d2d2d2',
  children,
  marginBottom = 0,
  marginTop = 0,
  marginLeft = 0,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    let animation;

    if (isLoading) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 1000,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ]),
        { iterations: -1 }
      );
      animation.start();
    } else {
      fadeAnim.setValue(0);
      if (animation) {
        animation.stop();
      }
    }

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [isLoading, fadeAnim]);

  const interpolatedOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  if (!isLoading) {
    return children;
  }

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          opacity: interpolatedOpacity,
          width: skeletonWidth,
          height: skeletonHeight,
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          marginHorizontal: marginHorizontal,
          marginBottom: marginBottom,
          marginTop: marginTop,
          marginLeft: marginLeft,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    marginVertical: 10,
    padding: 10,
  },
});

export default Skeleton;
