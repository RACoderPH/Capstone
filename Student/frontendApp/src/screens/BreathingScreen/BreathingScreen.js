import React ,{useState}from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';


const BreathingScreen = () => {
  const navigation = useNavigation();


  const Breathe1 = () =>{
    //console.warn('Sign Up');

    navigation.navigate('Breathe1');
  };


  const [isPlaying, setIsPlaying] = useState(false);
  const onPress = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <ScrollView>
    <Card style={styles.SoundContainer} onPress={Breathe1} >
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }}/>
    <Card.Content>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Icon name="play-back" style={{fontSize:30,margin:20}}></Icon>
            <Icon
        name={isPlaying ? "pause" : "play"}
        style={{ fontSize: 30, margin: 20 }}
        onPress={onPress}
      />
            <Icon name="play-forward" style={{fontSize:30,margin:20}}></Icon>
        </View>
      <Text variant="titleLarge">Breathing Exercise</Text>
      <Text variant="bodyMedium">Description</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

    <Card style={styles.SoundContainer}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Icon name="play-back" style={{fontSize:30,margin:20}}></Icon>
            <Icon
        name={isPlaying ? "pause" : "play"}
        style={{ fontSize: 30, margin: 20 }}
        onPress={onPress}
      />
            <Icon name="play-forward" style={{fontSize:30,margin:20}}></Icon>
        </View>
        <Text variant="titleLarge">Breathing Exercise</Text>
      <Text variant="bodyMedium">Description</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

    <Card style={styles.SoundContainer}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Icon name="play-back" style={{fontSize:30,margin:20}}></Icon>
            <Icon
        name={isPlaying ? "pause" : "play"}
        style={{ fontSize: 30, margin: 20 }}
        onPress={onPress}
      />
            <Icon name="play-forward" style={{fontSize:30,margin:20}}></Icon>
        </View>
        <Text variant="titleLarge">Breathing Exercise</Text>
      <Text variant="bodyMedium">Description</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>

    <Card style={styles.SoundContainer}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Icon name="play-back" style={{fontSize:30,margin:20}}></Icon>
            <Icon
        name={isPlaying ? "pause" : "play"}
        style={{ fontSize: 30, margin: 20 }}
        onPress={onPress}
      />
            <Icon name="play-forward" style={{fontSize:30,margin:20}}></Icon>
        </View>
        <Text variant="titleLarge">Breathing Exercise</Text>
      <Text variant="bodyMedium">Description</Text>
    </Card.Content>
    <Card.Actions>
    </Card.Actions>
    </Card>
  
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  SoundContainer:{
    margin:10,
  },
});

export default BreathingScreen;
