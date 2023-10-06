import { View, Text ,StyleSheet } from 'react-native'
import React from 'react'

const OTPscreen = () => {
  return (
    <View style={styles.root}>
        <View style={styles.circle}></View>
        <View style={styles.circle2}></View>
      <Text>OTPscreen</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        backgroundColor:'white',
        width:'100%',
        height:'100%',
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
   
});
export default OTPscreen