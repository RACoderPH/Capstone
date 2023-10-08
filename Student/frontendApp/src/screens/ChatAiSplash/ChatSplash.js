
import React from 'react'
import { View, Image,StyleSheet,Dimensions} from 'react-native';
import Logo from '../../../assets/images/Mindmatters.png'
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
  </View>
  )
}
const styles = StyleSheet.create({
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