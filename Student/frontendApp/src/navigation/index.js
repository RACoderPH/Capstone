import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GetStarted from '../screens/GetStarted/GetStarted';
import SplashScreens from '../screens/SplashScreen/SplashScreen';



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
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Started" component={GetStarted} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
