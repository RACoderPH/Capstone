import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const LearnScreen = () => {
  return (
    <View style={styles.main}>
            <View style={styles.boxTitle}>
                    <Text style={styles.Title}>Book for Mental Health</Text>
            </View>
            <Text style={styles.info}>Get Started</Text>
            <View style={{flexDirection:'row' , alignItems:'center',justifyContent:'center'}}>  
                    <View style={styles.box}>

                    </View>
                    <View style={styles.box}>

                    </View>
            </View>
            <Text style={styles.info}>Recommended</Text>
            <View style={styles.recommended}>
                
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    main:{
        backgroundColor:'white',
        width:'100%',
        height:'100%',
    },
    boxTitle:{
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'20%',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor:'gray',
        
    },
    Title:{
        fontSize:30,
        color:'black',
        fontWeight:'700',
        letterSpacing:1,
        fontFamily:'poppins',
    },
    info:{
        margin:5,
        fontSize:20,
        color:'#A09D9D',
        fontWeight:'700',
        letterSpacing:1,
        fontFamily:'poppins',
    },
    box:{
        width:170,
        height:190,
        backgroundColor:'gray',
        margin:6,
        borderRadius:5,
    },
    recommended:{
        alignSelf:'center',
        width:'90%',
        height:'35%',
        backgroundColor:'gray',
        borderRadius:5,
    }
})
export default LearnScreen