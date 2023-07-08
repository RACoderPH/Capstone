import React from 'react';
import { View, Image,StyleSheet} from 'react-native';
import Logo from '../../../assets/images/Mindmatters.png'

const SplashScreen = () => (
 
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <View style={styles.circle} />
          <View style={styles.circle2} />
          <View style={styles.circle3} />
          <View style={styles.circle4} />
    <Image source={Logo} />
  </View>
  
);
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
export default SplashScreen;
