import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound'

const { width, height } = Dimensions.get('window');
const circleWidth = width / 2;

const Breathe1 = () => {
  const totalTimeInSeconds = 4 * 60;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundDuration, setSoundDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [timer, setTimer] = useState(totalTimeInSeconds);// Initial timer value in seconds
  let timerInterval; // Define timerInterval here

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const animationInterval = useRef(null);
  const sound = useRef(null);
  

  useEffect(() => {
    if (sound.current) {
      sound.current.setCurrentTime(currentPosition);
    }
  }, [currentPosition]);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pauseTimer(); // Pause the timer
      pauseAnimation();
      pauseSound();
    } else {
      setIsPlaying(true);
      startTimer(); // Start the timer
      startAnimation();
      playSound();
    }
  };

  const startAnimation = () => {
    animationInterval.current = setInterval(() => {
      animateLoop();
    }, 8000);
    animateLoop();
  };

  const pauseAnimation = () => {
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
    }
  };

  const animateLoop = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 100,
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  };

  const playSound = () => {
    if (!sound.current) {
      sound.current = new Sound('breathe.mp3', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        setSoundDuration(sound.current.getDuration());
        playSoundAfterLoad();
      });
    } else {
      setSoundDuration(sound.current.getDuration());
      playSoundAfterLoad();
    }
  };

  const playSoundAfterLoad = () => {
    sound.current.play((success) => {
      if (success) {
        console.log('successfully finished playing');
        setIsPlaying(false);
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const pauseSound = () => {
    if (sound.current) {
      sound.current.pause(() => {
        // Handle pause completion if needed
      });
    }
  };

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });

  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

 

  const startTimer = () => {
    timerInterval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1); // Decrease timer by 1 second
      }
    }, 1000); // Update timer every 1 second
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
  };
  return (
    <View style={{ height: height * 0.7, width: width }}>
      <View style={styles.container}>
        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
            opacity: textOpacity,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: 'black',
            }}
          >
            Inhale
          </Text>
        </Animated.View>
        <Animated.View
          style={{
            width: circleWidth,
            height: circleWidth,
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
            opacity: exhale,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              color: 'black',
            }}
          >
            Exhale
          </Text>
        </Animated.View>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
          const rotation = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });
          return (
            <Animated.View
              key={item}
              style={{
                opacity: 0.1,
                backgroundColor: "#6499E9",
                width: circleWidth,
                height: circleWidth,
                borderRadius: circleWidth / 2,
                ...StyleSheet.absoluteFill,
                transform: [
                  {
                    rotateZ: rotation,
                  },
                  { translateX: translate },
                  { translateY: translate },
                ],
              }}
            ></Animated.View>
          );
        })}
      </View>
      <View style={styles.component}> 
      <View style={{ width: width, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.title}>Butterfly Hug</Text>
      </View>

      <View style={{ width: width }}>
   
        <View style={{ width: width, flexDirection: 'row', justifyContent: 'center', padding: 5 }}>
        <Text style={styles.ProgressLabelTxt}>{Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}</Text>
        </View>
      </View>

      <View style={{ width: width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 10 }}>
        <Text style={{ padding: 2, color: 'black' }}>
          <Icon name='play-back-outline' style={{ fontSize: 30 }} />
        </Text>
        <Text style={{ padding: 2, color: 'white', backgroundColor: '#6499E9', borderRadius: width / 2, padding: 15 }}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Icon name={isPlaying ? 'pause-outline' : 'play-outline'} style={{ fontSize: 30, color: 'white' }} />
          </TouchableOpacity>
        </Text>
        <Text style={{ padding: 2, color: 'black' }}>
          <Icon name='play-forward-outline' style={{ fontSize: 30 }} />
        </Text>
      </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    left: width / 4,
    top: height / 7,
  },
  title: {
    marginTop: 50,
    fontSize: 25,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  ProgressLabelTxt: {
    fontSize: 25,
    fontWeight:'300',
    padding:10
  },
  component:{
    flex:1,
    marginTop:100,
  }
});

export default Breathe1;
