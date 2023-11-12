import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../../../components/CustomButton/CustomButton';

const { width, height } = Dimensions.get('window');

const ButterFly = () => {
  const navigation = useNavigation();

  const proceed = () => {
    navigation.navigate('Breathe1');
  };

  return (
    <ScrollView style={{ width: width, height: height }}>
      <VideoPlayer
        video={require('../../../../../assets/video/TheButterflyHug.mp4')}
        videoWidth={1600}
        videoHeight={900}
        thumbnail={require('../../../../../assets/images/butterFly.png')}
      />

      <View style={styles.container}>
        <Text style={styles.title}>ButterFly Hugs</Text>
        <View style={styles.content}>
          <Text style={styles.textContent}>
            Life events, traumas, stressors all have the potential to leave a path of destruction often found in the form of
            anxiety symptoms. These may include; racing heart, racing thoughts, intrusive thoughts, obsessional thinking,
            rigidity of thoughts, and cognitive dissonance. It is important to not only work on the underlying concerns but
            regulating the mind and body in the moment as well. One tool I often use with clients to help with the
            physiological symptoms of anxiety is the Butterfly Hug. {'\n'}
          </Text>
          <Text style={styles.textContent}>
            The Butterfly Hug is a method of therapeutic intervention to help relax and calm a hyper-aroused self. The
            Butterfly Hug was developed by two practitioners, Lucina Artigas, M.A., M.T., and Ignacio Jarero, Ed.D., Ph.D.,
            M.T. The Butterfly Hug was taught to survivors of hurricane Pauline in Mexico, in 1998 which demonstrated to be
            highly effective for helping those during this incredibly devastating time. Following the successful
            implementation and use, many therapists and theoretical orientations have taken to this successful form of
            anxiety reduction, primarily those who have suffered traumas.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={proceed}>
          <CustomButton text="Proceed" style={styles.btn} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1, // Make the container expand to fill the available space
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  content: {
    width: '100%',
    padding: 15,
  },
  textContent: {
    textAlign: 'justify',
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1, // Make the button container expand to fill the available space
    alignItems: 'center',
    justifyContent: 'flex-end', // Align the button to the bottom of the screen
    paddingBottom: 20, // Add some padding to lift the button above the very bottom
  },
  btn: {
    width: 300,
    borderRadius: 10,
  },
});

export default ButterFly;
