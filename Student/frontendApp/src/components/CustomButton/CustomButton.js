import { Text,StyleSheet,Dimensions} from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

const {width,height} = Dimensions.get('window');

const CustomButton = ({ mode, onPress, text, style, labelStyle }) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      labelStyle={[styles.label, labelStyle]}
      style={[styles.btn, style]} // Merge the default button style with the custom style prop
    >
      {text}
    </Button>
  );
};
const styles = StyleSheet.create({
    btn:{
    backgroundColor: '#F1CC4A', 
    borderRadius: 50,  
    width: width * 0.95,

    padding:5,
    marginVertical:10,

    alignItems:'center',
    },
    label: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
})
export default CustomButton