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
import profileResult from '../screens/ProfileScreen/Result/Profileresult'
import Breathe2 from '../screens/BreathingScreen/BreatheTechniques/Breathe2/Breathe2'
import Breathe3 from '../screens/BreathingScreen/BreatheTechniques/Breathe3/Breathe3'
import AnnouncementScreen from '../screens/Announcement/AnnouncementScreen'
import ButterFly from '../screens/BreathingScreen/Demonstrations/Demo1/ButterFly'
import PursedLip from '../screens/BreathingScreen/Demonstrations/Demo2/PursedLip'
import Resonant from '../screens/BreathingScreen/Demonstrations/Demo3/Resonant'
import Verify from '../screens/VerifyingUser/VerifyUser'
import DeleteUser from '../screens/ProfileScreen/DeleteAccount/DeleteUser'

const Navigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userLoggedIn, setUserLoggedIn] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Delay for 5 seconds (5000 milliseconds)
  }, []);

  //Auto Logout
  const Stack = createNativeStackNavigator();

  if (isLoading) {
    return <SplashScreens />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>  

    
      <Stack.Screen name="Testing" component={TestingScreen} />
    
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Forgot" component={ForgotScreens} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Homes" component={HomeScreen} />  
        <Stack.Screen name="Started" component={GetStarted} />
        <Stack.Screen name="Breathe" component={BreathingScreens} />
        <Stack.Screen name="Profile" component={ProfileScreens} />
        <Stack.Screen name="ProfileResult" component={profileResult} />
      
        <Stack.Screen name="Journal" component={JournalScreens} />
        <Stack.Screen name="Diary" component={Diary} />
        <Stack.Screen name="UserDiary" component={userDiary} />
        <Stack.Screen name="Announce" component={NotificationScreen} />
        <Stack.Screen name="Announcement" component={AnnouncementScreen} />
     
        <Stack.Screen name="verified" component={Verify} />
        <Stack.Screen name="verify" component={VerificationScreen} /> 
        
        <Stack.Screen name="Edit" component={EditProfile} />
        <Stack.Screen name="Delete" component={DeleteUser} />
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

      {/* Breathing Technique*/}
      <Stack.Screen name="Breathe3" component={Breathe3} /> 
      <Stack.Screen name="Breathe1" component={Breathe1} />
      <Stack.Screen name="Breathe2" component={Breathe2} />
      
      {/* Demonstration Breathing */}
      <Stack.Screen name="Butterfly" component={ButterFly} />
      <Stack.Screen name="PursedLip" component={PursedLip} />
      <Stack.Screen name="Resonant" component={Resonant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
