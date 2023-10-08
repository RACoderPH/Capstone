import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
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
        pages={[
          {
            backgroundColor: '#F9FBE7',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/journey.json')}
                  style={{ width: width,height:width }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <View>
                <Text style={styles.title}>Start your Journey Here</Text>
              </View>
            ),
            subtitle: (
              <View>
                <Text style={styles.subtitle}>
                  Journey towards mental well-being by prioritizing self-care and mindfulness practices. Our app provides a variety of guided meditation sessions, daily affirmations, and tools to track your emotional well-being. Take the first step and invest in your mental health today!
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#FBF0B2',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/swipe2.json')}
                  style={{ width: width, height: width }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <View>
                <Text style={styles.title}>Take Assessment</Text>
              </View>
            ),
            subtitle: (
              <View>
                <Text style={styles.subtitle}>
                  Welcome to your path to mental health well-being. Take the first step by completing our assessment designed to understand and support your mental health needs. Your journey starts here, as we empower you to prioritize self-care and emotional wellness. Let's embark on this transformative experience together.
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: '#FFDBAA',
            image: (
              <View>
                <LottieView
                  source={require('../../../assets/animation/Chat.json')}
                  style={{ width: width, height: width }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: (
              <View>
                <Text style={styles.title}>Stay Connected</Text>
              </View>
            ),
            subtitle: (
            <View>
              <Text style={styles.subtitle}>
              Stay Connected and supported with Mindmatters, We're here to help you on your mental health journey through a range of effective mental health exercises and resources. You're never alone when you're with us. Start your journey now and discover the difference of self-care and mental well-being exercises.
              </Text>
            </View>
          ),
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
  title: {
    fontSize: 21,
    paddingBottom:12,
    color:'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight:'100',
    color: '#393E46',
    textAlign: 'justify',
    textAlign:'justify',
    paddingHorizontal: 14,
    paddingBottom:50,
  },
});

export default TestingScreen;
