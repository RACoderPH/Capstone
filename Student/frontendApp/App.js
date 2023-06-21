/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Text, View,StyleSheet } from 'react-native';
import SignInScreen from './src/screens/SignInScreen/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen/SignUpScreen';
import Navigation from './src/navigation';


const App = () =>{
    return(
      <View style={styles.parent}>
      
     <Navigation/>
      </View>
    )
}

const styles = StyleSheet.create({
      parent:{
        backgroundColor:'white',
        height:'100%',
      }
})
export default App;
