
import React from 'react'
import { View, Image,StyleSheet,Dimensions,Text} from 'react-native';
import LottieView from 'lottie-react-native';

const {width,height} = Dimensions.get('window');

const ChatSplash = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
       source={require('../../../assets/animation/SplashBot.json')}
       autoPlay
       loop
       style={{ width: width, height: width }}
     />
      <Text style={styles.text}>MiMa Bot</Text>
  </View>
  )
}
const styles = StyleSheet.create({
    text:{
      fontSize:30,
      color:'black',
    },
    circle: {
        position: 'absolute',
        top: -110,
        left: -15,
        width: 224,
        height: 216,
        borderRadius: 110,
        backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
      },
      circle2: {
        position: 'absolute',
        top: -30,
        left: -100,
        width: 224,
        height: 216,
        borderRadius: 110,
        backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
      },
      circle3: {
        position: 'absolute',
        bottom: -100,
        right: -15,
        width: 224,
        height: 216,
        borderRadius: 110,
        backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
      },
      circle4: {
        position: 'absolute',
        bottom: -20,
        right: -100,
        width: 224,
        height: 216,
        borderRadius: 110,
        backgroundColor: 'rgba(241, 204, 74, 0.45)',  // Adjust the color of the circle as desired
      }
})
export default ChatSplash