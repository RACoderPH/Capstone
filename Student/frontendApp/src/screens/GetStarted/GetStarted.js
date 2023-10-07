import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/getStarted.png';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const {width,height} = Dimensions.get('window');


const GetStarted = () => {
  const navigation = useNavigation();

  const onGetStartedPressed = () => {
      navigation.navigate('Result');
  };

  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <View style={styles.circle2} />
      <View style={styles.imageContainer}>
      <LottieView
                  source={require('../../../assets/animation/Welcome.json')}
                  style={{ width:width, height: width }}
                  autoPlay
                  loop
                />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcome}>Welcome to Mind Matters</Text>
        <Text style={styles.content}>
          Welcome to the Mind Matters Application - your companion on the journey towards improved mental well-being!. We understand that 
          taking care of your mental health is essential for a happy and fulfilling life.
          That's why we're excited to have you on board as new user, ready to embark on this 
          empowering journey with us.
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
    marginVertical:5,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    fontWeight: '700',
    fontSize:19,
  },
  content: {
    fontSize: 12,
    fontWeight:'100',
    color: '#393E46',
    fontFamily: 'Poppins',
    padding: 2,
    textAlign: 'center',
  },
  bottomContainer: {
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    padding:10,  
  },
  btn: {
    width: windowWidth * 0.80,
    borderRadius: windowWidth * 0.04,
    fontSize: windowWidth * 0.04,
  },
  line: {
    width: '80%',
    height: 1,
    backgroundColor: '#F1CC4A',
    marginTop: windowHeight * 0.01,
    alignItems: 'center',
  },
});

export default GetStarted;
