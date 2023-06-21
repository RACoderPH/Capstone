import React, { useEffect, useState } from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const SettingsScreen = () => (
  <View>
    <Text>Settings Screen</Text>

  </View>
);

const HomeScreen = () => (
  <View>
    <Text>Home Screen</Text>
  </View>
);
const ChatScreen = () => (
  <View>
    <Text>Chat Screen</Text>
  </View>
);
const NotificationScreen = () => (
  <View>
    <Text>Notification Screen</Text>
  </View>
);
const ProfileScreen = () => (
  <View>
    <Text>Profile Screen</Text>
  </View>
);

const App = () => {
  return (
 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Chats') {
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
            } else if (route.name === 'Notification') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Icon name={iconName} color={color} size={size} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
        }}
      >
    <Tab.Screen
  name="Settings"
  options={{ headerShown: false }}
  component={SettingsScreen}
/>

        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Chats" component={ChatScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Notification" component={NotificationScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      </Tab.Navigator>

  );
};

export default App;
