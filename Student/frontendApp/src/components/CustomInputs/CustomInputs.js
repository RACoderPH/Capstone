import { View, Text,StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import React from 'react'

const CustomInputs = ({value,setValue,placeholder,label,mode,secureTextEntry,onChangeText}) => {
  return (
    <View style={styles.container}>
    <TextInput
    value={value}
    onChange={setValue}
      mode={mode}
      label={label}
      placeholder={placeholder}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}/>
    </View>
  )
  }
  const styles = StyleSheet.create({
    container:{
        width:'100%',
        borderColor:'#e8e8e8',
        borderRadius:5,

        paddingHorizontal:10,
        marginVertical:5,
        marginTop:20,
    },
    input:{
        backgroundColor:'white',
    }
  })


export default CustomInputs