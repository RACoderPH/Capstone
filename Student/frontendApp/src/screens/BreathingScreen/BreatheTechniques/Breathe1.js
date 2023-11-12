import React, { useRef, useState, useEffect } from 'react';
import { View, 
  Text,
   StyleSheet,
   Dimensions,
   Animated, 
  TouchableOpacity,
  BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound'
import {useNavigation} from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const circleWidth = width / 2;

const Breathe1 = () => {
  const totalTimeInSeconds = 5 * 60;
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundDuration, setSoundDuration] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [timer, setTimer] = useState(totalTimeInSeconds);
  const timerIntervalRef = useRef(null);

  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const animationInterval = useRef(null);
  const sound = useRef(null);
  const [isTypingAnimation, setIsTypingAnimation] = useState(true);
    //back button 

    useEffect(() => {
      // Add a back button listener to stop the sound when the back button is pressed
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (isPlaying) {
          pauseSound();
          setIsPlaying(false);
          navigation.navigate('Breathe');
          return true; // Prevent the default behavior of back button
        }
        return false;
      });
  
      return () => backHandler.remove(); // Remove the listener when the component unmounts
    }, [isPlaying]);
  

    //end
    //typing Animation
    const AnimatedTypewriterText = ({ sentences, delay, speed, style }) => {
      const [animatedText, setAnimatedText] = useState('');
      const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
      const [showCursor, setShowCursor] = useState(true);
    
      useEffect(() => {
        if (sentences.length !== currentSentenceIndex) startTypingAnimation();
        else setCurrentSentenceIndex(0);
      }, [currentSentenceIndex]);
    
      useEffect(() => {
        const cursorInterval = setInterval(() => {
          setShowCursor(prevState => !prevState);
        }, 500);
        return () => {
          clearInterval(cursorInterval);
        };
      }, []);
    
      const startTypingAnimation = () => {
        const currentSentence = sentences[currentSentenceIndex];
        let index = 0;
    
        const typingInterval = setInterval(() => {
          setAnimatedText(prevState => prevState + currentSentence[index]);
          index++;
    
          if (index === currentSentence.length) {
            clearInterval(typingInterval);
            setTimeout(() => {
              setCurrentSentenceIndex(prevState => prevState + 1);
              setAnimatedText('');
            }, delay);
          }
        }, speed);
      };
    
    
      return (
        <View style={style}>
          <Text style={styles.text}>{animatedText}</Text>
          {showCursor && <Text style={styles.cursor}>|</Text>}
        </View>
      );
    };
    //End


  useEffect(() => {
    if (sound.current) {
      sound.current.setCurrentTime(currentPosition);
    }
  }, [currentPosition]);

  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      pauseTimer();
      pauseAnimation();
      pauseSound();
      setIsTypingAnimation(true); // Re-enable typing animation
    } else {
      setIsPlaying(true);
      startTimer();
      startAnimation();
      playSound();
      setIsTypingAnimation(false); // Disable typing animation
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
      sound.current = new Sound('breathe1.mp3', Sound.MAIN_BUNDLE, (error) => {
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
        setTimer(0);
        console.log('successfully finished playing');
        setIsPlaying(false);
        pauseTimer();
        pauseAnimation();
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
    timerIntervalRef.current = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerIntervalRef.current); // Stop the timer when it reaches 0
        setIsPlaying(false); // Pause the animation and sound
        pauseAnimation();
        pauseSound();
        // Add the following code to ensure the timer stays at 00:00
      setTimer(0);
      }
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerIntervalRef.current);
  };

  //Route
  const navigation = useNavigation();
  const Breathe2 = () =>{
    pauseSound();
    setIsPlaying(false);
  
    navigation.navigate('Breathe2');
  };

  const Breathe3 = () =>{
    pauseSound();
    setIsPlaying(false);
    navigation.navigate('Breathe3');
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
                backgroundColor: "#F29727",
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

          <TouchableOpacity onPress={Breathe3}>
        <Text style={{ padding: 2, color: 'black' }}>
          {/*<Icon name='play-back-outline' style={{ fontSize: 30 }} /> */}
        </Text>
        </TouchableOpacity>

        <Text style={{ padding: 2, color: 'white', backgroundColor: '#F29727', borderRadius: width / 2, padding: 15 }}>
          <TouchableOpacity onPress={togglePlayPause}>
            <Icon name={isPlaying ? 'pause-outline' : 'play-outline'} style={{ fontSize: 30, color: 'white' }} />
          </TouchableOpacity>
        </Text>

        <TouchableOpacity onPress={Breathe2}>
        <Text style={{ padding: 2, color: 'black' }}>
          {/* <Icon name='play-forward-outline' style={{ fontSize: 30 }} /> */}
         
        </Text>
        </TouchableOpacity>

      </View>
      {isTypingAnimation && (
          <AnimatedTypewriterText
            sentences={[
              'Procedure for Butterfly Hug Breathing',
              '1.Create butterfly wings with your two hands by connecting your thumbs and your palms towards your chest',
              '2.Take a deep breathe in when you reach the top hold for just a moment and then exhaling.',
              '3.Give yourself a butterfly hug by alternating one tap of your right hand followed by one of your left hand.',
              'Continue this movement slowly',
            ]}
            delay={1000}
            speed={70}
            style={styles.textContainer}
          />
        )}
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
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    textAlign:'center',
  },
  cursor: {
    fontSize: 18,
    marginBottom: 10,
    opacity: 0.6,
    position: 'absolute',
    right: -5
  },
});

export default Breathe1;
