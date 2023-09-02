import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import NotificationScreen from '../NotificationScreen/NotificationScreen';
import DashBoardScreen from '../DashBoardScreen/DashBoardScreen';
import LearnScreen from '../LearnScreen/LearnScreen';

const Tab = createBottomTabNavigator();

const SettingsScreens = () => (
  <View style={styles.container}>
    <LearnScreen/>
  </View>
);

const HomeScreens = () => (
  <View style={styles.container}>
    <DashBoardScreen />
  </View>
);

const ChatScreens = () => (
  <View style={styles.container}>
    <Text>Chat Screen</Text>
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
        tabBarStyle: { backgroundColor: '#F7D060',color:'black'},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Learn') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Chats') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} color={"#EF5757"} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Learn" component={SettingsScreens} />
      <Tab.Screen name="Chats" component={ChatScreens} />
      <Tab.Screen name="Home" component={HomeScreens} />
      <Tab.Screen name="Notification" component={NotificationScreens} />
      <Tab.Screen name="Profile" component={ProfileScreens} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container:{
    width:"100%",
    alignSelf:'center'
  }
});

export default Apps;
