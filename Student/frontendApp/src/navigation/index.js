import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GetStarted from '../screens/GetStarted/GetStarted';
import SplashScreens from '../screens/SplashScreen/SplashScreen';
import ForgotScreens from '../screens/ForgotScreen/ForgotScreen';
import JournalScreens from '../screens/JournalScreen/JournalScreen';
import ProfileScreens from '../screens/ProfileScreen/ProfileScreen';
import BreathingScreens from '../screens/BreathingScreen/BreathingScreen';
import Breathe1 from '../screens/BreathingScreen/BreatheTechniques/Breathe1';
import TestScreen from '../screens/TestScreen/TestScreen';
import EditProfile from '../screens/ProfileScreen/EditScreen/EditProfile';
import Chat from '../screens/ChatScreens/ChatBot';
import TestingScreen from '../screens/TestingScreen';


const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 5 seconds (5000 milliseconds)
  }, []);

  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homes" component={HomeScreen} />  
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreens} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Testing" component={TestingScreen} />
        <Stack.Screen name="Started" component={GetStarted} />
       
        <Stack.Screen name="Journal" component={JournalScreens} />
        <Stack.Screen name="Breathe" component={BreathingScreens} />
        <Stack.Screen name="Profile" component={ProfileScreens} />
        <Stack.Screen name="Breathe1" component={Breathe1} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Edit" component={EditProfile} />
        <Stack.Screen name="ChatBot" component={Chat} />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
