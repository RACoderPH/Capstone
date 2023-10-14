import { View, Text ,ScrollView,StyleSheet,Dimensions,Image} from 'react-native'
import React from 'react'
import Logo from '../../../assets/images/Mindmatters.png'
import school from '../../../assets/images/school_logo.png'
const { width, height } = Dimensions.get('window');
const AboutScreen = () => {
  return (
    <ScrollView style={styles.main}>
            <View style={styles.content}>
           
               <View style={{ alignItems:'center'}}>
                <View style={{flexDirection:'row'}}>
                <Image source={Logo}/>
                <Image source={school} style={{width:200,height:200}}/>
                </View>
           
                    <Text style={styles.text}>
                    Mind Matters is a mental health support that build by the students of Bulacan state University as a Capstone project the app goal is to  prevent and help the students who's in depression, anxiety  and stress. The app was developed to help the students in dominic
                    </Text>
               </View>
               <View style={styles.features}>
                    <Text style={styles.head}>The App Features:</Text>
                    <Text style={styles.text}>Assessment</Text>
                    <Text style={styles.text}>Diary</Text>
                    <Text style={styles.text}>Breathing techniques</Text>
                    <Text style={styles.text}>Chat</Text>
                    <Text style={styles.text}>Chat bot</Text>
               </View>
               <View style={styles.features}>
                    <Text style={styles.head}>Connect With Us:</Text>
                    <Text style={styles.text2}>Contact us:                    09168514723</Text>
                    <Text style={styles.text2}>Email:            sdapulilan@gmail.com</Text>
               </View>
            
            </View>
     </ScrollView>
  )
}
const styles = StyleSheet.create({
    main: {
      width:width,
      height:height,
    },
    content:{
        marginTop:20,
        width:'100%',
        height:'100%',
        padding:14,
    },
    text:{
        padding:2,
        fontSize:16,
        fontWeight:'400',
        color:'#353839',
        textAlign:'justify'
    },
    text2:{
      padding:2,
      fontSize:14,
      fontWeight:'400',
      color:'#353839',
  },
    head:{
        padding:2,
        fontSize:18,
        fontWeight:'700',
        color:'#353839',
    },
    features:{
        marginTop:5,
        alignItems:'flex-start'
    }
  });
export default AboutScreen