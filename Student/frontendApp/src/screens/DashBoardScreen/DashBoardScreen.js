import { View ,StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  Alert,
  BackHandler} from 'react-native'
import React, 
{ useEffect, 
  useState } from 'react';
import bg from '../../../assets/images/exercise.jpg';
import journal from '../../../assets/images/journal.jpg';
import test from '../../../assets/images/test.jpg';
import axios from 'axios';
import LottieView from 'lottie-react-native';
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
const apiUrl = 'https://mindmatters-ejmd.onrender.com';


const DashBoardScreen = () => {
  const navigation = useNavigation();
    const [id,setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [quoteData, setQuoteData] = useState({ quote: '', author: '' });
    const [refreshing, setRefreshing] = useState(false);
    const [userData,setUserData] = useState(null);


    const showExitAlert = () => {
      Alert.alert(
        'Exit App',
        'Are you sure you want to exit the app?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Exit',
            onPress: handleExit, // Call your custom exit event
          },
        ]
      );
    };
  const handleExit =  async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      const response = await axios.post('https://mindmatters-ejmd.onrender.com/logout', { userId });

      if (response.status === 200) {
        await AsyncStorage.clear();
        navigation.navigate('SignIn');
        console.log('Logout Properly');
      } else {
        console.log('Failed to update status:', response.status);
        // Handle the error case accordingly
      }
    } catch (error) {
      console.log('Failed to update status:', error);
      // Handle the error case accordingly
    }
  };

    useEffect(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigation.isFocused()) {
          // Only show the exit alert if the specific screen is focused
          showExitAlert();
          return true; // Prevent default back button behavior
        }
        return false;
      });
  
      return () => backHandler.remove(); // Remove the event listener when the component unmounts
    }, [navigation]);
  

    const onRefresh = () => {
      retrieveData(); 
      UserData();// Call retrieveData to initiate the data fetch
    };


    useEffect(() => {
      retrieveData();
      UserData();
    }, []);


const UserData = async () => {
  try {
    const storedId = await AsyncStorage.getItem('id');
    setUserId(storedId);
    setRefreshing(true); // Set refreshing to true when data retrieval starts
    const response = await axios.get(`${apiUrl}/user/${storedId}`);
    setUserData(response.data);
  } catch (error) {
    console.log(error);
  } finally {
    setRefreshing(false); // Set refreshing to false when data retrieval is complete
  }
};


    const retrieveData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('username');
          setUsername(storedUser)
          axios.get(`${apiUrl}/Quotes`)
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

    const Assessment = async () => {
      // Check if the user is verified here
      if (userData && userData.Verified === 0) {
        // Show an alert if the user is not verified
        Alert.alert(
          'Verification Required',
          'You need to verify your account to access this feature.\n Go to Profile > click verify account',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
      } else if (userData.Verified === 2) {
        // Show a different alert if the user's verification is in progress
        Alert.alert(
          'Verification In Progress',
          'Please check your response and submit again to verify your account.',
          [
            {
              text: 'OK',
              style: 'cancel',
            },
          ]
        );
      } else {
        // User is verified, navigate to the Assessment screen
        navigation.navigate('Instruction');
      }
    };
    
    
    const MyComponent = () => {
      return (
        <TouchableOpacity>
        <Card style={styles.content}  onPress={Journal} >
        <Text style={{color:"black",padding:15,fontWeight:'700'}}>Diary  </Text>
        <LottieView
       source={require('../../../assets/animation/diary.json')}
       autoPlay
       loop
       style={{ width:150, height: 150 }}/>
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
     
          <Text style={{color:"black",padding:15,fontWeight:'700'}}>Assessment</Text>
          <LottieView
       source={require('../../../assets/animation/test.json')}
       autoPlay
       loop
       style={{ width:150, height: 150 }}/>
          <Card.Content>
            <Text style={{fontSize:width * 0.03,color:'black'}}>Check your Mental{'\n'} Health</Text>
          </Card.Content>
        </Card>
    </TouchableOpacity>
        
      );
    };



  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <ScrollView style={styles.main} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
       <Provider>
      <View style={styles.Topnav}>
    <View style={{ flexDirection: 'row', width: width, margin:4}}>
      <Text style={{ marginLeft:width * 0.02,fontSize:16,color:'black',fontWeight:'600' }}>Hello <Text style={{ fontWeight: 'bold',color:'black' }}>{username}</Text>
      </Text>
    </View>
      </View>
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ borderRadius: 15, overflow: 'hidden' }}>
  <ImageBackground source={{ uri: 'https://picsum.photos/700' }} style={{ width: width * 0.9, height: 200 }}>
    {/* Semi-transparent background */}
    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)',width:'100%',height:'100%',justifyContent:'center' }}>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '500', margin: 5 ,padding:2 ,textAlign:'center'}}>{quoteData.quote}</Text>
      <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>- {quoteData.author}</Text>
    </View>
  </ImageBackground>
</View>

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
          overflow:'hidden',
          resizeMode: 'cover',
          borderRadius: 2,
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