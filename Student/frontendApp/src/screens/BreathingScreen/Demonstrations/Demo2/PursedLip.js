import { View, 
    Text,
    ScrollView,
  Dimensions,
  StyleSheet,TouchableOpacity } from 'react-native'
  import React from 'react'
  import VideoPlayer from 'react-native-video-player'
  import { useNavigation } from '@react-navigation/native';
  import CustomButton from '../../../../components/CustomButton/CustomButton'

const {width,height} = Dimensions.get('window');

const PursedLip = () => {

    const navigation = useNavigation();

    const proceed = () => {
        navigation.navigate('Breathe2');
    }


  return (
    <ScrollView style={{ width: width, height: height }}>
    <VideoPlayer
  video={require('../../../../../assets/video/PursedLipBreathing.mp4')}
  videoWidth={1600}
  videoHeight={900}
  thumbnail={require('../../../../../assets/images/pursed.png')}
/>

  <View style={styles.container}>
      <Text style={styles.title}>Pursed Lip Breathing</Text>
    <View style={styles.content}>
    <Text style={styles.textContent}>Pursed-lip breathing is a simple technique which consists of inhaling through the nose and exhaling through the mouth with pursued lips.
     A patient is instructed to inhale through the nose for several seconds with the mouth closed and then exhale slowly over 4 to 6 seconds through lips held in a whistling or kissing position. 
    This can be done with or without abdominal muscle contraction {'\n'}
       </Text>
       <Text style={styles.textContent}>
       The positive pressure created opposes the forces exerted on the airways from the flow of exhalation.
        As a result, pursed-lip breathing helps support breathing by the opening of the airways during exhalation and increasing excretion of volatile acids in the form of carbon dioxide preventing or relieving hypercapnia. 
       Through purse-lip breathing, people can have relief of shortness of breath, decrease the work of breathing, and improve gas exchange.
        They also regain a sense of control over their breathing while simultaneously increasing their relaxation.
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
export default PursedLip