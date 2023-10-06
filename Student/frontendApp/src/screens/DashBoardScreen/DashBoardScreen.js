import { View ,StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity} from 'react-native'
import React, 
{ useEffect, 
  useState } from 'react';
import bg from '../../../assets/images/exercise.jpg';
import journal from '../../../assets/images/journal.jpg';
import test from '../../../assets/images/test.jpg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
   Card,
    Text,
    FAB,
     Portal, 
     Provider } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
//Screen route
const { width, height } = Dimensions.get('window');

const DashBoardScreen = () => {
  const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [quoteData, setQuoteData] = useState({ quote: '', author: '' });

    useEffect(() => {
      // Fetch the quote data from your API using Axios
      axios.get('https://mindmatters-ejmd.onrender.com/Quotes')
        .then((response) => {
          const data = response.data;
          // Choose a random quote from the data
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomQuote = data[randomIndex].quotes;
          const randomAuthor = data[randomIndex].author;
          
          // Update the state with both the quote and author
          setQuoteData({ quote: randomQuote, author: randomAuthor });
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);

    useEffect(() => {
      retrieveData();
    }, []);
    
    const retrieveData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
          setUsername(storedUser)
      } catch (error) {
        console.log("Axios Error");
      }
    };
    const Journal = () =>{
      //console.warn('Sign Up');

      navigation.navigate('Journal');
    };

    const Breathe = () =>{
      //console.warn('Sign Up');

      navigation.navigate('Breathe');
    };

    const Assessment = () =>{
      //console.warn('Sign Up');
      navigation.navigate('Instruction');
    };

    const MyComponent = () => {
      return (
        <TouchableOpacity>
        <Card style={styles.content}  onPress={Journal} >
        <Card.Title title="Diary" style={{ color: 'black' }} />
          <Card.Cover source={journal}  style={styles.cover}/>
          <Card.Content>
            <Text style={{fontSize:width * 0.03,color:'black'}}>Write your thoughts\{'\n'}feeling</Text>
          </Card.Content>
        </Card>
        </TouchableOpacity>
      );
    };

    const MyComponent2 = () => {
      return (
        <TouchableOpacity >
        <Card style={styles.content} onPress={Assessment}>
          <Card.Title title="Assessment"/>
          <Card.Cover source={test}  style={styles.cover}/>
          <Card.Content>
            <Text style={{fontSize:width * 0.03,color:'black'}}>Check your Mental{'\n'} Health</Text>
          </Card.Content>
        </Card>
    </TouchableOpacity>
        
      );
    };

    const Dash = () => {
      return (
      <Card style={styles.firstbox}>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{height:"100%"}} />
        <Card.Content>
            <Text></Text>
        </Card.Content>
      </Card>
      );
    };

    const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <ScrollView style={styles.main}>
       <Provider>
      <View style={styles.Topnav}>
    <View style={{ flexDirection: 'row', width: width * 1, alignItems:'center'}}>
      <Text style={{ marginLeft:width * 0.02,fontSize:16,color:'black',fontWeight:'600' }}>Hello <Text style={{ fontWeight: 'bold',color:'black' }}>{username}</Text>
      </Text>
    </View>
      </View>
      <View style={{width:'100%',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
         <ImageBackground source={{ uri: 'https://picsum.photos/700' }} style={{width:width*0.9,height:200}} onPress={Breathe}>
          <Text style={{color:'white',fontSize:20,fontWeight:'700',margin:15}} >{quoteData.quote}</Text>
          <Text style={{color:'white',fontSize:18, marginLeft:10}}>-{quoteData.author}</Text>
      </ImageBackground>
      </View>

        <Text style={{fontSize:16,fontWeight:'700',color:'black',marginLeft: '2%',marginTop:'4%'}}>Features </Text>
        <Text style={{marginLeft: '2%',color:'#6B7280'}}>Let me help you to reduce your stress</Text>
        <View style={{ flexDirection: 'row',alignSelf:'center',width:width*0.95,alignSelf:'center',alignContent:"center",justifyContent:'center'}}>
          
                <MyComponent/>
                <MyComponent2/>
                
                
        </View>
        <Text style={{fontSize:16,fontWeight:'700',color:'black', marginLeft: '2%',marginTop:'4%'}}>Tools</Text>
        <Text style={{marginLeft: '2%',color:'#6B7280'}}>Release your Tension</Text>
      <TouchableOpacity onPress={Breathe}  activeOpacity={0.9}>
        <View style={styles.Container2}>
        <ImageBackground source={bg} style={styles.backgroundImage} onPress={Breathe}>
          <Text style={{color:'#574848',fontSize:20,fontWeight:'700',margin:15}} >Breathe</Text>
          <Text style={{color:'white',fontSize:18, marginLeft:10}}>A breathing exercise for reducing stress {'\n'}& anxiety</Text>
      </ImageBackground>
        </View>
        </TouchableOpacity>
       
      <View style={{marginBottom:20}}>
        <Portal>
          <FAB.Group
            open={open}
            visible
            icon={open ? 'minus' : 'plus'}
            actions={[
              { icon: 'chat', onPress: () =>  navigation.navigate('ChatBot') },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // Handle FAB group actions here
              }
            }}
          />
        </Portal>
      </View>
    </Provider>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    main:{
      width:width * 1,
      backgroundColor:'white',
    },
    cover:{
      width:150,
      height:150,
    },
    content:{
      color:'white',
      backgroundColor:'white',
      padding:5,
      marginBottom:1,
      margin:5
  },
  firstbox:{
    height:200,
    width:width*0.90,
    alignSelf:'center'
  },
    Topnav:{
        width:'100%',
        padding:2,
    },
        image: {
            marginLeft:width * 0.5,
            backgroundColor: 'gray',
            width: 40,
            height: 40,
            borderRadius:20,
            margin: 5,
        },

        Container2: {
          marginBottom: 15,
          marginTop: 5,
          width: width * 0.95,
          height: height * 0.22,
          borderRadius: 15,
          padding: 2,
          alignSelf: 'center',
        },
        backgroundImage: {
          flex: 1,
          resizeMode: 'cover',
          borderRadius: 15,
        },
      box: {
        width: '45%',
        height: '100%',
        margin: 5,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ffff',
        elevation: 1,
      },
      
        boxImage:{
            alignSelf:'center',
            width:83,
            height:83,
        }
})
export default DashBoardScreen