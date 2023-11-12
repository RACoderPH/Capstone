import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import Logo from '../../../assets/images/school_logo.png';

const SplashScreen = () => (
  <View style={styles.container}>
    <View style={styles.circle} />
    <View style={styles.circle2} />
    <View style={styles.circle3} />
    <View style={styles.circle4} />
    <Image source={Logo} style={styles.image} />
    <View style={styles.versionContainer}>
      <Text style={styles.versionText}>Mind Matters Version 1.0 @2023</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    top: -110,
    left: -15,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  circle2: {
    position: 'absolute',
    top: -30,
    left: -100,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  circle3: {
    position: 'absolute',
    bottom: -100,
    right: -15,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  circle4: {
    position: 'absolute',
    bottom: -20,
    right: -100,
    width: 224,
    height: 216,
    borderRadius: 110,
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  image: {
    width: 300,
    height: 300,
  },
  versionContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom as needed
  },
  versionText: {
    fontSize: 12,
  },
});

export default SplashScreen;
