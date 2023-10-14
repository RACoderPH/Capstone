import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GetStarted from '../screens/GetStarted/GetStarted';
import SplashScreens from '../screens/SplashScreen/SplashScreen';
import ForgotScreens from '../screens/ForgotScreen/ForgotScreen';
import JournalScreens from '../screens/JournalScreen/Diary';
import ProfileScreens from '../screens/ProfileScreen/ProfileScreen';
import BreathingScreens from '../screens/BreathingScreen/BreathingScreen';
import Breathe1 from '../screens/BreathingScreen/BreatheTechniques/Breathe1';
import TestScreen from '../screens/TestScreen/TestScreen';
import EditProfile from '../screens/ProfileScreen/EditScreen/EditProfile';
import Chat from '../screens/ChatScreens/ChatScreens';
import TestingScreen from '../screens/TestingScreen';
import Instruction from '../screens/TestScreen/Instruction/Instruction';
import Result from '../screens/TestScreen/Result/Result';
import ChatAi from '../screens/ChatScreens/ChatAiBot/ChatAiBot';
import AboutScreen from '../screens/AboutScreen';
import VerificationScreen from '../screens/SignUpScreen/VerificationScreen/VerificationScreen';
import TermsScreen from '../screens/TermsAndCondition/TermsScreen';
import RecommendationScreen from '../screens/TestScreen/Recommendation/RecommendationScreen';
import OTPscreen from '../screens/ForgotScreen/OTP/OTPscreen';
import NewPassword from '../screens/ForgotScreen/NewPassword/NewPassword';
import Diary from '../screens/JournalScreen/UserDiary/Diary';
import NotificationScreen from '../screens/NotificationScreen';
import ChangePasswordScreen from '../screens/ChangePassword/ChangePasswordScreen';
import userDiary from '../screens/JournalScreen/Journal/JournalScreen';


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

     
      <Stack.Screen name="Breathe1" component={Breathe1} />
      <Stack.Screen name="Testing" component={TestingScreen} />
      
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreens} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Homes" component={HomeScreen} />  
        <Stack.Screen name="Started" component={GetStarted} />
        <Stack.Screen name="Breathe" component={BreathingScreens} />
        <Stack.Screen name="Profile" component={ProfileScreens} />
        
      
        <Stack.Screen name="Journal" component={JournalScreens} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="UserDiary" component={userDiary} />
        <Stack.Screen name="Announce" component={NotificationScreen} />
      
        <Stack.Screen name="verify" component={VerificationScreen} /> 
        
        <Stack.Screen name="Edit" component={EditProfile} />
        <Stack.Screen name="ChatBot" component={Chat} />
        <Stack.Screen name="Ai" component={ChatAi} />

       
        <Stack.Screen name="Result" component={Result} /> 
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Instruction" component={Instruction} />
        <Stack.Screen name="About" component={AboutScreen} />  
        <Stack.Screen name="Terms" component={TermsScreen} />  
        <Stack.Screen name="recommendation" component={RecommendationScreen} />  
        <Stack.Screen name="NewPass" component={NewPassword} /> 
        
      <Stack.Screen name="otp" component={OTPscreen} /> 
      <Stack.Screen name="ChangePass" component={ChangePasswordScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
