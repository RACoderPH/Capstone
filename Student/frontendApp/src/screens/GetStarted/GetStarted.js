import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../../../assets/images/getStarted.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
    navigation.navigate('Homes');
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
        <CustomButton text="Get Started" style={styles.btn} onPress={onGetStartedPressed} />
        <View style={styles.line} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: -10,
  },
  image: {
    width: 400,
    height: 261,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  welcome: {
    color: 'black',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 25,
  },
  content: {
    fontSize: 12,
    color: '#454545',
    fontFamily: 'Poppins',
    padding: 20,
    textAlign: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 60,
  },
  btn: {
    borderRadius: 10,
    fontSize: 16,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#F1CC4A',
    marginTop: 10,
    alignItems: 'center',
  },
});

export default GetStarted;
