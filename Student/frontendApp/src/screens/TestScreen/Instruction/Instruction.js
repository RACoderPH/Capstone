import { View, StyleSheet, Dimensions,ScrollView,TouchableOpacity } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { Card, Text ,Button} from 'react-native-paper';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const Instruction = () => {
  const navigation = useNavigation();


  const handleDone = () => {
    navigation.navigate('Test');
  };

  const MyComponent = () => (



    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleMedium">DASS - 42 Mental Assessment</Text>
        <Text variant="bodyMedium" style={{textAlign:'justify'}}>
          The DASS-42 is a 42 item self-report scale designed to measure the negative emotional states of depression,
          anxiety, and stress. The principal value of the DASS in a clinical setting is to clarify the locus of
          emotional disturbance, as part of the broader task of clinical assessment. The essential function of the DASS
          is to assess the severity of the core symptoms of depression, anxiety, and stress. As the scales of the DASS
          have been shown to have high internal consistency and to yield meaningful discriminations in a variety of
          settings, the scales should meet the needs of both researchers and clinicians who wish to measure current
          state or change in state over time (e.g., in the course of treatment).
        </Text>
        <Text variant="bodyMedium"  style={{textAlign:'justify'}}>
          Please read each statement and choose a number <Text style={{fontWeight:'bold'}}>0, 1, 2 or 3</Text> that indicates how much the statement applied to you over the past week.
         There are no right or wrong answers. Do not spend too much time on any statement.
        </Text>
      </Card.Content>
      <Card.Actions>
      <TouchableOpacity onPress={handleDone}>
        <CustomButton
        text="Proceed"
        style={{width:150,}}/>
        </TouchableOpacity>
    </Card.Actions>
    </Card>
  );

  return (
    <ScrollView style={{width:width * 1 , height: height* 1}}> 
    <View style={styles.container}>
      <View style={styles.centered}>
        <MyComponent />
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2, // Add padding to the outer container
  },
  centered: {
    alignItems: 'center',
  },
  card: {
    marginBottom:20,
    marginTop:20,
    width: width * 0.95, // Make the card take up the entire width
    padding: 0.5, // Add padding to the card content
  },
});

export default Instruction;
