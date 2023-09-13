import React, { useState } from 'react';
import { View, StyleSheet, Dimensions,ScrollView } from 'react-native';
import Question from '../../components/RadioGroup/Question';
const { width,height } = Dimensions.get('window');

const TestScreen = () => {
  return (
   <ScrollView style={styles.main}>
      <Question/>
   </ScrollView>
);
};

const styles = StyleSheet.create({
      main:{
          width: width * 1,
          height : height * 1,
      },
});

export default TestScreen;
