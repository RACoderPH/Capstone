import React from 'react';
import { View, Text, StyleSheet,Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import DashBoardScreen from '../DashBoardScreen/DashBoardScreen';
import LearnScreen from '../LearnScreen/LearnScreen';
import Chat from '../ChatScreens/ChatBot';


const { width, height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();


const HomeScreens = () => (
  <View style={styles.container}>
    <DashBoardScreen />
  </View>
);

const SettingsScreens = () => (
  <View style={styles.container}>
    <LearnScreen/>
  </View>
);
const NotificationScreens = () => (
  <View style={styles.container}>
    <NotificationScreen/>
  </View>
);

const ProfileScreens = () => (
  <View style={styles.container}>
    <ProfileScreen />
  </View>
);

const Apps = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#F5E551',color:'black'},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Announcement') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} color={"#F48200"} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreens}/>
      <Tab.Screen name="Learn" component={SettingsScreens} />
      <Tab.Screen name="Announcement" component={NotificationScreens} />
      <Tab.Screen name="Profile" component={ProfileScreens} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    width:width * 1,
    alignSelf:'center'
  }
});

export default Apps;
