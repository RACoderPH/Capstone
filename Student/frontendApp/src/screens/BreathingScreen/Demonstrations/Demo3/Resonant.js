import { View, 
    Text,
    ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity } from 'react-native'
  import React from 'react'
  import VideoPlayer from 'react-native-video-player'
 import CustomButton from '../../../../components/CustomButton/CustomButton'
 import { useNavigation } from '@react-navigation/native';


  const {width,height} = Dimensions.get('window');

const Resonant = () => {
 const navigation = useNavigation();

    const proceed = () => {
        navigation.navigate('Breathe3');
    }


  return (
    <ScrollView style={{ width: width, height: height }}>
    <VideoPlayer
  video={require('../../../../../assets/video/Resonant.mp4')}
  videoWidth={1600}
  videoHeight={900}
  thumbnail={require('../../../../../assets/images/resonant.png')}
/>

  <View style={styles.container}>
      <Text style={styles.title}>Resonant Breathing</Text>
    <View style={styles.content}>
    <Text style={styles.textContent}>Resonance frequency breathing is a way of breathing (slow relaxed diaphragmatic breathing at around 3-7 breaths per minute)
     that has a regulating effect on the autonomic nervous system and other key body systems such as the circulatory system.{'\n'}
       </Text>
       <Text style={styles.textContent}>
       This type of breathing, (when practiced for a period of time and in the right conditions), calms the body’s fight and flight response, increases the activity of the parasympathetic nervous system and the vagus nerve. 
       Calming the fight and flight response and activating the vagus nerve is important for helping us cope with the damaging effects of stress and also for helping the healing process.
        Resonance frequency breathing also stands out as a breathing technique because of the way it affects our physiology. When a person breathes at their resonance frequency their respiratory, 
        cardio-vascular and autonomic nervous work can together in a synchronized manner and function more efficiently.
       </Text>

       <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}> 
         <TouchableOpacity onPress={proceed}>
        <CustomButton text="Proceed" style={styles.btn} />
        </TouchableOpacity>
    </View>
    </View>
  </View>
 
  </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    width: width,
    flex: 1, // Make the container expand to fill the available space
  },
    title:{
      fontSize:30,
      textAlign:'center'
    },
    content:{
      width:'100%',
      height:'100%',
      padding:15,
    },
    textContent:{
      textAlign:'justify',
      fontSize:18
    },
    btn:{
    width:300,
    borderRadius:10,
    }
  })
export default Resonant