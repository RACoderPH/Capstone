import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/getStarted.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
      navigation.navigate('Testing');
  };

  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <View style={styles.circle2} />
      <View style={styles.imageContainer}>
        <Image source={Logo} resizeMode='contain' style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome to Mind Matters</Text>
        <Text style={styles.content}>
          Start your journey towards mental well-being by prioritizing self-care and mindfulness practices. Our app
          provides a variety of guided meditation sessions, daily affirmations, and tools to track your emotional
          well-being. Take the first step and invest in your mental health today!
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={onGetStartedPressed}>
        <CustomButton text="Get Started" style={styles.btn} />
        </TouchableOpacity>
        <View style={styles.line} />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  circle: {
    position: 'absolute',
    top: -windowHeight * 0.1,
    left: -windowWidth * 0.01,
    width: windowWidth * 0.5, // Increase the size of the circle
    height: windowWidth * 0.5, // Increase the size of the circle
    borderRadius: windowWidth * 0.25, // Adjust the border radius accordingly
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  circle2: {
    position: 'absolute',
    top: -windowHeight * 0.03,
    left: -windowWidth * 0.15,
    width: windowWidth * 0.5, // Increase the size of the circle
    height: windowWidth * 0.5, // Increase the size of the circle
    borderRadius: windowWidth * 0.25, // Adjust the border radius accordingly
    backgroundColor: 'rgba(241, 204, 74, 0.45)', // Adjust the color of the circle as desired
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -windowHeight * 0.01,
  },
  image: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.60,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: windowWidth * 0.03,
  },
  welcome: {
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: windowWidth * 0.06,
    marginTop: windowHeight * 0.02,
  },
  content: {
    fontSize: windowWidth * 0.03,
    color: '#454545',
    fontFamily: 'Poppins',
    padding: windowHeight * 0.01,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: windowWidth * 0.1,
    paddingBottom: windowHeight * 0.10,
  },
  btn: {
    width: windowWidth * 0.80,
    borderRadius: windowWidth * 0.05,
    fontSize: windowWidth * 0.04,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1CC4A',
    marginTop: windowHeight * 0.01,
    alignItems: 'center',
  },
});

export default GetStarted;
