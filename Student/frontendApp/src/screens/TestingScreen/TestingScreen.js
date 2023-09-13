import { View, Text,StyleSheet,Dimensions,Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import {useNavigation} from '@react-navigation/native';
const {width,height} = Dimensions.get('window');

const TestingScreen = () => {
  const navigation = useNavigation();
  
const handleDone = () => {
  navigation.navigate('Homes');
}



  return (
    <View style={styles.container}>
        <Onboarding 
        onDone= {handleDone}
        onSkip={handleDone}
        containerStyles={{paddingHorizontal:15}}
  pages={[
    {
      backgroundColor: '#FBF0B2',
      image:(
          <View>  
              <Image style={styles.lottie}source={require('../../../assets/images/getStarted.png')}/>
          </View>
      ),
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },

    {
      backgroundColor: '#CAEDFF',
      image:(
          <View>  
              <Image style={styles.lottie}source={require('../../../assets/images/getStarted.png')} autoPlay loop />
          </View>
      ),
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },


    {
      backgroundColor: '#82A0D8',
      image:(
          <View>  
               <Image style={styles.lottie}source={require('../../../assets/images/getStarted.png')} autoPlay loop />
          </View>
      ),
      title: 'Onboarding',
      subtitle: 'Done with React Native Onboarding Swiper',
    },
  ]}
  />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    lottie:{
      width:width * 0.8,
      height:width * 0.60,
    }
});
export default TestingScreen