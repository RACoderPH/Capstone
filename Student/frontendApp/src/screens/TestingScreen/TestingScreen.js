import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const TestingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        containerStyles={{ paddingHorizontal: 15 }}
        pages={[
          {
            backgroundColor: '#FBF0B2',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/swipe2.json')}
                  style={{ width: width, height: height * 0.6 }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: (
              <View>
                <Text
                  style={{
                    fontSize: width * 0.04, // Adjust the font size as needed
                    color: 'white', // Change the text color to white for better visibility
                    fontFamily: 'Poppins',
                    textAlign: 'justify',
                  }}
                >
                  Start your journey towards mental well-being by prioritizing self-care and mindfulness practices. Our app provides a variety of guided meditation sessions, daily affirmations, and tools to track your emotional well-being. Take the first step and invest in your mental health today!
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#CAEDFF',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/swipe2.json')}
                  style={{ width: width, height: height * 0.6 }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
          {
            backgroundColor: '#82A0D8',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/swipe2.json')}
                  style={{ width: width, height: height * 0.6 }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Onboarding',
            subtitle: 'Done with React Native Onboarding Swiper',
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default TestingScreen;
