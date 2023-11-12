import { View, Text,StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper';
import React ,{useState}from 'react'



const CustomInputs = ({value,setValue,placeholder,label,mode,inputMode,secureTextEntry,onChangeText,length,Inputstyle}) => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }
  
  return (
    <View style={styles.container}>
    <TextInput
      value={value}
      onChange={setValue}
      mode={mode}
      inputMode={inputMode}
      maxLength={length}
      label={label}
      placeholder={placeholder}
      style={[styles.input, Inputstyle]}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry && !isPasswordVisible}
      right={
        secureTextEntry ? (
          <TextInput.Icon
            icon={isPasswordVisible ? 'eye' : 'eye-off'}
            onPress={togglePasswordVisibility}
          />
        ) : null
      }
    />
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