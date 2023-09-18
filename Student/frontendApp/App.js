
import { Text, View,StyleSheet,Dimensions } from 'react-native';
import Navigation from './src/navigation';
const { width ,height} = Dimensions.get('window');

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
        width:width * 1,
        height:height,
      }
})
export default App;
