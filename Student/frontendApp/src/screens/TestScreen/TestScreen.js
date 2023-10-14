import React, { useState } from 'react';
import { View, StyleSheet, Dimensions,ScrollView } from 'react-native';
import Question from '../../components/RadioGroup/Question';
const { width,height } = Dimensions.get('window');

const TestScreen = () => {
  return (
   <ScrollView style={styles.main}>
      <View style={{width:'100%',height:'100%',paddingBottom:10}}>
      <Question/>
      </View>
   </ScrollView>
);
};

const styles = StyleSheet.create({
      main:{
          width: width,
          height : height,
      },
});

export default TestScreen;
